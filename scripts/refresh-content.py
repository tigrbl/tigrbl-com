"""Refresh reviewed source/publication facts; normal builds use the committed snapshot.

Usage: python scripts/refresh-content.py --organization-root /path/to/tigrbl
Requires Python 3.11+. No credentials or deployment mutations.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import subprocess
import tomllib


def tracked(repo: Path, pattern: str) -> list[str]:
    return subprocess.check_output(["git", "-C", str(repo), "ls-files", pattern], text=True).splitlines()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--organization-root", type=Path, required=True)
    parser.add_argument("--skip-publications", action="store_true", help="Collect local facts before running refresh-publications.mjs")
    args = parser.parse_args()
    repo = args.organization_root / "tigrbl"
    packages = []
    for path in tracked(repo, "*pyproject.toml"):
        if not re.match(r"pkgs/(?:[0-8][0-9]|9[0-5])_", path):
            continue
        project = tomllib.loads((repo / path).read_text(encoding="utf-8"))["project"]
        name = project["name"]
        group = "engine" if "engine" in name else "facade" if name == "tigrbl" else "op-pack" if "ops-" in name else "tooling" if "client" in name else "core"
        packages.append({"name": name, "description": project.get("description", "See package documentation."), "sourcePath": str(Path(path).parent).replace("\\", "/"), "group": group, "sourceVersion": project.get("version"), "sourcePython": project.get("requires-python"), "extras": sorted(project.get("optional-dependencies", {}))})
    target = Path(__file__).resolve().parents[1] / "src/content/source-snapshot.json"
    previous = json.loads(target.read_text(encoding="utf-8")) if target.exists() else {}
    publications = {p["name"]: p["publication"] for p in previous.get("packages", [])}
    for package in packages:
        package["publication"] = publications.get(package["name"], {"name": package["name"], "version": None, "python": None, "releases": []})
    repositories = []
    for directory in sorted(args.organization_root.iterdir()):
        name = directory.name
        if not directory.is_dir() or not re.search(r"demo|realtime|^websocket|^wt-agentbus$|^moqt-|^bmvp-authnz$|^portable_oidc_idp$|^tba-test-interop-wimse$", name):
            continue
        if not (directory / ".git").exists():
            continue
        remote = subprocess.check_output(["git", "-C", str(directory), "remote", "get-url", "origin"], text=True).strip()
        remote = remote.removesuffix(".git").replace("git@github.com:", "https://github.com/")
        hosts = set()
        for path in tracked(directory, ".wyrmctl/*"):
            if path.endswith((".yaml", ".yml")):
                hosts.update(re.findall(r"[a-z0-9][a-z0-9.-]*\.(?:tigrbl\.dev|bz23\.xyz)", (directory / path).read_text(encoding="utf-8")))
        repositories.append({"name": name, "repositoryUrl": remote, "sourceRef": subprocess.check_output(["git", "-C", str(directory), "rev-parse", "HEAD"], text=True).strip(), "hosts": sorted(hosts)})
    output = {"verifiedAt": previous.get("verifiedAt"), "sourceObservedAt": datetime.now(timezone.utc).isoformat(), "frameworkRef": subprocess.check_output(["git", "-C", str(repo), "rev-parse", "HEAD"], text=True).strip(), "packages": sorted(packages, key=lambda p: p["name"]), "repositories": repositories}
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
    print(f"Refreshed {len(packages)} packages and {len(repositories)} demo repositories: {target}")
    if not args.skip_publications:
        subprocess.run(["node", str(Path(__file__).with_name("refresh-publications.mjs"))], check=True)


if __name__ == "__main__":
    main()
