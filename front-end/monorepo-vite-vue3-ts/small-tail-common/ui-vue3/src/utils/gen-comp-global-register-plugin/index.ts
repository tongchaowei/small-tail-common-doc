import {App, Component, Plugin} from "vue"

/**
 * 生成全局注册指定组件的插件
 *
 * @param component 需要生成全局注册插件的组件
 * @returns {Plugin} 全局注册指定组件的插件
 */
export const genCompGlobalRegisterPlugin = (component: Component): Plugin => {
  return (app: App) => {
    app.component(component.name as string, component)
    return app
  }
}
