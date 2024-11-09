import postgres, { Options } from "postgres";
import process from "node:process";

export function usePostgres() {
  const env = process.env
  const options: Options<{}> = {
    host: env.PGHOST!,
    port: Number(env.PGPORT!),
    database: env.PGDATABASE!,
    user: env.PGUSER!,
    password: env.PGPASSWORD!,
  }
  return postgres(options)
}