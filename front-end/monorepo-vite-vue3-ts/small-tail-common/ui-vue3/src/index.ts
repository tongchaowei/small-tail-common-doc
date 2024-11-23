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

// ----------------------------------------------------------------------------------------------------- 时间线组件 ------
import _StTimeline1, {
  StTimeline1Register as _StTimeline1Register,
  StTimelineDataItem as _StTimelineDataItem
} from "./components/StTimeline1"

StCommonUiVue3Components.StTimeline1 = _StTimeline1
export const StTimeline1 = _StTimeline1
export const StTimeline1Register = _StTimeline1Register
export type StTimelineDataItem = _StTimelineDataItem
// ----------------------------------------------------------------------------------------------------- 时间线组件 ------

// ---------------------------------------------------------------------------------------------------- 渐变背景组件 ------
import _StGradientBg1 from './components/StGradientBg1'
import {StGradientBg1Register as _StGradientBg1Register} from './components/StGradientBg1'

StCommonUiVue3Components.StGradientBg1 = _StGradientBg1
export const StGradientBg1 = _StGradientBg1
export const StGradientBg1Register = _StGradientBg1Register

import _StGradientBg2 from './components/StGradientBg2'
import {StGradientBg2Register as _StGradientBg2Register} from './components/StGradientBg2'

StCommonUiVue3Components.StGradientBg2 = _StGradientBg2
export const StGradientBg2 = _StGradientBg2
export const StGradientBg2Register = _StGradientBg2Register
// ---------------------------------------------------------------------------------------------------- 渐变背景组件 ------

// ---------------------------------------------------------------------------------------------------- 信息卡片组件 ------
import _StInfoCard1 from './components/StInfoCard1'
import {StInfoCard1Register as _StInfoCard1Register} from './components/StInfoCard1'

StCommonUiVue3Components.StInfoCard1 = _StInfoCard1
export const StInfoCard1 = _StInfoCard1
export const StInfoCard1Register = _StInfoCard1Register

import _StInfoCard2 from './components/StInfoCard2'
import {StInfoCard2Register as _StInfoCard2Register} from './components/StInfoCard2'

StCommonUiVue3Components.StInfoCard2 = _StInfoCard2
export const StInfoCard2 = _StInfoCard2
export const StInfoCard2Register = _StInfoCard2Register
// ---------------------------------------------------------------------------------------------------- 信息卡片组件 ------

// ---------------------------------------------------------------------------------------------------- 动态边框组件 ------
import _StDynamicBorder1 from './components/StDynamicBorder1'
import {StDynamicBorder1Register as _StDynamicBorder1Register} from './components/StDynamicBorder1'

StCommonUiVue3Components.StDynamicBorder1 = _StDynamicBorder1
export const StDynamicBorder1 = _StDynamicBorder1
export const StDynamicBorder1Register = _StDynamicBorder1Register
// ---------------------------------------------------------------------------------------------------- 动态边框组件 ------

// ------------------------------------------------------------------------------------------------ 幽灵特效文本组件 ------
import _StGhostText from "./components/StGhostText"
import {StGhostTextRegister as _StGhostTextRegister} from "./components/StGhostText"

StCommonUiVue3Components.StGhostText = _StGhostText
export const StGhostText = _StGhostText
export const StGhostTextRegister = _StGhostTextRegister

import _StGhostTextHover from "./components/StGhostTextHover"
import {StGhostTextHoverRegister as _StGhostTextHoverRegister} from "./components/StGhostTextHover"

StCommonUiVue3Components.StGhostTextHover = _StGhostTextHover
export const StGhostTextHover = _StGhostTextHover
export const StGhostTextHoverRegister = _StGhostTextHoverRegister
// ------------------------------------------------------------------------------------------------ 幽灵特效文本组件 ------

// ---------------------------------------------------------------------------------------------------- 3D 容器组件 ------
import _St3DTiltContainer from "./components/St3DTiltContainer"
import {St3DTiltContainerRegister as _St3DTiltContainerRegister} from "./components/St3DTiltContainer"

StCommonUiVue3Components.St3DTiltContainer = _St3DTiltContainer
export const St3DTiltContainer = _St3DTiltContainer
export const St3DTiltContainerRegister = _St3DTiltContainerRegister
// ---------------------------------------------------------------------------------------------------- 3D 容器组件 ------

// ----------------------------------------------------------------------------------------------------- 轮播图组件 ------
import _StSwiper from "./components/StSwiper"
import {StSwiperRegister as _StSwiperRegister} from "./components/StSwiper"

StCommonUiVue3Components.StSwiper = _StSwiper
export const StSwiper = _StSwiper
export const StSwiperRegister = _StSwiperRegister

import _StSwiperSlide from "./components/StSwiperSlide"
import {StSwiperSlideRegister as _StSwiperSlideRegister} from "./components/StSwiperSlide"

StCommonUiVue3Components.StSwiperSlide = _StSwiperSlide
export const StSwiperSlide = _StSwiperSlide
export const StSwiperSlideRegister = _StSwiperSlideRegister
// ----------------------------------------------------------------------------------------------------- 轮播图组件 ------

// ------------------------------------------------------------------------------------ 捕获组件内 pointer 事件的组件 ------
import _StCapturePointerContainer from './components/StCapturePointerContainer'
import {StCapturePointerContainerRegister as _StCapturePointerContainerRegister} from './components/StCapturePointerContainer'

