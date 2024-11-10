<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})
const { data } = useFetch('/api/admin/creditlist')

</script>
<template>
  <NuxtLayout name="admin">
    <div>简历分享总计: {{ data as number }}次</div>
  </NuxtLayout>
</template>