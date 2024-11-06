import { randomBytes } from 'node:crypto'
const BaseName = "server-secret-key";
type Constants = { const_value: string }

// const envSecretKey = "server-secret-key";
export async function getServerSecretKey() {
  const client = usePostgres()
  const rows = await client<Constants[]>`select const_value  from constants where const_key=${BaseName}`;
  let value = rows.at(0)?.const_value
  if (!value) {

    // 生成 32 字节（256 位）的随机密钥
    const buf = randomBytes(16);

    // 将随机密钥转换为十六进制字符串
    value = buf.toString('base64');

    // 将新生成的密钥存储到数据库
    await client`INSERT INTO constants (const_key, const_value) VALUES (${BaseName}, ${value})`;

  }
  await client.end()

  return value
}
