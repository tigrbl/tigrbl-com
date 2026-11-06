#!/usr/bin/env python3
"""Cut tigrbl.com over to Portwyrm while preserving unrelated DNS records."""

from __future__ import annotations

import os
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET


ZONE = "tigrbl.com"
TARGET_IP = "149.255.33.254"
VALID_TYPES = {"A", "AAAA", "CAA", "CNAME", "MX", "NS", "SRV", "TXT"}


def env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise SystemExit(f"missing required environment variable: {name}")
    return value


def params(command: str) -> dict[str, str]:
    return {
        "ApiUser": env("NAMECHEAP_API_USER"),
        "ApiKey": env("NAMECHEAP_API_KEY"),
        "UserName": env("NAMECHEAP_USERNAME"),
        "ClientIp": env("NAMECHEAP_CLIENT_IP"),
        "Command": command,
        "SLD": "tigrbl",
        "TLD": "com",
    }


def request(values: dict[str, str]) -> ET.Element:
    url = "https://api.namecheap.com/xml.response?" + urllib.parse.urlencode(values)
    with urllib.request.urlopen(url, timeout=30) as response:
        root = ET.fromstring(response.read())
    if root.attrib.get("Status") != "OK":
        errors = [node.text or "" for node in root.findall(".//{*}Error")]
        raise SystemExit("; ".join(errors) or "Namecheap API request failed")
    return root


def main() -> int:
    root = request(params("namecheap.domains.dns.getHosts"))
    records: dict[tuple[str, str], dict[str, str]] = {}
    for host in root.findall(".//{*}host"):
        record_type = (host.attrib.get("Type") or "").upper()
        if record_type not in VALID_TYPES:
            continue
        row = {
            "Name": host.attrib.get("Name", ""),
            "Type": record_type,
            "Address": host.attrib.get("Address", ""),
            "TTL": host.attrib.get("TTL", "300"),
            "MXPref": host.attrib.get("MXPref", "10"),
        }
        records[(row["Name"], row["Type"])] = row

    for name in ("@", "*"):
        records.pop((name, "CNAME"), None)
        records[(name, "A")] = {
            "Name": name,
            "Type": "A",
            "Address": TARGET_IP,
            "TTL": "300",
            "MXPref": "10",
        }
    for key in [key for key in records if key[0] == "www"]:
        records.pop(key)
    records[("www", "CNAME")] = {
        "Name": "www",
        "Type": "CNAME",
        "Address": ZONE,
        "TTL": "300",
        "MXPref": "10",
    }

    update = params("namecheap.domains.dns.setHosts")
    ordered = sorted(records.values(), key=lambda row: (row["Name"], row["Type"], row["Address"]))
    for index, row in enumerate(ordered, start=1):
        update[f"HostName{index}"] = row["Name"]
        update[f"RecordType{index}"] = row["Type"]
        update[f"Address{index}"] = row["Address"]
        update[f"TTL{index}"] = row["TTL"]
        if row["Type"] == "MX":
            update[f"MXPref{index}"] = row["MXPref"]

    request(update)
    print(f"{ZONE}: preserved {len(ordered)} records and set apex/wildcard to {TARGET_IP}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
