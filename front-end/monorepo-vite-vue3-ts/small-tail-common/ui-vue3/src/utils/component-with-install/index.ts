import {App, Component} from "vue"

/**
 * 向组件上添加 install 方法，使其可以被全局注册到 Vue 应用实例 app 中
 *
 * @param {Component} component 组件
 * @returns {Component} 添加 install 方法的组件
 */
export const componentWithInstall = (component: Component): Component => {
  Reflect.set(component, 'install', (app: App) => {
    app.component(component.name as string, component)
    return app
  })
  return component
}
