<script setup lang="ts">
import type { FormSubmitEvent, SelectItem } from "@nuxt/ui";
import { z } from "zod";

const toast = useToast()
const schema = z.object({
  corporateName: z.string().min(1, { message: "公司名称不能为空" }),
  duration: z.number().min(1, { message: "有效期不能为空" }),
  durationUnit: z.enum(["seconds", "minutes", "hours", "days", "weeks", "months", "years"]),
})

type Schema = z.output<typeof schema>
const state = reactive<Partial<Schema>>({
  corporateName: "",
  duration: 14,
  durationUnit: "days",
})
const submit = async (e: FormSubmitEvent<Schema>) => {
  toast.add({ title: '保存中', description: '请稍等...', color: 'warning' })
  console.log(e.data);

  await $fetch("/api/resume/edit", {
    method: "POST",
    body: e.data,
  }).then(() => {
    toast.add({ title: '保存成功', description: '连接已生成.', color: 'success' })
  })
}
const durationUnits: SelectItem[] = [
  { label: '秒', value: 'seconds' },
  { label: '分钟', value: 'minutes' },
  { label: '小时', value: 'hours' },
  { label: '天', value: 'days' },
  { label: '周', value: 'weeks' },
  { label: '月', value: 'months' },
  { label: '年', value: 'years' },
]
</script>
<template>
  <NuxtLayout name="admin">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="submit">
      <UFormField label="公司名称" name="corporateName">
        <UInput v-model="state.corporateName" />
      </UFormField>
      <UFormField label="有效期" name="duration">
        <UInput v-model="state.duration" type="number" />
      </UFormField>
      <UFormField label="有效期单位" name="durationUnit">
        <USelect clearable value-key="value" v-model="state.durationUnit" :items="durationUnits" />
      </UFormField>
      <UButton type="submit">
        生成链接
      </UButton>
    </UForm>

  </NuxtLayout>
</template>