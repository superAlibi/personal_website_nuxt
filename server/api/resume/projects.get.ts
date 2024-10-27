
export interface ProjectInfo {
  // 公司名字
  companyName?: string;
  // 公司logo
  companyLogo?: string;
  // 公司所属国家
  companyCountry?: string;
  // 公司地址
  companyAddress?: string;
  // 地图链接
  companyMapLink?: string;
  // 项目名称
  name: string;
  // 项目logo
  projectLogo?: string;
  // 项目描述
  description: string;
  // 项目性质
  projectNature?: string;
  // 项目标签
  projectTag?: string;
  // 最近更新
  updateTime?: string;
  // 开始于
  startWidth?: string;
  // 主题
  subject?: string;
  // 项目详细
  detailed: string | Array<string>;
  // 查看人对此的平均评分
  averageScore?: string;
}
const projects: ProjectInfo[] = [
  {
    name: "闲蛋电商",
    companyLogo: "/xdm.jpg",
    companyAddress: "青白江区天美广场",
    companyMapLink: "https://surl.amap.com/4kAvew184UD",

    companyName: "闲蛋猫",
    description: "一个公众号下的电商平台",

    projectTag: "电商",
    detailed: "分享理由:开始入坑前端",
    startWidth: "2020/08",
  },
  {
    name: "凯旋家具ERP",
    description: "家具厂物料资源维护管理项目",
    companyName: "成都中联信通科技",
    companyLogo: "/zlinpay.png",
    companyMapLink: "https://surl.amap.com/yyo3S8Y1s5Ah",
    companyAddress: "武侯区天府大道软件园E区",
    projectTag: "ERP",
    startWidth: "2020/12",
    detailed:
      "分享理由:第一个erp项目,完整认识一个erp项目需要具备哪些基本元素,从vue2-vue3的转变,项目共三个端:移动端,平板端,和管理端均由我建立并编写业务逻辑,该项目是我第一次接触到后台管理项目",
  },
  {
    companyName: "成都中联信通科技",
    companyLogo: "/zlinpay.png",
    companyMapLink: "https://surl.amap.com/yyo3S8Y1s5Ah",
    companyAddress: "武侯区天府大道软件园E区",
    name: "安捷易付",
    startWidth: "2022/10",
    description:
      "平台协助商户对接具有支付牌照的支付平台,帮助商户快速实现支付功能,附加账单查询清结算",
    projectTag: "支付结算",
    detailed: [
      `商户账单平台,该平台主营业务就是是对商户和代理商支付业务提供一条龙服务,分享理由:该平台是我在公司付出最多的时间成本的项目,也是我公司技术栈最完整的项目,由我负责技术栈选型,前端项目架构.
          公司的基础设施完善,领导认真负责,同事之间有点工作小摩擦,但大家都不计较,完了仍然有说有笑,相互帮助.
          在这个项目期间,我成长了很多,从vue2到vue3生态,从vue到react,得益于公司宽容的技术环境和领导不断鞭策,`,
      `离开这家公司是我最难的抉择,公司是我目前呆过技术和人文环境最好的公司`,
    ],
  },
  {
    name: "掌控者bi",
    startWidth: "2023/09",
    companyLogo: "https://www.goalgo.cn/favicon.ico",
    companyMapLink: "https://surl.amap.com/bMCMTRI1a70Q",
    companyAddress: "武侯区凯乐国际",
    description:
      "项目是出于对公司已有数据量巨大的情况下,出于数据分析目的而建立",
    projectTag: "BI",
    detailed: [
      `分享理由:这个项目是出于对公司已有数据量巨大的情况下,出于数据分析目的而建立.为什么原因分享他,
          其一:第一次使用纯阿里技术体系从0-1构建项目,包括其架构难点设计和技术栈选型
          其二:是因为从该公司我初次接触一个稍微大点的公司,环境如何,但是其并未给我留下好的印象.`,
      `公司的技术架构非常不错,人员安排上,有ui设计,有专业测试人员,有自动化部署,还有非常多的后端大佬,不乏搞golang的大佬
          做golang的大佬我是最倾佩的,原因在于其凭借其出色的golang技术,让老板同意他写的项目使用golang,但实际上公司主要用java....`,
      ` 但是因为模仿的华为的工作制度,非常让我感到不适,不只是我,很多同事也是深有体会.
          其次,因为其极个别领导身居要职,却总喜欢站在道德制高点批判同事的工作成果`,
    ],
  },
  {
    companyLogo: "/ziyuhua.jpeg",
    companyMapLink: "https://surl.amap.com/abg1Hf6118Bx",
    companyAddress: "双流区天府新经济产业园B区",
    name: "BIM轻量化协作平台",
    description: "基于threejs深度定制的协作平台,用于公司分享和沟通模型细节问题",
    startWidth: "2024/3",
    detailed: "项目的难度很大",
    projectTag: "web3d",
  },
];



export default defineEventHandler(() => projects)