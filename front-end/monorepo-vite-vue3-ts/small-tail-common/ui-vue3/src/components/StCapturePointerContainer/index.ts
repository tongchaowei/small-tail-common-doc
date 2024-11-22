import StCapturePointerContainer from './StCapturePointerContainer.vue'
import {genCompGlobalRegisterPlugin} from "../../utils/gen-comp-global-register-plugin"

export default StCapturePointerContainer
export const StCapturePointerContainerRegister = genCompGlobalRegisterPlugin(StCapturePointerContainer)
