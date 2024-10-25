<script setup lang="ts">

import { type CredentialMeta, GetCreditList } from "~/database/resume";

definePageMeta({
  layout: 'admin'
})
const { data } = useFetch<CredentialMeta[]>('/api/admin/creditlist', {
  query: {
    pageNo: 1,
    pageSize: 999,
  }
})

</script>
<template>
  <div>
    <div>简历分享总计: {{ data?.length }}次</div>
  </div>
</template>