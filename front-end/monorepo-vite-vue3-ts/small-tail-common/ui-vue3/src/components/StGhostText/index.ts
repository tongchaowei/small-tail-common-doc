import StGhostText from "./StGhostText.vue"
import {genCompGlobalRegisterPlugin} from "../../utils/gen-comp-global-register-plugin"

export default StGhostText
export const StGhostTextRegister = genCompGlobalRegisterPlugin(StGhostText)
