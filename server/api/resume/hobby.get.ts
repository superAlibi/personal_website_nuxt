
// 技术,文娱,健康
const hobbys: Array<{
  text: string;
  description: string | Array<string>;
}> = [
    {
      text: "追求新兴事物",
      description: [
        "吃饭的本事,社交的新话题都需要自己保持对时下最新消息的掌握情况.保持自我更新,掌握未来",
        "webgpu:目前大部分的it行业其实是在构建信息系统,但实际上下一步应该就是构建可是花了,这是个非常有意思的的邻域,至少比目前增删改查看表格要强:)",
        "webrtc:就是向做一个属于自己的视频通话和聊天服务器,毕竟时代不同了...圣上的心态和接受度都不高,不能接受逆耳忠言,且小肚鸡肠",
      ],
    },
    {
      text: "linux",
      description:
        "我想做信息技术的,没有人不喜欢linux吧,Windows奇怪的行为以及其背后隐藏的逻辑我已经受够了,相比linux可以更自由,虽然人菜,还爱玩,但是其运行速度我真的太爱了",
    },
    {
      text: "纯音乐",
      description:
        "母语音乐在现在这个社会风气下已经没有什么超越的作品了,大部分语焉不详,要么脱离不了情情爱爱.毫无营养,甚至有些莫名其妙,至少纯音乐可以让我自由的想象,甚至可以让自己的更加认真",
    },
    {
      text: "电影",
      description: "硬核电影:疯狂麦克斯,现在电影已经很少有机会看了",
    },
    {
      text: "阅读",
      description: "阅读是人类进步的阶梯",
    },
  ];

export default defineEventHandler((event) => {
  return hobbys
})