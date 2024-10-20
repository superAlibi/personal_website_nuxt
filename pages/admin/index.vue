<script setup lang="ts">

import { type CredentialMeta, GetCreditList } from "~/database/resume";


const credits = ref<CredentialMeta[]>([])
GetCreditList().then(data => {
  credits.value = data
})
</script>
<template>
  <div>
    <div>简历分享总计: {{ credits.length }}次</div>
  </div>
</template>