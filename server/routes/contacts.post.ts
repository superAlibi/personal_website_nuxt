import dayjs from "dayjs";
import { navigateTo } from "nuxt/app";

export default defineEventHandler(async (event) => {

  const form = await readBody(event);
  const st = form.get("st") as string;
  const result = (await GetCredit(st)).at(0);
  if (!result) {
    console.warn("留言提交:含有st但没有找到对应的公司信息:" + st);
    return navigateTo('/')
  }
  const driveId = getCookie(event, 'di');
  if (!driveId) {
    console.warn(
      `留言提交:含有公司信息,但是无法拿到cookie的driveId:${result.corporateName}`,
    );

    return navigateTo('/')
  }
  const dindex = result.drives.findIndex((i) => i.driveId === driveId);
  if (dindex < 0) {
    console.warn(
      `留言提交:含有公司信息,但是无法找到设备信息:${driveId}`,
    );
    return new Response(null, { status: 302, headers: { "location": "/" } });
  }
  const driveInfo = result.drives.at(dindex)!;
  if (!Array.isArray(driveInfo.messages)) {
    driveInfo.messages = [];
  }
  driveInfo.messages.push({
    createAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    email: form.get("email") as string,
    message: form.get("message") as string,
    messageid: crypto.randomUUID(),
    nickName: form.get("nickName") as string,
    subject: form.get("subject") as string,
  });
  await UpdateCredential(result);

  //  TODO: 返回错误信息
  // return ctx.render({ msg: "留言失败:储存留言信息失败" });

})
