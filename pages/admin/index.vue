<script setup lang="ts">

import { type CredentialMeta, GetCreditList } from "~/database/resume";

definePageMeta({
  layout: 'admin'
})
const { data } = useFetch<CredentialMeta[] | number>('/api/admin/creditlist')

</script>
<template>
  <div>
    <div>简历分享总计: {{ data as number }}次</div>
  </div>
</template>