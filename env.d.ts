declare module 'nuxt/schema' {
  interface RuntimeConfig {
    apiSecret: string
  }
  interface PublicRuntimeConfig {
    DENO_KV_ACCESS_TOKEN: string
    DBID: string
    AUTHING_APP_ID: string
    ADMIN_AUTHING_DOMAIN: string
    AUTHING_SECRET_KEY: string
    location: string
    AUTHING_LOGINOUT_POINT: string
    AUTHING_USERNAME: string
    AUTHING_PASSWORD: string
  }
}
// It is always important to ensure you import/export something when augmenting a type
export { }
