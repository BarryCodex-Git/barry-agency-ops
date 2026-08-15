#!/usr/bin/env python3
import argparse, json, re, urllib.request
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse


class AuditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title=[]; self.in_title=False; self.heading=None; self.headings=[]
        self.links=[]; self.images=[]; self.meta={}; self.canonicals=[]; self.text=[]
        self.skip=0
    def handle_starttag(self, tag, attrs):
        a=dict(attrs); tag=tag.lower()
        if tag in ('script','style','noscript'): self.skip+=1
        if tag=='title': self.in_title=True
        if tag in ('h1','h2','h3'): self.heading=[tag,[]]
        if tag=='a' and a.get('href'): self.links.append({'text':'','href':a['href']})
        if tag=='img': self.images.append({'src':a.get('src',''),'alt':a.get('alt','')})
        if tag=='meta':
            key=(a.get('name') or a.get('property') or '').lower()
            if key: self.meta[key]=a.get('content','')
        if tag=='link' and a.get('rel','').lower()=='canonical': self.canonicals.append(a.get('href',''))
    def handle_endtag(self, tag):
        tag=tag.lower()
        if tag in ('script','style','noscript') and self.skip: self.skip-=1
        if tag=='title': self.in_title=False
        if self.heading and tag==self.heading[0]:
            self.headings.append({'tag':tag,'text':re.sub(r'\s+',' ',' '.join(self.heading[1])).strip()}); self.heading=None
    def handle_data(self, data):
        if self.skip: return
        clean=re.sub(r'\s+',' ',data).strip()
        if not clean: return
        self.text.append(clean)
        if self.in_title: self.title.append(clean)
        if self.heading: self.heading[1].append(clean)
        if self.links: self.links[-1]['text']=(self.links[-1]['text']+' '+clean).strip()


def fetch(url):
    req=urllib.request.Request(url,headers={'User-Agent':'Barry-Final-Review/1.0'})
    with urllib.request.urlopen(req,timeout=30) as r:
        return r.status,r.geturl(),r.read().decode('utf-8','replace')


def audit(url,residues):
    status,final,html=fetch(url); p=AuditParser(); p.feed(html)
    body=' '.join(p.text); lower=html.lower(); base=urlparse(final).netloc
    tel=[]; mail=[]; wa=[]; bad_hash=[]
    for link in p.links:
        href=link['href']; low=href.lower()
        if low.startswith('tel:'): tel.append(link)
        if low.startswith('mailto:'): mail.append(link)
        if 'wa.me' in low: wa.append(link)
        if href=='#': bad_hash.append(link)
    internal=[urljoin(final,x['href']) for x in p.links if x['href'].startswith('/') or urlparse(urljoin(final,x['href'])).netloc==base]
    return {
      'url':final,'status':status,'title':' '.join(p.title),'meta_description':p.meta.get('description'),
      'canonical':p.canonicals,'og_title':p.meta.get('og:title'),'og_description':p.meta.get('og:description'),
      'og_image':p.meta.get('og:image'),'robots':p.meta.get('robots'),'headings':p.headings,
      'h1_count':sum(1 for h in p.headings if h['tag']=='h1'),'word_count':len(re.findall(r"\b[\w'-]+\b",body)),
      'empty_alt_count':sum(1 for i in p.images if not i['alt'].strip()),'image_count':len(p.images),
      'tel':tel,'mailto':mail,'whatsapp':wa,'hash_links':bad_hash,
      'residue':[x for x in residues if x.lower() in lower],
      'internal_link_count':len(set(internal))
    }


def main():
    ap=argparse.ArgumentParser(); ap.add_argument('urls',nargs='+'); ap.add_argument('--residue',action='append',default=[]); a=ap.parse_args()
    out=[]
    for u in a.urls:
        try: out.append(audit(u,a.residue))
        except Exception as e: out.append({'url':u,'error':str(e)})
    print(json.dumps(out,indent=2)); return 0


if __name__=='__main__': raise SystemExit(main())
