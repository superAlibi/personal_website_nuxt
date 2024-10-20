<script setup lang="ts">


import { GetCreditList, type DriveMeta, type MessageItem, type CredentialMeta } from "~/database/resume";
import STDTable from "~/components/stdtable.vue";
import type { TableColumn } from "~/components/stdtable.props";
interface MessageInfo {
  message: MessageItem["message"];
  email: MessageItem["email"];
  nickName: MessageItem["nickName"];
  subject: MessageItem["subject"];
  corporateName: CredentialMeta["corporateName"];
  driveId: DriveMeta["driveId"];
}
const columns: TableColumn<MessageInfo>[] = [
  {
    title: "授权主体",
    header: "授权主体",
    dataIndex: "corporateName",
  },
  {
    title: "留言昵称",
    header: "留言昵称",
    dataIndex: "nickName",
  },
  {
    title: "主题",
    header: "主题",
    dataIndex: "subject",
  },
  {
    title: "联系邮箱",
    header: "联系邮箱",
    dataIndex: "email",
  },
  {
    title: "留言",
    header: "留言",
    dataIndex: "message",
  },
]
const { data } = useFetch<MessageInfo[]>('/api/admin/message')
</script>
<template>
  <STDTable :tableList="data ?? []" :columns="columns">
  </STDTable>

</template>