import json
f = open("lh-homepage-deep.json","r",encoding="utf-8")
lhr = json.load(f)
f.close()
audits = lhr["audits"]
sep = "=" * 80
def pa(aid, label=None):
    a = audits.get(aid)
    if not a:
        print("[MISSING] " + aid)
        return a
    print("")
    print(sep)
    print(label or aid)
    dv = a.get("displayValue","n/a")
    nv = a.get("numericValue","n/a")
    nu = a.get("numericUnit","")
    sc = a.get("score")
    print("Score: %s  |  Display: %s  |  Numeric: %s %s" % (sc, dv, nv, nu))
    print(sep)
    return a
print("")
print("#"*80)
print("  LIGHTHOUSE PERFORMANCE REPORT")
print("  URL: %s" % lhr.get("requestedUrl"))
print("  Fetch time: %s" % lhr.get("fetchTime"))
cs = lhr.get("configSettings",{})
print("  Form factor: %s" % cs.get("formFactor"))
print("  Throttling: %s" % json.dumps(cs.get("throttling"), indent=2))
perf = lhr.get("categories",{}).get("performance",{})
print("  OVERALL SCORE: %d" % round((perf.get("score",0) or 0)*100))
print("#"*80)
print("")
print(sep)
print("CORE WEB VITALS")
print(sep)
for aid in ["first-contentful-paint","largest-contentful-paint","total-blocking-time","cumulative-layout-shift","speed-index","interactive","max-potential-fid"]:
    a = audits.get(aid,{})
    dv = str(a.get("displayValue",""))
    print("  %-35s %-12s score=%s  numeric=%s %s" % (aid, dv, a.get("score"), a.get("numericValue"), a.get("numericUnit","")))
a = pa("server-response-time", "SERVER RESPONSE TIME (TTFB)")
if a and a.get("details",{}).get("items"):
    for item in a["details"]["items"]:
        print("  URL: %s" % item.get("url"))
        print("  Response time: %s ms" % item.get("responseTime"))
print("")
print(sep)
print("ALL AUDITS WITH lcp IN THE ID")
print(sep)
for aid, a in audits.items():
    if "lcp" in aid.lower():
        print("")
        print("  --- %s ---" % aid)
        print("  Title: %s" % a.get("title"))
        print("  Score: %s  Display: %s" % (a.get("score"), a.get("displayValue","n/a")))
        desc = (a.get("description") or "")[:200]
        print("  Description: %s" % desc)
        items = (a.get("details") or {}).get("items") or []
        if items:
            print("  Items (%d):" % len(items))
            for item in items[:5]:
                print("    %s" % json.dumps(item))
a = pa("largest-contentful-paint-element", "LCP ELEMENT DETAILS")
if a:
    items = (a.get("details") or {}).get("items") or []
    for item in items:
        print(json.dumps(item, indent=2))
    headings = (a.get("details") or {}).get("headings")
    if headings:
        print("  Headings: %s" % json.dumps(headings))
a = pa("lcp-lazy-loaded", "LCP LAZY LOADED CHECK")
if a:
    for item in (a.get("details") or {}).get("items") or []:
        print(json.dumps(item, indent=2))
a = pa("prioritize-lcp-image", "PRIORITIZE LCP IMAGE")
if a:
    for item in (a.get("details") or {}).get("items") or []:
        print(json.dumps(item, indent=2))
    dd = (a.get("details") or {}).get("debugData")
    if dd:
        print("  Debug data: %s" % json.dumps(dd, indent=2))
