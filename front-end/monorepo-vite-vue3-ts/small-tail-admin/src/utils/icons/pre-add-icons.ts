/**
 * 预先将图标添加到图标数据存储中（进行图标的预加载）<br/>
 * 在 src/pages/index/st-react-collapse.vue 文件中预加载图标，避免在首启动加载
 */

// ************************************************************************************************* Iconify Icon ******
import {addIcon} from '@iconify/vue/offline'

// ------------------------------------------------------------------------------------------------------- tabler ------
import Plus from '@iconify-icons/tabler/plus'
import Trash from '@iconify-icons/tabler/trash'
import Refresh from '@iconify-icons/tabler/refresh'
import Settings from '@iconify-icons/tabler/settings'
import ArrowsMaximize from '@iconify-icons/tabler/arrows-maximize'

const Tabler = 'tabler:'
addIcon(Tabler + 'plus', Plus)
addIcon(Tabler + 'trash', Trash)
addIcon(Tabler + 'refresh', Refresh)
addIcon(Tabler + 'settings', Settings)
addIcon(Tabler + 'arrows-maximize', ArrowsMaximize)
// ------------------------------------------------------------------------------------------------------- tabler ------

// ************************************************************************************************* Iconify Icon ******
