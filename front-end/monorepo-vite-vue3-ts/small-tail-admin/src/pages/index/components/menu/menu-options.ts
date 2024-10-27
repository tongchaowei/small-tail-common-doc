import {MenuDividerOption, MenuGroupOption, MenuOption} from "naive-ui"

/**
 * 菜单选项
 *
 * // TODO 目录 菜单 iframe 外链
 */
const menuOptions: Array<MenuOption | MenuDividerOption | MenuGroupOption> = [
  {
    label: '系统管理',
    key: 'system',
    children: [
      {
        label: '菜单管理',
        key: 'menu',
      },
      {
        label: '用户管理',
        key: 'user',
      },
      {
        label: '角色管理',
        key: 'role',
      }
    ]
  },
  {
    label: '系统管理',
    key: 'system',
    children: [
      {
        label: '菜单管理',
        key: 'menu',
      }
    ]
  },
  {
    label: '系统管理',
    key: 'system',
    children: [
      {
        label: '菜单管理',
        key: 'menu',
      }
    ]
  }
]

export default menuOptions
