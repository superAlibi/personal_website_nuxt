
/**
 * 框架系统级别
 */
const frameworkLevel = [
  // 脚手架/框架
  {
    text: "vite",
    level: 4,
  },
  {
    text: "vue2-3",
  },
  {
    text: "pinia",
  },
  {
    text: "vue-router",
  },
  {
    text: "element-plus",
  },

  {
    text: "echarts",
  },

  {
    text: "less",
  },
  {
    text: "tailwindcss",
  },
  {
    text: "react/preact",
  },

  {
    text: "ant design",
  },

  {
    text: "pro-components",
  },

  {
    text: "fresh(denojs)",
  },
];
// 掌握的基础技能栈级别
export const SkillSProficiencyLevel = [
  // 系统
  {
    text: "linux",
    level: 2,
  },
  {
    text: "docker",
    level: 2,
  },
  // 基本语言
  {
    text: "typescript",
    level: 5,
  },
  {
    text: "javascript/ES6+",
    level: 5,
  },
  {
    text: "html",
    level: 5,
  },
  {
    text: "css",
    level: 5,
  },
  {
    text: "git",
    level: 5,
  },
  {
    text: "denojs",
    level: 5,
  },
  {
    text: "java",
    level: 3,
  },
  {
    text: "golang",
    level: 3,
  },
  {
    text: "python",
    level: 3,
  },
];
const skillLib = [
  {
    text: "loash",
  },
  {
    text: "radash",
  },
  {
    text: "crypto-js",
  },
  {
    text: "axios",
  },
  {
    text: "dayjs",
  },
  {
    text: "jsencrypt",
  },
  {
    text: "umijs4",
  },
  {
    text: "react-router",
  },
  {
    text: "qrcanvas",
  },
  {
    text: "wangeditor",
  },
];

export default defineEventHandler(() => {
  return {
    baseSkill: SkillSProficiencyLevel,
    frameworkLevel,
    skillLib,
  }
})