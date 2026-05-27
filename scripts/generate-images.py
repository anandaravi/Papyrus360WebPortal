#!/usr/bin/env python3
"""Generate images for papyrus360.com via Cloudflare Workers AI flux-1-schnell."""

import os
import sys
import time
import requests
import base64
import json
from datetime import datetime

ACCOUNT_ID = os.environ.get("CLOUDFLARE_ACCOUNT_ID", "")
API_TOKEN = os.environ.get("CLOUDFLARE_API_TOKEN", "")
ACCOUNT_ID2 = os.environ.get("CLOUDFLARE_ACCOUNT_ID2", "")
API_TOKEN2 = os.environ.get("CLOUDFLARE_API_TOKEN2", "")

if not ACCOUNT_ID or not API_TOKEN:
    sys.exit("Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN env vars (see .env.local)")
MODEL = "@cf/black-forest-labs/flux-1-schnell"
BASE_DIR = "/home/ravi/development/papyrus360/public/images"

_state = {"account": 1, "id": ACCOUNT_ID, "token": API_TOKEN}


def _url():
    return f"https://api.cloudflare.com/client/v4/accounts/{_state['id']}/ai/run/{MODEL}"


def _switch():
    if _state["account"] == 2:
        return False
    _state.update({"account": 2, "id": ACCOUNT_ID2, "token": API_TOKEN2})
    print("  → switched to account 2")
    return True


IMAGES = [
    # --- HOME ---
    {
        "dir": "home",
        "file": "hero.png",
        "w": 1360, "h": 768,
        "prompt": "Panoramic aerial view of large modern Indian paper manufacturing facility at dusk, multiple paper machines visible through industrial skylights, warm amber industrial lighting, dramatic sky with clouds, photorealistic professional photography, cinematic wide angle",
    },
    {
        "dir": "home",
        "file": "why-expertise.png",
        "w": 800, "h": 600,
        "prompt": "Senior Indian paper industry expert in hard hat standing confidently on paper mill floor, experienced engineer with 35 years in industry, paper machines in background, professional corporate photography, warm industrial lighting, photorealistic",
    },
    {
        "dir": "home",
        "file": "why-compliance.png",
        "w": 800, "h": 600,
        "prompt": "Indian CFO reviewing GST compliance dashboard on large monitor, GSTR-3B and e-invoice documents visible on screen, professional Indian finance executive at paper mill, modern corporate office, photorealistic",
    },
    {
        "dir": "home",
        "file": "why-optimization.png",
        "w": 800, "h": 600,
        "prompt": "Indian production planner at paper mill reviewing deckle optimization results on screen, trim waste reduction chart showing improvement, professional planning office at paper mill, photorealistic",
    },
    # --- PRODUCTS ---
    {
        "dir": "products",
        "file": "bpapp.png",
        "w": 1200, "h": 800,
        "prompt": "Modern enterprise ERP dashboard on large monitor at Indian paper mill, multiple KPI panels showing production output sales orders and financial metrics, dark professional UI, paper mill executive reviewing integrated data, photorealistic",
    },
    {
        "dir": "products",
        "file": "optrim.png",
        "w": 1200, "h": 800,
        "prompt": "Deckle matching optimization software on desktop computer screen at paper mill, mathematical cutting patterns for paper reels displayed visually, slitting diagram showing optimal cuts, paper width optimization interface, industrial office setting, photorealistic",
    },
    {
        "dir": "products",
        "file": "optrim-web.png",
        "w": 1200, "h": 800,
        "prompt": "Web browser showing deckle matching application interface, clean modern SaaS dashboard for paper roll cutting optimization, tablet and laptop showing same responsive interface, modern web application, photorealistic",
    },
    {
        "dir": "products",
        "file": "papy-erp.png",
        "w": 1200, "h": 800,
        "prompt": "Custom order management and production planning system on screen at Indian paper mill, sales orders linked to production schedule on dashboard, mill-specific ERP interface, professional paper industry software, photorealistic",
    },
    {
        "dir": "products",
        "file": "pdn.png",
        "w": 1200, "h": 800,
        "prompt": "Paper conversion process management application on tablet at converting facility, reel to sheet conversion workflow tracker, converting machine job tracking screen, industrial tablet at paper converting machine, photorealistic",
    },
    {
        "dir": "products",
        "file": "paper-agent.png",
        "w": 1200, "h": 800,
        "prompt": "Indian paper dealer at office desk using desktop software for managing paper inventory and customer orders, paper trading company office with stacks of paper samples, professional paper merchant software interface, photorealistic",
    },
    {
        "dir": "products",
        "file": "ndm.png",
        "w": 1200, "h": 800,
        "prompt": "Legacy desktop application running on older Windows PC at paper mill planning office, deckle matching calculation results displayed, older industrial computer workstation at paper mill, nostalgic industrial computing environment, photorealistic",
    },
    # --- SERVICES ---
    {
        "dir": "services",
        "file": "erp-implementation.png",
        "w": 1200, "h": 800,
        "prompt": "ERP implementation consultant team at Indian paper mill conference room, consultants and mill staff gathered around table reviewing system configuration, go-live project plan on whiteboard, professional IT implementation team, photorealistic",
    },
    {
        "dir": "services",
        "file": "it-infrastructure.png",
        "w": 1200, "h": 800,
        "prompt": "IT infrastructure setup at Indian paper mill, server rack installation in clean server room, network engineer configuring switches and servers, professional IT team at industrial facility, modern data center inside paper mill, photorealistic",
    },
    {
        "dir": "services",
        "file": "process-consulting.png",
        "w": 1200, "h": 800,
        "prompt": "Process optimization consultant at Indian paper mill production floor, experienced consultant with clipboard analyzing paper machine workflow, mill workers and consultant reviewing operations process, professional industrial consulting, photorealistic",
    },
    {
        "dir": "services",
        "file": "compliance-consulting.png",
        "w": 1200, "h": 800,
        "prompt": "Indian compliance consultant meeting with paper mill management team, GST TDS FEMA regulatory documents spread on conference table, professional legal compliance advisory session, corporate meeting room at Indian paper company, photorealistic",
    },
    {
        "dir": "services",
        "file": "raw-material-sourcing.png",
        "w": 1200, "h": 800,
        "prompt": "Raw material sourcing for Indian paper industry, large warehouse with organized bales of waste paper OCC and pulp, procurement team inspecting raw material quality, industrial raw material supply chain, Indian paper industry raw materials, photorealistic",
    },
    # --- ABOUT ---
    {
        "dir": "about",
        "file": "hero.png",
        "w": 1360, "h": 768,
        "prompt": "Netique Infotech company headquarters office in Bangalore India, modern corporate office building exterior with Papyrus360 signage, professional Indian IT company building, corporate photography, photorealistic",
    },
    {
        "dir": "about",
        "file": "story.png",
        "w": 800, "h": 600,
        "prompt": "Indian paper industry veteran founder explaining deckle optimization concept to young engineers, experienced mentor with 35 years of expertise, whiteboard with paper cutting diagrams, knowledge transfer at Indian tech company, professional corporate photography, photorealistic",
    },
    {
        "dir": "about",
        "file": "team.png",
        "w": 800, "h": 600,
        "prompt": "Diverse Indian software development team at Papyrus360 office, engineers and consultants collaborating at workstations, modern Bangalore tech office interior, professional team photo style, Indian corporate team, photorealistic",
    },
    # --- CLIENTS ---
    {
        "dir": "clients",
        "file": "hero.png",
        "w": 1360, "h": 768,
        "prompt": "Indian paper mill owner shaking hands with Papyrus360 software consultant, successful partnership, paper mill factory floor in background with running machines, trust and relationship, professional Indian business photography, photorealistic",
    },
    {
        "dir": "clients",
        "file": "mills-india.png",
        "w": 1200, "h": 800,
        "prompt": "Collage view of diverse Indian paper mills across different regions, Gujarat kraft mill Punjab newsprint mill Tamil Nadu board mill Odisha paper mill, Indian paper industry landscape diversity, photorealistic",
    },
    # --- BLOG ---
    {
        "dir": "blog",
        "file": "hero.png",
        "w": 1360, "h": 768,
        "prompt": "Paper industry knowledge hub concept, open books and digital tablets showing paper manufacturing insights, industry expert writing about Indian paper industry trends, professional thought leadership content creation, photorealistic",
    },
]


