<script setup lang="ts">


import Hobby from "~/components/hobby.vue";
import { randomBadgeStyle } from "~/components/timeline.props";

const { data: hobbys } = useFetch('/api/resume/hobby', {
  transform: (data) => {
    return data.map((item) => {
      return {
        title: {
          children: item.text,
        },
        description: item.description,
        key: item.text,
      };
    })
  }
});
const { data: projects } = useFetch('/api/resume/projects')
const { data: skills, } = useFetch('/api/resume/skill-level');

const { meta } = useRoute()

useHead({
  title: '关于我-' + meta.name,
})

</script>
<template>
  <div class="xl:max-w-7xl mx-auto px-4">

    <div class="mt-8">
      <h4 class="text-center text-lg py-4 dark:text-white">基础技能</h4>
      <div class="text-wrap flex gap-4  flex-wrap justify-center max-w-5xl mx-auto">

        <span v-for="skill of skills?.baseSkill"
          :class="randomBadgeStyle.at(Math.floor(Math.random() * randomBadgeStyle.length))">
          {{ skill.text }}
        </span>

      </div>
    </div>
    <div class="mt-8">
      <h4 class="text-center text-lg py-4 dark:text-white">使用框架</h4>
      <div class="text-wrap flex gap-4   flex-wrap justify-center max-w-5xl mx-auto">

        <span v-for="skill of skills?.frameworkLevel"
          :class="randomBadgeStyle.at(Math.floor(Math.random() * randomBadgeStyle.length))">
          {{ skill.text }}
        </span>

      </div>
    </div>

    <div class="mt-8">
      <h4 class="text-center text-lg py-4">
        我想与你分享的项目
      </h4>
      <div v-for="i of (projects ?? []).reverse()" :key="i.name" v-bind="i"
        class="mt-10 max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-5xl p-6 mx-auto bg-white border  border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <ReviewContent :userAvatar="i.companyLogo" :userName="i.name" :subject="i.description" :description="i.detailed"
          :metas="[
            {
              icon: 'ep:orange',
              link: {
                href: i.companyMapLink,
                children: i.companyAddress ?? '',
              },
            },
            { icon: 'ep:timer', link: i.startWidth ?? '', },
            { icon: 'ep:aim', link: i.projectTag ?? '', },]" />
      </div>
    </div>

    <div class="mt-8">
      <h4 class="text-center text-lg py-4 dark:text-white">爱好</h4>

      <Hobby :items="hobbys ?? []">
      </Hobby>
    </div>
  </div>
</template>
