<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})
const { data } = useFetch('/api/admin/creditlist')

</script>
<template>
  <div>
    <div>简历分享总计: {{ data as number }}次</div>
  </div>
</template>