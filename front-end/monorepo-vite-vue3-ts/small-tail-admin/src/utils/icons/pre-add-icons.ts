/**
 * 预先将图标添加到图标数据存储中（进行图标的预加载）<br/>
 * 在 src/pages/index/index.vue 文件中预加载图标，避免在首启动加载
 */

// ************************************************************************************************* Iconify Icon ******
import {addIcon} from '@iconify/vue/offline'

// ------------------------------------------------------------------------------------------------------- tabler ------
import Plus from '@iconify-icons/tabler/plus'
import Trash from '@iconify-icons/tabler/trash'
import Refresh from '@iconify-icons/tabler/refresh'
import Settings from '@iconify-icons/tabler/settings'
import ArrowsMoveVertical from '@iconify-icons/tabler/arrows-move-vertical'
import Edit from '@iconify-icons/tabler/edit'
import Search from '@iconify-icons/tabler/search'
import Reload from '@iconify-icons/tabler/reload'

const Tabler = 'tabler:'
addIcon(Tabler + 'plus', Plus)
addIcon(Tabler + 'trash', Trash)
addIcon(Tabler + 'refresh', Refresh)
addIcon(Tabler + 'settings', Settings)
addIcon(Tabler + 'arrows-move-vertical', ArrowsMoveVertical)
addIcon(Tabler + 'edit', Edit)
addIcon(Tabler + 'search', Search)
addIcon(Tabler + 'reload', Reload)
// ------------------------------------------------------------------------------------------------------- tabler ------

// --------------------------------------------------------------------------------------------- material-symbols ------
import Close from '@iconify-icons/material-symbols/close'

const MaterialSymbols = 'material-symbols:'
addIcon(MaterialSymbols + 'close', Close)
// --------------------------------------------------------------------------------------------- material-symbols ------
// ************************************************************************************************* Iconify Icon ******
