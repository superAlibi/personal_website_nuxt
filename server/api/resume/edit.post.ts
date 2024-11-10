import dayjs from "dayjs";


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



  /*  await addCredential({
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
    createAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    ...form
  }

  params.interval = [dayjs().format('YYYY-MM-DD HH:mm:ss'), dayjs().add(params.duration ?? 14, params.durationUnit ?? 'days').format('YYYY-MM-DD HH:mm:ss')]

  if (!params.auScope) {
    params.auScope = "profile openid email phone"
  }


  const client = usePostgres()

  const dateRange = client`tsrange(${params.interval.at(0)},${params.interval.at(1)},'[)')`


  await client`insert into public.credentials 
  (id,com_name,interval,au_scope) 
  values
   (${params.id},${params.corporateName},
   ${dateRange},${params.auScope.split(' ')});`

  await client.end()



})