import postgres from "postgres";
/* const sql = postgres({
  host: 'localhost',
  database: 'personal_website',
  username: 'xjm',
  password: '598230',

});
export const pgClient = sql; */
export function usePostgres() {


  return postgres({
    host: 'localhost',
    database: 'personal_website',
    username: 'xjm',
    password: '598230',
    ssl: 'require'
  })
}