def generate(img):
    out = os.path.join(BASE_DIR, img["dir"], img["file"])
    if os.path.exists(out) and os.path.getsize(out) > 10000:
        print(f"  SKIP {img['dir']}/{img['file']} ({os.path.getsize(out)} bytes)")
        return True
    os.makedirs(os.path.dirname(out), exist_ok=True)
    print(f"  GEN  {img['dir']}/{img['file']}...")
    payload = {
        "prompt": img["prompt"],
        "num_steps": 4,
        "width": img["w"],
        "height": img["h"],
    }
    resp = None
    for attempt in range(2):
        headers = {
            "Authorization": f"Bearer {_state['token']}",
            "Content-Type": "application/json",
        }
        try:
            resp = requests.post(_url(), headers=headers, json=payload, timeout=120)
        except Exception as e:
            print(f"  ERR  {img['dir']}/{img['file']}: {e}")
            return False
        if resp.status_code == 429:
            if _switch():
                continue
            print("  STOP: quota exhausted on both accounts")
            sys.exit(2)
        break
    if resp is None or resp.status_code != 200:
        code = resp.status_code if resp is not None else "?"
        text = resp.text[:200] if resp is not None else ""
        print(f"  FAIL HTTP {code}: {text}")
        return False
    ct = resp.headers.get("Content-Type", "")
    if "image" in ct:
        data = resp.content
    else:
        try:
            parsed = json.loads(resp.content)
            data = base64.b64decode(parsed["result"]["image"])
        except Exception as e:
            print(f"  FAIL parse: {e} — {resp.text[:300]}")
            return False
    if len(data) < 1000:
        print(f"  FAIL too small ({len(data)} bytes)")
        return False
    with open(out, "wb") as f:
        f.write(data)
    print(f"  DONE {img['dir']}/{img['file']} ({len(data)} bytes)")
    return True


def _log_summary(gen, skip, fail):
    log_path = os.path.join(os.path.dirname(__file__), "_generation.log")
    ts = datetime.now().isoformat(timespec="seconds")
    with open(log_path, "a") as f:
        f.write(f"{ts} generate-images.py gen={gen} skip={skip} fail={fail}\n")


if __name__ == "__main__":
    print(f"Generating {len(IMAGES)} images via CF flux-1-schnell → {BASE_DIR}\n")
    total = gen = skip = fail = 0
    for img in IMAGES:
        total += 1
        out = os.path.join(BASE_DIR, img["dir"], img["file"])
        existed = os.path.exists(out) and os.path.getsize(out) > 10000
        ok = generate(img)
        if ok and existed:
            skip += 1
        elif ok:
            gen += 1
        else:
            fail += 1
        time.sleep(0.5)
    print(f"\n{total} total — {gen} generated, {skip} skipped, {fail} failed")
    _log_summary(gen, skip, fail)
