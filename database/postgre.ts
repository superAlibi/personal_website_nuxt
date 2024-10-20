import { Pool } from "pg";
let pgpool: Pool;
export function getPool() {
  if (pgpool) return pgpool;

  return pgpool = new Pool({
    max: 10
  });
}
globalThis.addEventListener("unload", () => pgpool.end());
