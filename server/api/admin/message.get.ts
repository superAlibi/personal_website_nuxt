import { CredentialMeta, DriveMeta, GetCreditList, MessageItem } from "~/database/resume";
export interface MessageInfo {
  message: MessageItem["message"];
  email: MessageItem["email"];
  nickName: MessageItem["nickName"];
  subject: MessageItem["subject"];
  corporateName: CredentialMeta["corporateName"];
  driveId: DriveMeta["driveId"];
}
export default defineEventHandler(async (event) => {

  const result = await GetCreditList();
  const infos = result.filter((i) => {
    const { drives } = i;
    if (!drives.length) return false;
    return drives.some((i) => i.messages?.length);
  });

  const tableData = infos.reduce<Partial<MessageInfo>[]>((pre, curr) => {
    const { drives, corporateName } = curr;
    const hasMessages = drives.filter((i) => i.messages?.length);
    const formatedMessages = hasMessages.reduce<Partial<MessageInfo>[]>(
      (pre, item) => {
        const { messages, driveId } = item;
        const formatedMessages = messages!.map<Partial<MessageInfo>>((j) => {
          return {
            message: j.message,
            email: j.email,
            nickName: j.nickName,
            subject: j.subject,
            corporateName,
            driveId,
          };
        });
        return pre.concat(formatedMessages);
      },
      [] as Partial<MessageInfo>[],
    );
    return pre.concat(formatedMessages);
  }, []);

  const di = getQuery(event).di

  return di ? tableData.filter((i) => i.driveId === di) : tableData
})