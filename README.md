# Nuxt 3 Minimal Starter

Look at the
[Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to
learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the
[deployment documentation](https://nuxt.com/docs/getting-started/deployment) for
more information.

# Fresh project

徐家铭的个人博客,以及一些对接第三方的练习

## Usage

跑起来

```shell
deno task start
```

## envariables

- location: 当前服务器运行的网址
- DBID: 本地连接远程denokv数据库的数据id
- PGHOST postgresql数据库地址
- PGORT postgresql数据库端口
- PGUSER postgresql数据库用户名
- PGPASSWORD postgresql数据库用户密码
- PGDATABASE postgresql数据库名
- AUTHING_SECRET_KEY authing密钥
- AUTHING_APP_ID authing应用id
- ADMIN_AUTHING_DOMAIN /admin路由认证路径
