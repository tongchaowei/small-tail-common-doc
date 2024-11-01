import StPopover from "./StPopover.vue"
import { genCompGlobalRegisterPlugin } from '../../utils/gen-comp-global-register-plugin'

export default StPopover
export const StPopoverRegister = genCompGlobalRegisterPlugin(StPopover)
