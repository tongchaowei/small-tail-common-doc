import StSwiper from './StSwiper.vue'
import {genCompGlobalRegisterPlugin} from "../../utils/gen-comp-global-register-plugin"

export default StSwiper
export const StSwiperRegister = genCompGlobalRegisterPlugin(StSwiper)
