import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync(new URL("../site.manifest.json", import.meta.url), "utf8"));
const command = `docker compose -f docker-compose.yaml up -d --build --force-recreate --no-deps ${manifest.dockerService}`;
const routing = manifest.routing;

console.log(JSON.stringify({
  host: manifest.host,
  service: manifest.dockerService,
  command,
  routing,
}, null, 2));
