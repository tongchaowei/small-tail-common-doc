import {StTimelineDataItem} from 'st-common-ui-vue3'
import bg1 from "./bgs/bg-1.ts"
import bg2 from "./bgs/bg-2.ts"

export const homeData: StTimelineDataItem[] = [
  {
    title: 'Small Tail Common UI Vue3',
    desc: '小尾巴前端通用 Vue3 UI 组件库',
    btnText: '开始使用',
    url: '/small-tail-common-doc/ui-vue3/start/',
    bgImgSrc: bg1,
  },
  {
    title: 'Small Tail Common Core',
    desc: '小尾巴前端通用核心库，在该库中，对 JavaScript 基础类型、函数、数组等进行了封装，并提供了一些常用的工具函数。',
    bgImgSrc: bg2,
  }
]
