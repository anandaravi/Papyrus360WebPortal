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
    # --- PAPER MILL MACHINES ---
    {
        "dir": "machines",
        "file": "hydrapulper.png",
        "w": 800, "h": 600,
        "prompt": "Industrial hydrapulper at paper mill stock preparation area, large cylindrical stainless steel vessel with rotating impeller dissolving wastepaper bales in water, blue stock preparation hall, close-up of pulper drum, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "disc-refiner.png",
        "w": 800, "h": 600,
        "prompt": "Paper mill disc refiner machine, large horizontal industrial refiner with inlet and outlet pipes, fiber refining equipment in stock preparation room, refiner discs visible, industrial machinery photography, photorealistic",
    },
    {
        "dir": "machines",
        "file": "pressure-screen.png",
        "w": 800, "h": 600,
        "prompt": "Pressure screen equipment in paper mill stock preparation area, tall cylindrical closed screening vessel with pressure gauges and connecting pipes, fiber cleaning machinery, industrial photography, photorealistic",
    },
    {
        "dir": "machines",
        "file": "headbox.png",
        "w": 800, "h": 600,
        "prompt": "Modern paper machine headbox at wet end, tapered rectangular headbox distributing white fiber suspension evenly across full width onto forming wire, close-up of headbox slice opening with turbulence generators, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "fourdrinier.png",
        "w": 800, "h": 600,
        "prompt": "Fourdrinier paper machine forming section at paper mill, long continuous forming wire fabric with white fiber slurry draining through it, wet end of paper machine with suction boxes and table rolls below wire, wide angle view, photorealistic",
    },
    {
        "dir": "machines",
        "file": "twin-wire-former.png",
        "w": 800, "h": 600,
        "prompt": "Modern twin-wire former gap former on high-speed paper machine, two converging forming fabrics squeezing fiber suspension between them at high speed, wet end forming section of modern paper machine, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "shoe-press.png",
        "w": 800, "h": 600,
        "prompt": "Paper machine extended nip shoe press section, large shoe press roll with concave shoe against backing roll, press felts visible, massive press nip removing water from paper web, industrial paper machine press section, photorealistic",
    },
    {
        "dir": "machines",
        "file": "dryer-section.png",
        "w": 800, "h": 600,
        "prompt": "Multi-cylinder dryer section of paper machine, long row of large steam-heated cast iron drying cylinders with paper web threading over and under cylinders alternately, dryer felts and steam pipes visible, industrial photography, photorealistic",
    },
    {
        "dir": "machines",
        "file": "yankee-dryer.png",
        "w": 800, "h": 600,
        "prompt": "Enormous Yankee dryer cylinder in tissue paper mill, massive 5-metre diameter polished chrome steel cylinder for tissue drying and creping, doctor blade at bottom of cylinder, tissue machine with hood over top, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "size-press.png",
        "w": 800, "h": 600,
        "prompt": "Size press on paper machine, two rolls forming nip with paper web passing between them, starch solution flooding the nip from above, surface sizing station midway along paper machine, industrial photography, photorealistic",
    },
    {
        "dir": "machines",
        "file": "blade-coater.png",
        "w": 800, "h": 600,
        "prompt": "Blade coating station on paper machine, white coating color applied to paper web with flexible steel blade metering coating layer, coating kitchen with mixing tanks in background, coated paper production, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "machine-calender.png",
        "w": 800, "h": 600,
        "prompt": "Machine calender stack at end of paper machine, vertical stack of heavy polished steel rolls compressing and smoothing paper web, paper threading through calender nip, finishing section of paper machine, photorealistic",
    },
    {
        "dir": "machines",
        "file": "supercalender.png",
        "w": 800, "h": 600,
        "prompt": "Tall supercalender machine at paper mill, offline calendering equipment with alternating steel and fiber-filled cotton rolls in a tall vertical stack, paper web threading through all nips, shiny surface on calender rolls, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "pope-reel.png",
        "w": 800, "h": 600,
        "prompt": "Pope reel assembly at paper mill, side view of complete pope reel machine showing the large horizontal drive drum roll on left, paper reel spool building up on the right being driven by the drum, steel frame structure with guide arms holding the growing paper reel, industrial warehouse floor, similar to manufacturer product photograph of pope reel assembly unit, photorealistic industrial equipment photography",
    },
    {
        "dir": "machines",
        "file": "slitter-rewinder.png",
        "w": 800, "h": 600,
        "prompt": "Aerial bird's eye view of complete slitter rewinder machine at paper mill, large parent jumbo reel unwinding on left, multiple circular slitting knives visible in center cutting paper web into separate lanes, multiple finished customer reels rewinding simultaneously on right, full machine layout visible from above, industrial overhead photography photorealistic",
    },
    {
        "dir": "machines",
        "file": "sheet-cutter.png",
        "w": 800, "h": 600,
        "prompt": "High-speed sheeter machine at paper converting facility, continuous paper reel being cut into precisely sized sheets by cross-cutting blade, stacks of cut sheets accumulating on delivery table, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "digester.png",
        "w": 800, "h": 600,
        "prompt": "Large kraft digester vessel at pulp mill, tall cylindrical pressure vessel for cooking wood chips in chemicals at high temperature, continuous digester with chip feeding at top, industrial pulp mill chemical pulping, photorealistic photography",
    },
    {
        "dir": "machines",
        "file": "recovery-boiler.png",
        "w": 800, "h": 600,
        "prompt": "Recovery boiler at kraft pulp mill, massive industrial boiler burning concentrated black liquor, tall boiler structure with steam rising, smelt spout at bottom, chemical recovery process, pulp mill aerial view, photorealistic industrial photography",
    },
    # --- MACHINES: WOOD YARD ---
    {
        "dir": "machines",
        "file": "chipper.png",
        "w": 800, "h": 600,
        "prompt": "Large industrial wood chipper at paper mill wood yard, massive disc chipper or drum chipper processing whole logs into uniform wood chips, log feeding conveyor, wood chips flying out into chip pile, paper mill wood handling area, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "chip-screen.png",
        "w": 800, "h": 600,
        "prompt": "Chip screening machine at paper mill wood yard, vibrating deck chip screen separating wood chips by size, oversized and undersized chip fractions separated on different decks, chip classification equipment, industrial wood yard, photorealistic photography",
    },
    # --- MACHINES: STOCK PREP ADDITIONAL ---
    {
        "dir": "machines",
        "file": "drum-pulper.png",
        "w": 800, "h": 600,
        "prompt": "Large drum pulper at recycled fiber paper mill, long rotating horizontal cylindrical drum dissolving old corrugated containers OCC in water, drum pulper openings visible, continuous recycled paper processing, stock preparation equipment, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "broke-pulper.png",
        "w": 800, "h": 600,
        "prompt": "Broke pulper at paper mill under paper machine, compact pulper vessel collecting and re-pulping damaged paper broke and edge trim, broke conveyor feeding pulper, continuous broke recovery system under paper machine, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "flotation-deinking.png",
        "w": 800, "h": 600,
        "prompt": "Flotation deinking cell at recycled fiber paper mill, series of large flotation tanks with foam bubbles carrying ink particles to surface, ink foam removal from recycled pulp, deinking plant equipment, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "high-density-cleaner.png",
        "w": 800, "h": 600,
        "prompt": "High-density centrifugal cleaner battery at paper mill stock preparation, bank of conical vortex cleaners removing heavy contaminants like sand staples and grit from paper pulp, cleaner manifold with accept and reject connections, photorealistic industrial photography",
    },
    # --- MACHINES: PULP MILL ---
    {
        "dir": "machines",
        "file": "brown-stock-washer.png",
        "w": 800, "h": 600,
        "prompt": "Brown stock washer drum at kraft pulp mill, large rotating horizontal drum washer washing black liquor from cooked brown pulp, multiple wash stages, pulp mat forming on drum surface, industrial pulp washing equipment, photorealistic photography",
    },
    {
        "dir": "machines",
        "file": "oxygen-delignification.png",
        "w": 800, "h": 600,
        "prompt": "Oxygen delignification reactor tower at kraft pulp mill, tall vertical pressurized reactor vessel where pulp is treated with oxygen and caustic soda to remove residual lignin before bleaching, pulp mill processing equipment, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "bleaching-tower.png",
        "w": 800, "h": 600,
        "prompt": "Bleaching tower at pulp mill, tall vertical bleach tower for chemical bleaching of kraft pulp, multiple bleaching stage towers with connecting pipes and washers, pulp going from brown to white through bleaching sequence, photorealistic industrial photography",
    },
    # --- MACHINES: FORMING ADDITIONAL ---
    {
        "dir": "machines",
        "file": "cylinder-mould.png",
        "w": 800, "h": 600,
        "prompt": "Cylinder mould vat machine at paper mill, rotating cylindrical wire mould submerged in vat of fiber suspension, multi-ply board formation on vat machine, paperboard manufacturing equipment, multiple vat units in line for multi-ply board, photorealistic industrial photography",
    },
    # --- MACHINES: PRESS ADDITIONAL ---
    {
        "dir": "machines",
        "file": "conventional-press.png",
        "w": 800, "h": 600,
        "prompt": "Conventional press section of paper machine, two large press rolls forming a nip, press felts on both sides absorbing water squeezed from wet paper web, press roll with grooves for water drainage, paper machine wet pressing, photorealistic industrial photography",
    },
    # --- MACHINES: FINISHING ADDITIONAL ---
    {
        "dir": "machines",
        "file": "soft-calender.png",
        "w": 800, "h": 600,
        "prompt": "Soft calender on paper machine, two-nip calender with one hard steel roll and one soft elastic polymer-covered roll, gentle calendering for gloss without excessive caliper loss, paper machine finishing section, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "film-press.png",
        "w": 800, "h": 600,
        "prompt": "Film press metered size press on paper machine, two rolls with film applicator system applying precise controlled layer of starch or coating to paper web surface, modern surface sizing technology, paper machine mid-section, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "curtain-coater.png",
        "w": 800, "h": 600,
        "prompt": "Curtain coater applying coating to paper, thin falling curtain of coating liquid descending onto moving paper web below, contactless curtain coating technology, precise uniform coating application, modern paper coating equipment, photorealistic industrial photography",
    },
    # --- MACHINES: CHEMICAL RECOVERY ADDITIONAL ---
    {
        "dir": "machines",
        "file": "black-liquor-evaporators.png",
        "w": 800, "h": 600,
        "prompt": "Black liquor evaporator station at kraft pulp mill, multiple-effect evaporator vessels concentrating weak black liquor to high solids before burning, tall evaporator columns with connecting pipes, steam and condensate system, chemical recovery plant, photorealistic photography",
    },
    {
        "dir": "machines",
        "file": "lime-kiln.png",
        "w": 800, "h": 600,
        "prompt": "Lime kiln at kraft pulp mill chemical recovery, long rotating horizontal cylindrical kiln converting calcium carbonate lime mud back to quicklime at high temperature, lime kiln with firing end flames, chemical recovery cycle, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "causticizer.png",
        "w": 800, "h": 600,
        "prompt": "Causticizing plant at kraft pulp mill, row of agitated causticizer tanks where quicklime reacts with green liquor to regenerate white cooking liquor, white liquor clarifier, chemical recovery causticizing process, photorealistic industrial photography",
    },
    # --- MACHINES: CONVERTING ADDITIONAL ---
    {
        "dir": "machines",
        "file": "simplex-winder.png",
        "w": 800, "h": 600,
        "prompt": "Simplex single-drum winder at paper mill converting, single parent reel unwinding and rewinding onto one set of customer reels simultaneously, basic winding configuration, paper roll converting equipment, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "duplex-winder.png",
        "w": 800, "h": 600,
        "prompt": "Duplex winder at paper mill converting department, two sets of finished paper reels being wound simultaneously from single parent reel, dual rewinding stations side by side, high productivity winding configuration, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "triplex-winder.png",
        "w": 800, "h": 600,
        "prompt": "Triplex winder at paper mill, three simultaneous sets of paper reels being wound from parent reel at high speed, three rewinding stations operating in parallel, maximum productivity winding configuration at paper converting facility, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "salvage-cutter.png",
        "w": 800, "h": 600,
        "prompt": "Salvage cutter at paper mill converting, machine trimming and cutting damaged or defective edges from paper reels, salvage blade removing spoiled surface layers from reel ends, paper roll salvage and reclaim equipment, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "guillotine-cutter.png",
        "w": 800, "h": 600,
        "prompt": "Guillotine cutter at paper converting facility, large hydraulic guillotine cutting machine slicing through thick stack of paper sheets with precision blade, heavy-duty paper cutting equipment, paper finishing department, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "core-cutter.png",
        "w": 800, "h": 600,
        "prompt": "Core cutter machine at paper mill, automatic cardboard tube core cutting machine slicing long paper cores into precise lengths for paper winding, core manufacturing equipment, paper mill converting ancillary, photorealistic industrial photography",
    },
    {
        "dir": "machines",
        "file": "roll-wrapper.png",
        "w": 800, "h": 600,
        "prompt": "Roll wrapper machine at paper mill packaging line, automatic paper reel wrapping machine applying protective kraft wrapper and end caps to finished paper rolls, roll packaging equipment, finished goods preparation at paper mill, photorealistic industrial photography",
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
