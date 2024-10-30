import {App, Component} from "vue"
import {componentWithInstall} from "./utils/component-with-install"

// *************************************************************************************************** Components ******
const stCommonUiVue3Components: Record<string, Component> = {} // 组件库中的所有组件

// ---------------------------------------------------------------------------------------------------- 登录页面组件 ------
import _StLoginPage1 from "./components/st-login-page/st-login-page-1.vue"

stCommonUiVue3Components.StLoginPage1 = _StLoginPage1
export const StLoginPage1 = componentWithInstall(_StLoginPage1)
// ---------------------------------------------------------------------------------------------------- 登录页面组件 ------

// ------------------------------------------------------------------------------------------------------- 图标组件 ------
import _StIconIconify from "./components/st-icon/st-icon-iconify.vue"

stCommonUiVue3Components.StIconIconify = _StIconIconify
export const StIconIconify = componentWithInstall(_StIconIconify)
// ------------------------------------------------------------------------------------------------------- 图标组件 ------

// ----------------------------------------------------------------------------------------------- 响应式折叠容器组件 ------
import _StReactCollapse from "./components/st-react-collapse/st-react-collapse.vue"

stCommonUiVue3Components.StReactCollapse = _StReactCollapse
export const StReactCollapse = componentWithInstall(_StReactCollapse)
// ----------------------------------------------------------------------------------------------- 响应式折叠容器组件 ------

// -------------------------------------------------------------------------------------------------- 气泡弹出框组件 ------
import _StPopover from "./components/st-popover/st-popover.vue"
import * as StPopoverSubContPos from './components/st-popover/st-popover-sub-cont-pos.ts'

stCommonUiVue3Components.StPopover = _StPopover
export const StPopover = componentWithInstall(_StPopover)
export const StPopoverSubContPosEnum = StPopoverSubContPos.StPopoverSubContPosEnum
export const StPopoverSubContPosConst = StPopoverSubContPos.StPopoverSubContPosConst
// -------------------------------------------------------------------------------------------------- 气泡弹出框组件 ------

/**
 * 全局注册小尾巴通用 UI Vue3 组件库中的所有组件
 *
 * @param {App} app Vue 应用实例
 * @returns {App} 全局注册小尾巴通用 UI Vue3 组件库中的所有组件后的 Vue 应用实例
 */
export const StCommonUiVue3 = (app: App): App => {
  for (let componentName in stCommonUiVue3Components) {
    app.component(componentName, stCommonUiVue3Components[componentName])
  }
  return app
}
// *************************************************************************************************** Components ******


// ********************************************************************************************************* Hook ******
import _useElementContactPrevious from "./hooks/use-element-contact-previous"
import _useElementParentChildrenWidth from "./hooks/use-element-parent-children-width"

export const useElementContactPrevious = _useElementContactPrevious
export const useElementParentChildrenWidth = _useElementParentChildrenWidth
// ********************************************************************************************************* Hook ******
