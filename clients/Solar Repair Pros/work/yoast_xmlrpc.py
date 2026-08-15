#!/usr/bin/env python3
"""Inspect or update Yoast custom fields through WordPress XML-RPC."""
import argparse, json, os, sys, xmlrpc.client


YOAST_PREFIX = "_yoast_wpseo_"


def server():
    url=os.environ["WP_XMLRPC_URL"]
    return xmlrpc.client.ServerProxy(url, allow_none=True)


def auth():
    return os.environ["WP_USER"], os.environ["WP_APP_PASS"]


def get_post(api, post_id):
    user,pw=auth(); return api.wp.getPost(0,user,pw,int(post_id),["post_id","post_type","post_title","post_status","custom_fields"])


def fields_by_key(post):
    out={}
    for field in post.get("custom_fields",[]):
        if field.get("key","").startswith(YOAST_PREFIX): out.setdefault(field["key"],[]).append(field)
    return out


def inspect(ids):
    api=server(); out=[]
    for pid in ids:
        post=get_post(api,pid); out.append({"id":pid,"title":post.get("post_title"),"fields":fields_by_key(post)})
    print(json.dumps(out,indent=2,default=str))


def update(path):
    api=server(); user,pw=auth(); plan=json.load(open(path,encoding="utf-8")); results=[]
    for item in plan:
        pid=int(item["id"]); post=get_post(api,pid); existing=fields_by_key(post); custom=[]
        for key,value in item["fields"].items():
            rows=existing.get(key,[])
            if rows:
                custom.append({"id":rows[0]["id"],"key":key,"value":str(value)})
            else:
                custom.append({"key":key,"value":str(value)})
        ok=api.wp.editPost(0,user,pw,pid,{"custom_fields":custom})
        reread=fields_by_key(get_post(api,pid))
        results.append({"id":pid,"updated":bool(ok),"verified":{k:[r.get("value") for r in reread.get(k,[])] for k in item["fields"]}})
    print(json.dumps(results,indent=2,default=str))


def main():
    ap=argparse.ArgumentParser(); sub=ap.add_subparsers(dest="cmd",required=True)
    p=sub.add_parser("inspect"); p.add_argument("ids",nargs="+",type=int)
    p=sub.add_parser("update"); p.add_argument("plan")
    a=ap.parse_args()
    if a.cmd=="inspect": inspect(a.ids)
    else: update(a.plan)
    return 0


if __name__=="__main__": sys.exit(main())