a = pa("critical-request-chains", "CRITICAL REQUEST CHAINS")
if a:
    details = a.get("details") or {}
    chains = details.get("chains") or {}
    def walk(node, depth=0):
        for cid, child in node.items():
            req = child.get("request",{})
            indent = "  " * (depth+1)
            ts = req.get("transferSize",0)
            tsStr = "%.1fkB" % (ts/1024) if ts else "?"
            url = (req.get("url") or "")[:120]
            st = req.get("startTime",0)
            et = req.get("endTime",0)
            print("%s[%s] %s (%.0f-%.0fms)" % (indent, tsStr, url, st, et))
            if child.get("children"):
                walk(child["children"], depth+1)
    walk(chains)
    lc = details.get("longestChain",{})
    if lc:
        print("  Longest chain: %.0f ms, %s requests, %.1f kB" % (lc.get("duration",0), lc.get("length"), lc.get("transferSize",0)/1024))
a = pa("render-blocking-resources", "RENDER BLOCKING RESOURCES")
if a:
    items = (a.get("details") or {}).get("items") or []
    print("  Potential savings: %s" % a.get("displayValue"))
    for item in items:
        tb = item.get("totalBytes",0)/1024
        wm = item.get("wastedMs",0)
        url = (item.get("url") or "")[:120]
        print("  [%.1f kB, %.0f ms wasted] %s" % (tb, wm, url))
a = pa("mainthread-work-breakdown", "MAIN THREAD WORK BREAKDOWN")
if a:
    items = (a.get("details") or {}).get("items") or []
    items_sorted = sorted(items, key=lambda x: x.get("duration",0), reverse=True)
    print("  Total: %.0f ms" % (a.get("numericValue",0)))
    for item in items_sorted:
        d = item.get("duration",0)
        bar = "#" * round(d/50)
        label = item.get("groupLabel") or item.get("group") or "?"
        print("  %-30s %6.0f ms  %s" % (label, d, bar))
a = pa("bootup-time", "BOOT-UP TIME")
if a:
    items = (a.get("details") or {}).get("items") or []
    items_sorted = sorted(items, key=lambda x: x.get("total",0), reverse=True)
    print("  Top scripts by total CPU time:")
    for item in items_sorted[:20]:
        url = (item.get("url") or "?")[:90].ljust(92)
        t = item.get("total",0)
        s = item.get("scripting",0)
        p = item.get("scriptParseCompile",0)
        print("  %s total=%.0fms  scripting=%.0fms  parse=%.0fms" % (url, t, s, p))
a = pa("network-requests", "NETWORK REQUESTS WATERFALL (first 30 by endTime)")
if a:
    items = (a.get("details") or {}).get("items") or []
    items_sorted = sorted(items, key=lambda x: x.get("endTime",0))
    print("  Total requests: %d" % len(items))
    print("  %3s %9s %9s %9s %9s prot  status mimeType                  URL" % ("#","start","end","dur","xfer"))
    for i, item in enumerate(items_sorted[:30]):
        st = item.get("startTime",0)
        et = item.get("endTime",0)
        dur = et - st
        ts = item.get("transferSize",0)
        xfer = "%.1fkB" % (ts/1024) if ts else "?"
        prot = (item.get("protocol") or "?")
        sc = item.get("statusCode","?")
        mt = (item.get("mimeType") or "?")[:25]
        url = (item.get("url") or "")[:100]
        print("  %3d %9.0f %9.0f %9.0f %9s %-5s %-7s%-26s%s" % (i+1, st, et, dur, xfer, prot, str(sc), mt, url))
a = pa("total-byte-weight", "TOTAL BYTE WEIGHT")
if a:
    items = (a.get("details") or {}).get("items") or []
    items_sorted = sorted(items, key=lambda x: x.get("totalBytes",0), reverse=True)
    print("  Total: %.0f kB" % (a.get("numericValue",0)/1024))
    for item in items_sorted[:20]:
        tb = item.get("totalBytes",0)/1024
        url = (item.get("url") or "")[:120]
        print("  %8.1f kB  %s" % (tb, url))
a = pa("diagnostics", "DIAGNOSTICS")
if a:
    items = (a.get("details") or {}).get("items") or []
    if items:
        for k, v in items[0].items():
            print("  %-35s %s" % (k, v))
