import {App, Component} from "vue"

// *************************************************************************************************** Components ******
const StCommonUiVue3Components: Record<string, Component> = {} // 组件库中的所有组件

// ---------------------------------------------------------------------------------------------------- 登录页面组件 ------
import _StLoginPage1 from "./components/StLoginPage1"
import {StLoginPage1Register as _StLoginPage1Register} from './components/StLoginPage1'

StCommonUiVue3Components.StLoginPage1 = _StLoginPage1
export const StLoginPage1 = _StLoginPage1
export const StLoginPage1Register = _StLoginPage1Register
// ---------------------------------------------------------------------------------------------------- 登录页面组件 ------

// ------------------------------------------------------------------------------------------------------- 图标组件 ------
import _StIconIconify from "./components/StIconIconify"
import {StIconIconifyRegister as _StIconIconifyRegister} from "./components/StIconIconify"

StCommonUiVue3Components.StIconIconify = _StIconIconify
export const StIconIconify = _StIconIconify
export const StIconIconifyRegister = _StIconIconifyRegister
// ------------------------------------------------------------------------------------------------------- 图标组件 ------

// ----------------------------------------------------------------------------------------------- 响应式折叠容器组件 ------
import _StReactCollapse from "./components/StReactCollapse"
import {StReactCollapseRegister as _StReactCollapseRegister} from "./components/StReactCollapse"

StCommonUiVue3Components.StReactCollapse = _StReactCollapse
export const StReactCollapse = _StReactCollapse
export const StReactCollapseRegister = _StReactCollapseRegister
// ----------------------------------------------------------------------------------------------- 响应式折叠容器组件 ------

// -------------------------------------------------------------------------------------------------- 气泡弹出框组件 ------
import _StPopover from "./components/StPopover"
import {StPopoverRegister as _StPopoverRegister} from "./components/StPopover"
import * as StPopoverSubContPos from './components/StPopover/st-popover-sub-cont-pos.ts'

StCommonUiVue3Components.StPopover = _StPopover
export const StPopover = _StPopover
export const StPopoverRegister = _StPopoverRegister
export const StPopoverSubContPosEnum = StPopoverSubContPos.StPopoverSubContPosEnum
export const StPopoverSubContPosConst = StPopoverSubContPos.StPopoverSubContPosConst
// -------------------------------------------------------------------------------------------------- 气泡弹出框组件 ------

// --------------------------------------------------------------------------------------------- 可调整宽高的容器组件 ------
import _StAdjustableContainer from "./components/StAdjustableContainer"
import {StAdjustableContainerRegister as _StAdjustableContainerRegister} from "./components/StAdjustableContainer"

StCommonUiVue3Components.StAdjustableContainer = _StAdjustableContainer
export const StAdjustableContainer = _StAdjustableContainer
export const StAdjustableContainerRegister = _StAdjustableContainerRegister
// --------------------------------------------------------------------------------------------- 可调整宽高的容器组件 ------

/**
 * 全局注册小尾巴通用 UI Vue3 组件库中的所有组件
 *
 * @param {App} app Vue 应用实例
 * @returns {App} 全局注册小尾巴通用 UI Vue3 组件库中的所有组件后的 Vue 应用实例
 */
export const StCommonUiVue3 = (app: App): App => {
  for (let componentName in StCommonUiVue3Components) {
    app.component(componentName, StCommonUiVue3Components[componentName])
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

// ******************************************************************************************************* Plugin ******
// ----------------------------------------------------------------------------------------------------- Resolver ------
import {StCommonUIVue3Resolver as _StCommonUIVue3Resolver} from "./plugins/resolver/index.ts"

export const StCommonUIVue3Resolver = _StCommonUIVue3Resolver
// ----------------------------------------------------------------------------------------------------- Resolver ------
// ******************************************************************************************************* Plugin ******