StCommonUiVue3Components.StCapturePointerContainer = _StCapturePointerContainer
export const StCapturePointerContainer = _StCapturePointerContainer
export const StCapturePointerContainerRegister = _StCapturePointerContainerRegister
// ------------------------------------------------------------------------------------ 捕获组件内 pointer 事件的组件 ------

// --------------------------------------------------------------------------------------------- 点击波浪效果容器组件 ------
import _StClickWaveContainer from "./components/StClickWaveContainer"
import {StClickWaveContainerRegister as _StClickWaveContainerRegister} from "./components/StClickWaveContainer"

StCommonUiVue3Components.StClickWaveContainer = _StClickWaveContainer
export const StClickWaveContainer = _StClickWaveContainer
export const StClickWaveContainerRegister = _StClickWaveContainerRegister
// --------------------------------------------------------------------------------------------- 点击波浪效果容器组件 ------

// --------------------------------------------------------------------------------------------- 点击涟漪效果容器组件 ------
import _StClickRippleContainer from './components/StClickRippleContainer'
import {StClickRippleContainerRegister as _StClickRippleContainerRegister} from './components/StClickRippleContainer'

StCommonUiVue3Components.StClickRippleContainer = _StClickRippleContainer
export const StClickRippleContainer = _StClickRippleContainer
export const StClickRippleContainerRegister = _StClickRippleContainerRegister
// --------------------------------------------------------------------------------------------- 点击涟漪效果容器组件 ------

// ---------------------------------------------------------------------------------------------------- 3D 文本组件 ------
import _St3DText from "./components/St3DText"
import {St3DTextRegister as _St3DTextRegister} from "./components/St3DText"

StCommonUiVue3Components.St3DText = _St3DText
export const St3DText = _St3DText
export const St3DTextRegister = _St3DTextRegister
// ---------------------------------------------------------------------------------------------------- 3D 文本组件 ------

// --------------------------------------------------------------------------------------------- 鼠标悬浮发光容器组件 ------
import _StHoverShineContainer from "./components/StHoverShineContainer"
import {StHoverShineContainerRegister as _StHoverShineContainerRegister} from "./components/StHoverShineContainer"

StCommonUiVue3Components.StHoverShineContainer = _StHoverShineContainer
export const StHoverShineContainer = _StHoverShineContainer
export const StHoverShineContainerRegister = _StHoverShineContainerRegister
// --------------------------------------------------------------------------------------------- 鼠标悬浮发光容器组件 ------

// ------------------------------------------------------------------------------------------ 点击粒子爆炸效果容器组件 ------
import _StClickParticleBombContainer from './components/StClickParticleBombContainer'
import {StClickParticleBombContainerRegister as _StClickParticleBombContainerRegister} from './components/StClickParticleBombContainer'

StCommonUiVue3Components.StClickParticleBombContainer = _StClickParticleBombContainer
export const StClickParticleBombContainer = _StClickParticleBombContainer
export const StClickParticleBombContainerRegister = _StClickParticleBombContainerRegister
// ------------------------------------------------------------------------------------------ 点击粒子爆炸效果容器组件 ------

// --------------------------------------------------------------------------------------------- 点击气泡粒子容器组件 ------
import _StClickBubbleParticleContainer from './components/StClickBubbleParticleContainer'
import {StClickBubbleParticleContainerRegister as _StClickBubbleParticleContainerRegister} from './components/StClickBubbleParticleContainer'

StCommonUiVue3Components.StClickBubbleParticleContainer = _StClickBubbleParticleContainer
export const StClickBubbleParticleContainer = _StClickBubbleParticleContainer
export const StClickBubbleParticleContainerRegister = _StClickBubbleParticleContainerRegister
// --------------------------------------------------------------------------------------------- 点击气泡粒子容器组件 ------

// --------------------------------------------------------------------------------------- 鼠标移动粒子拖尾效果容器组件 ------
import _StMoveParticleTailContainer from './components/StMoveParticleTailContainer'
import {StMoveParticleTailContainerRegister as _StMoveParticleTailContainerRegister} from './components/StMoveParticleTailContainer'

StCommonUiVue3Components.StMoveParticleTailContainer = _StMoveParticleTailContainer
export const StMoveParticleTailContainer = _StMoveParticleTailContainer
export const StMoveParticleTailContainerRegister = _StMoveParticleTailContainerRegister
// --------------------------------------------------------------------------------------- 鼠标移动粒子拖尾效果容器组件 ------

// ------------------------------------------------------------------------------------ 鼠标移动实心粒子拖尾效果容器组件 ------
import _StMoveSolidParticleContainer from './components/StMoveSolidParticleContainer'
import {StMoveSolidParticleContainerRegister as _StMoveSolidParticleContainerRegister} from './components/StMoveSolidParticleContainer'

StCommonUiVue3Components.StMoveSolidParticleContainer = _StMoveSolidParticleContainer
export const StMoveSolidParticleContainer = _StMoveSolidParticleContainer
export const StMoveSolidParticleContainerRegister = _StMoveSolidParticleContainerRegister
// ------------------------------------------------------------------------------------ 鼠标移动实心粒子拖尾效果容器组件 ------

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