a = pa("unused-javascript", "UNUSED JAVASCRIPT")
if a:
    items = (a.get("details") or {}).get("items") or []
    items_sorted = sorted(items, key=lambda x: x.get("wastedBytes",0), reverse=True)
    print("  Potential savings: %s" % a.get("displayValue"))
    for item in items_sorted[:15]:
        wb = item.get("wastedBytes",0)/1024
        tb = item.get("totalBytes",0)/1024
        url = (item.get("url") or "")[:110]
        print("  [%.1f kB wasted of %.1f kB] %s" % (wb, tb, url))
a = pa("unused-css-rules", "UNUSED CSS")
if a:
    items = (a.get("details") or {}).get("items") or []
    items_sorted = sorted(items, key=lambda x: x.get("wastedBytes",0), reverse=True)
    print("  Potential savings: %s" % a.get("displayValue"))
    for item in items_sorted[:10]:
        wb = item.get("wastedBytes",0)/1024
        tb = item.get("totalBytes",0)/1024
        url = (item.get("url") or "")[:110]
        print("  [%.1f kB wasted of %.1f kB] %s" % (wb, tb, url))
a = pa("uses-long-cache-ttl", "EFFICIENT CACHE POLICY")
if a:
    items = (a.get("details") or {}).get("items") or []
    print("  Resources with short cache TTL: %d" % len(items))
    for item in items[:10]:
        clm = item.get("cacheLifetimeMs")
        ttl = "%.1fh" % (clm/3600000) if clm else "none"
        tb = item.get("totalBytes",0)/1024
        url = (item.get("url") or "")[:110]
        print("  [TTL=%s, %.1fkB] %s" % (ttl, tb, url))
a = pa("uses-responsive-images", "RESPONSIVE IMAGES")
if a:
    items = (a.get("details") or {}).get("items") or []
    if items:
        for item in items[:10]:
            wb = item.get("wastedBytes",0)/1024
            url = (item.get("url") or "")[:110]
            print("  [%.1f kB wasted] %s" % (wb, url))
    else:
        print("  No issues found.")
a = pa("modern-image-formats", "MODERN IMAGE FORMATS")
if a:
    items = (a.get("details") or {}).get("items") or []
    if items:
        for item in items[:10]:
            wb = item.get("wastedBytes",0)/1024
            url = (item.get("url") or "")[:110]
            print("  [%.1f kB savings] %s" % (wb, url))
    else:
        print("  No issues found.")
print("")
print("#"*80)
print("  WATERFALL NARRATIVE: Navigation Start -> LCP")
print("#"*80)
ttfb = audits.get("server-response-time",{}).get("numericValue",0)
fcp = audits.get("first-contentful-paint",{}).get("numericValue",0)
lcp_val = audits.get("largest-contentful-paint",{}).get("numericValue",0)
si = audits.get("speed-index",{}).get("numericValue",0)
tbt = audits.get("total-blocking-time",{}).get("numericValue",0)
cls_v = audits.get("cumulative-layout-shift",{}).get("numericValue",0)
print("  0ms --- Navigation Start")
print("  %.0fms --- TTFB" % ttfb)
print("  %.0fms --- FCP" % fcp)
print("  %.0fms --- LCP" % lcp_val)
print("  %.0fms --- Speed Index" % si)
print("  TBT: %.0fms  CLS: %.4f" % (tbt, cls_v))
print("  Gap: 0->TTFB=%.0fms  TTFB->FCP=%.0fms  FCP->LCP=%.0fms  Total=%.0fms" % (ttfb, fcp-ttfb, lcp_val-fcp, lcp_val))
a = audits.get("resource-summary")
if a:
    pa("resource-summary", "RESOURCE SUMMARY")
    for item in (a.get("details") or {}).get("items") or []:
        label = (item.get("label") or "?")
        rc = item.get("requestCount",0)
        ts = item.get("transferSize",0)/1024
        print("  %-20s count=%3d  size=%8.1f kB" % (label, rc, ts))
print("")
print("[Analysis complete]")
