
export default defineEventHandler(async (event) => {
  const form = await readBody(event);
  const sdk = useAuthingClient();
  const result = sdk.buildAuthorizeUrl({
    redirectUri: "/resume",
    // todo:调整为表单选项
    scope: "profile openid email phone",
    // 应该新增:权限配置列表,以访问额外的自定义资源

    responseMode: "form_post",
    responseType: "code token",
  });

  /* await addCredential({
    id: result.state!,
    duration: 0,
    durationUnit: "seconds",
    drives: [],
    createAt: new Date().toISOString(),
    ...form
  }); */
  const params = {
    id: result.state!,
    duration: 0,
    durationUnit: "seconds",
    drives: [],
    createAt: new Date().toISOString(),
    ...form
  }
  const client = usePostgres()
  await client`insert into public.credentials (id,com_name,interval,au_scope) 
  values
   (${params.id},${params.corporateName},$${params.interval},${params.auScope})`
  // 这行代码是用来释放数据库连接的。
  // 在完成数据库操作后，释放连接是一个良好的实践，
  // 它可以将连接返回到连接池中，供其他操作使用，
  // 从而提高数据库连接的利用效率。
  await client.end()
  /* if (!ok) {
    throw createError({
      statusCode: 500,
      message: '服务器方添加失败'
    });
  } */


})