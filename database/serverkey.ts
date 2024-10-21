import { randomBytes } from 'node:crypto'
const BaseName = "server-secret-key";

import { pgClient as client } from './postgre'
// const envSecretKey = "server-secret-key";
export async function getServerSecretKey() {
  const { rows } = await client.query<{ const_value: string }>('select const_value  from constants where const_key=$1', [BaseName])
  let value = rows[0]?.const_value
  if (!value) {

    // 生成 32 字节（256 位）的随机密钥
    const buf = randomBytes(16);

    // 将随机密钥转换为十六进制字符串
    value = buf.toString('base64');

    // 将新生成的密钥存储到数据库
    await client.query('INSERT INTO constants (const_key, const_value) VALUES ($1, $2)', [BaseName, value]);

  }


  return value
}
