<script setup lang="ts">

import Button from "~/components/Button.vue";
import Input from "~/components/input.vue";
const corporateName = ref<string>("");

const submit = async () => {
  const { data } = await useAsyncData("resume", () => $fetch("/api/resume/edit", {
    method: "POST",
    body: {
      corporateName: unref(corporateName),
    },
  }))
}
</script>
<template>
  <form @submit.prevent="submit" class=" p-6 gap-4 grid xl:grid-cols-1">
    <Input v-model="corporateName" name="corporateName" type="text" label="公司名称" required placeholder="公司名称" />
    <Button className=" peer-invalid:disabled w-full" formmethod="post">
      生成链接
    </Button>
  </form>
</template>