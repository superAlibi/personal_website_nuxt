<script setup lang="ts">
import dayjs from "dayjs";
import ResumeTimeLine from "~/components/resumetimeline.vue";
const { meta } = useRoute();
const createAt = dayjs(meta.createAt as string);
const current = dayjs();
const diffInfo = current.diff(createAt, "second");
</script>
<template>
  <div class="py-1 px-12 mx-auto max-w-6xl  xl:w-3/5 md:w-4/5 text-black dark:text-[#ddd] xs:px-4">
    <p class="flex gap-8 justify-end xs:justify-center xs:mt-8 xs:mb-3 mt-16 ">
      <a class="hover:bg-opacity-0 rounded-full" href="https://github.com/superAlibi" title="github">
        <img src="/github.svg" alt="github icon"
          class="size-6 dark:invert dark:grayscale dark:brightness-150 dark:hover:invert-0" srcset="" />
      </a>
      <a class="rounded-full overflow-hidden" href="https://blog.csdn.net/n_s_X14" title="csdn">
        <img src="https://g.csdnimg.cn/static/logo/favicon32.ico" alt="csdn icon" class="size-6 dark:hover:invert"
          srcset="" />
      </a>
      <a class="rounded-full overflow-hidden " href="https://gitee.com/alibi-jia" title="gitee">
        <img src="https://gitee.com/assets/favicon.ico" alt="gitee url" class="size-6 hover:invert" srcset="" />
      </a>
    </p>
    <div class="text-center font-bold xs:mt-8 mt-20">
      <h4 class="xs:my-6 my-12 text-4xl xs:text-2xl">
        你好,我叫
      </h4>
      <h1 class="xs:text-5xl xl:text-9xl md:text-7xl delay-300  mt-12 mb-8 ">
        <span class="ease-in transition-all hover:tracking-widest">
          {{ meta.name }}
        </span>
      </h1>
      <h4 class="text-2xl xs:text-xl">一名前端开发工程师</h4>
    </div>

    <div class="text-center xs:mt-8 mt-20   text-xl md:text-2xl xl:text-3xl xl:leading-loose tracking-widest ">
      <p>
        一个喜欢没事就研究新兴技术的coder,到目前为止,大部分工作为编写管理后台,
        偶尔也会写点前端小玩意儿,比如
        <a class="inline-block bg-slate-300 dark:bg-zinc-900 px-2 leading-tight rounded-md mx-2 hover:cursor-zoom-in hover:underline decoration-orange-400 "
          href="https://jsr.io/@advanced/fetcher">
          <code>@advanced/fetcher</code>
        </a>
        <a class="inline-block  bg-slate-300 dark:bg-zinc-900 px-2 leading-tight rounded-md mx-2 hover:cursor-zoom-in hover:underline decoration-orange-400"
          href="https://jsr.io/@advanced/crypto">
          <code>@advanced/crypto</code>
        </a>
      </p>
      <p class="my-6">
        除此以外,还喜欢搞linux或者docker,推崇devops,有它会让我的工作更轻松又从容.
      </p>
    </div>
    <h4 class="text-center mt-40 mb-20 font-bold text-2xl">工作经历</h4>
    <div class="px-4">
      <ResumeTimeLine />
    </div>
    <div class="text-center xs:mt-8 mt-20  xl:text-3xl xs:text-xl leading-loose tracking-widest">
      <p>
        未来,如若有机会从事web3d方向,会优先考虑.如果3d方向发现不适合,就做web全栈吧~
      </p>

      <div class="my-20">

        <p class="text-xs text-green-400 dark:text-zinc-600 mt-4 ">
          链接剩余有效时间(小时):{{ (((meta.duration as number) - diffInfo) / 60 / 60).toFixed(2,) }}
        </p>
      </div>
    </div>
  </div>
</template>