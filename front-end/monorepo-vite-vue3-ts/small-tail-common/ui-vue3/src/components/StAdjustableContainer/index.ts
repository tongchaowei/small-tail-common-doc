import StAdjustableContainer from './StAdjustableContainer.vue'
import { genCompGlobalRegisterPlugin } from '../../utils/gen-comp-global-register-plugin'

export default StAdjustableContainer
export const StAdjustableContainerRegister = genCompGlobalRegisterPlugin(StAdjustableContainer)
