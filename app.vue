<script setup lang="ts">
const appConfig = useAppConfig()
console.log(appConfig)

useDark()
</script>

<template>

  <Head>
    <Title>{{ appConfig.title }}</Title>
  </Head>

  <Body class="bg-white dark:bg-[#2f2f2f] dark:text-white h-screen">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
