#!/usr/bin/env python3
"""Fail-closed Yoast completeness audit for WordPress pages/posts."""

import argparse
import html
import re
import sys
import time
import urllib.request
import xmlrpc.client


REQUIRED = (
    "_yoast_wpseo_focuskw",
    "_yoast_wpseo_title",
    "_yoast_wpseo_metadesc",
)


def head_value(source: str, pattern: str) -> str:
    match = re.search(pattern, source, re.I | re.S)
    return html.unescape(match.group(1).strip()) if match else ""


def fetch_source(url: str) -> str:
    error = None
    for attempt in range(3):
        try:
            request = urllib.request.Request(url, headers={"User-Agent": "Barry-Yoast-Audit/1.0"})
            with urllib.request.urlopen(request, timeout=30) as response:
                return response.read().decode("utf-8", errors="replace")
        except OSError as exc:
            error = exc
            if attempt < 2:
                time.sleep(2)
    raise RuntimeError(f"Could not fetch rendered page after three attempts: {error}")


def fetch_post(wp, username: str, password: str, post_id: int):
    error = None
    for attempt in range(3):
        try:
            return wp.wp.getPost(
                0,
                username,
                password,
                post_id,
                ["post_id", "post_title", "link", "custom_fields"],
            )
        except (OSError, xmlrpc.client.Error) as exc:
            error = exc
            if attempt < 2:
                time.sleep(2)
    raise RuntimeError(f"Could not read WordPress fields after three attempts: {error}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--site", required=True, help="Site origin, for example https://example.com")
    parser.add_argument("--username", required=True)
    parser.add_argument("--password", required=True, help="WordPress application password")
    parser.add_argument("--post-id", action="append", type=int, required=True)
    args = parser.parse_args()

    site = args.site.rstrip("/")
    wp = xmlrpc.client.ServerProxy(f"{site}/xmlrpc.php", allow_none=True)
    failures = []

    for post_id in args.post_id:
        try:
            post = fetch_post(wp, args.username, args.password, post_id)
        except RuntimeError as exc:
            print(f"FAIL {post_id}")
            print(f"  WordPress field error: {exc}")
            failures.append(post_id)
            continue
        fields = {item.get("key"): item.get("value", "").strip() for item in post.get("custom_fields", [])}
        missing = [key for key in REQUIRED if not fields.get(key)]

        try:
            source = fetch_source(post["link"])
        except RuntimeError as exc:
            print(f"FAIL {post_id} {post.get('post_title', '')}")
            print(f"  rendered page error: {exc}")
            failures.append(post_id)
            continue
        title = head_value(source, r"<title>(.*?)</title>")
        description = head_value(source, r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']')
        og_title = head_value(source, r'<meta\s+property=["\']og:title["\']\s+content=["\'](.*?)["\']')
        og_description = head_value(source, r'<meta\s+property=["\']og:description["\']\s+content=["\'](.*?)["\']')
        rendered_missing = [name for name, value in (("title", title), ("description", description), ("og:title", og_title), ("og:description", og_description)) if not value]

        status = "PASS" if not missing and not rendered_missing else "FAIL"
        print(f"{status} {post_id} {post.get('post_title', '')}")
        print(f"  focus: {fields.get('_yoast_wpseo_focuskw', '')}")
        print(f"  title: {title}")
        print(f"  description: {description}")
        if missing:
            print(f"  missing stored fields: {', '.join(missing)}")
        if rendered_missing:
            print(f"  missing rendered fields: {', '.join(rendered_missing)}")
        if status == "FAIL":
            failures.append(post_id)

    if failures:
        print(f"Yoast publication gate failed for: {', '.join(map(str, failures))}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
