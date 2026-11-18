"""Exercise the website's actual quickstart against the pinned PyPI facade."""
import asyncio
import importlib.metadata
import json
from pathlib import Path
import re
import httpx

root = Path(__file__).resolve().parents[1]
snapshot = json.loads((root / "src/content/source-snapshot.json").read_text(encoding="utf-8"))
facade = next(p for p in snapshot["packages"] if p["name"] == "tigrbl")
assert importlib.metadata.version("tigrbl") == facade["publication"]["version"]
code = re.search(r"export const HEALTH_CODE = `([\s\S]*?)`;", (root / "src/content/examples.ts").read_text(encoding="utf-8")).group(1)
namespace = {}
exec(compile(code, "website-quickstart.py", "exec"), namespace)


async def check():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=namespace["app"]), base_url="http://test") as client:
        response = await client.get("/health")
    assert response.status_code == 200, response.text
    assert response.json() == {"status": "ok"}
    print(f"Website quickstart passed against tigrbl {importlib.metadata.version('tigrbl')}: GET /health -> 200")


asyncio.run(check())
