<template>
  <div class="p-8">
    <img src="https://tool.lu/netcard/" />
    <ul>
      <li>
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/set">
          URLSearchParams
        </a>
        的set方法,其第二个参数值会默认使用
        <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent">
          <code>encodeURIComponent</code>
        </a>
        编码,因此,当传入
        <code>void 0</code>
        时可以将值转换成字符串"undefined",传入null时,值将变成字符串'null''
      </li>
      <li>
        可喜可贺,wsl支持镜像网络了,可以提供主机所在的lan访问主机内部的wsl网络
      </li>
      <li>
        authing云踩坑：authing云在使用sdk时，如果传入重定向地址错误，接口会直接400错误
      </li>
      <li>
        mediaSteamTrack的三个方法：
        applayConstraints,getConstraints,getSettings以及getCapabilities
        分别用于设置约束，获取设置的约束，获取实际上使用的约束以及获取当前轨道支持的约束
        。
        这四个方法初看非常让人迷惑，原因在于约束的灵活性：模糊性，非强制的，当然如果约束太严格了，也可能获得不了相应的媒体流轨道
        <br />
        因此，传入的约束可以不按照约束的内容设置媒体轨道，所以就算是applayConstraints方法设置约束成功，但是getSettings方法获取到的约束值可能和传入的约束值不同
        <br />
        按照api设计来逻辑理解，一般使用逻辑：使用getCapabilities方法获取当前轨道支持的约束，然后根据需要设置约束，最后使用applayConstraints方法设置约束。
      </li>
      <li>
        本来要将我的网站使用flowbite个性化的,结果发现这个flowbite不仅将前端技术栈停留在webpack的世界,仓库源码也仅仅停留在node16的时代,其思路并未按照esm的模块管理,且内在逻辑涉及大量的cjs的逻辑

        <br />
        且其官方王网站教程中,也涉及到其组件js对象,使用其js对象操作组件,与现代响应式的流行框架相互背离
        <br />
      </li>
      <li>
        为什么设计网页的时候,手机为第一优先级,因为你分享链接的时候,大概率是通过社交账号分享的,社交账号大部分在手机端,所以.....
      </li>
      <li>
        2024年新增了
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover">
          popover
        </a>
        功能，可以通过按钮控制一个元素的是否显示，按照这个属性的意思，应该就是用来模拟弹出框的，但是模拟弹出框分为两种，一种是弹窗框显示时不允许操作弹窗以外的操作,此时应该使用dailog，当然你使用popover也是可以的
        <br />
        第二种是，弹窗框显示是，允许其他页面内操作。
      </li>
    </ul>
  </div>
</template>