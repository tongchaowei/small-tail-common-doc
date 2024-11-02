import StTimeline1 from "./StTimeline1.vue"
export * from "./types"
import { genCompGlobalRegisterPlugin } from '../../utils/gen-comp-global-register-plugin'

export default StTimeline1
export const StTimeline1Register = genCompGlobalRegisterPlugin(StTimeline1)
