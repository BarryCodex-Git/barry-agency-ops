#!/usr/bin/env python3
"""Fetch public pages and summarize JSON-LD types, IDs, duplicates, and residue."""

import argparse
import json
import sys
import urllib.request
from collections import Counter
from html.parser import HTMLParser


class JsonLdParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_jsonld = False
        self.parts = []
        self.blocks = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag.lower() == "script" and attrs.get("type", "").lower() == "application/ld+json":
            self.in_jsonld = True
            self.parts = []

    def handle_data(self, data):
        if self.in_jsonld:
            self.parts.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "script" and self.in_jsonld:
            self.blocks.append("".join(self.parts).strip())
            self.in_jsonld = False


def flatten(value):
    nodes = []
    if isinstance(value, list):
        for item in value:
            nodes.extend(flatten(item))
    elif isinstance(value, dict):
        if "@graph" in value:
            nodes.extend(flatten(value["@graph"]))
        else:
            nodes.append(value)
    return nodes


def audit(url, residues):
    req = urllib.request.Request(url, headers={"User-Agent": "Barry-Schema-Audit/1.0"})
    with urllib.request.urlopen(req, timeout=30) as response:
        html = response.read().decode("utf-8", errors="replace")
    parser = JsonLdParser()
    parser.feed(html)
    errors, nodes = [], []
    for index, block in enumerate(parser.blocks):
        try:
            nodes.extend(flatten(json.loads(block)))
        except Exception as exc:
            errors.append(f"block {index + 1}: {exc}")
    types, ids = [], []
    for node in nodes:
        node_types = node.get("@type", [])
        types.extend(node_types if isinstance(node_types, list) else [node_types])
        if node.get("@id"):
            ids.append(node["@id"])
    duplicate_ids = [item for item, count in Counter(ids).items() if count > 1]
    lower = html.lower()
    found_residue = [term for term in residues if term.lower() in lower]
    return {
        "url": url,
        "jsonld_blocks": len(parser.blocks),
        "nodes": len(nodes),
        "types": sorted(set(filter(None, types))),
        "ids": sorted(set(ids)),
        "duplicate_ids": duplicate_ids,
        "residue": found_residue,
        "parse_errors": errors,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("urls", nargs="+")
    ap.add_argument("--residue", action="append", default=[])
    args = ap.parse_args()
    results = []
    failed = False
    for url in args.urls:
        try:
            results.append(audit(url, args.residue))
        except Exception as exc:
            failed = True
            results.append({"url": url, "fetch_error": str(exc)})
    print(json.dumps(results, indent=2))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
