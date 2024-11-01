---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
#
hero:
  name: "Small Tail Common"
  text: "小尾巴前端通用库"
  actions:
    - theme: brand
      text: 开始使用 Small Tail Common UI Vue3
      link: /ui-vue3/start

features:
  - title: Small Tail Common UI Vue3
    details: 小尾巴前端通用 Vue3 UI 组件库
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
]
</script>

<VPTeamMembers size="small" :members="members" />
