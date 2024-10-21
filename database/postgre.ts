import { Pool, Connection } from "postgrejs";
const pgpool = new Pool();
export const pgClient = new Connection();
