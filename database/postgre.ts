import PG from "pg";
let pgpool: PG.Pool;
export function getPool() {
  if (pgpool) return pgpool;

  return pgpool = new PG.Pool({
    max: 10
  });
}
