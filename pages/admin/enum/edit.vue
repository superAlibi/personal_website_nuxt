<script setup lang="ts">
import Input from "~/components/input.vue";
import Textarea from "~/components/textarea.vue";
import Enums from "~/components/enums.vue";
import Button from "~/components/Button.vue";

definePageMeta({
  layout: 'admin'
})
const enums = reactive([]);
const saveinfo = reactive({
  category: '',
  subject: '',
  metaDescription: '',
  metaSortNo: 0,
  dicts: [],
})
async function handlerSubmit() {

  await $fetch("/api/dict", {
    method: "POST",
    body: saveinfo,
  })
}

</script>
<template>
  <form @submit.prevent="handlerSubmit">
    <Input required name="category" v-model="saveinfo.category" placeholder="字典编码,将自动继承上级编码" label="字典编码" />
    <Input required name="subject" v-model="saveinfo.subject" placeholder="简单阐述字典作用" label="主题" />
    <Textarea required placeholder="请输入字典的备注/描述信息" name="metadescription" label="描述" />
    <fieldset name="dicts">
      <legend>字典枚举值</legend>
      <Enums v-model="saveinfo.dicts" />
    </fieldset>
    <Button>完成</Button>
  </form>
</template>