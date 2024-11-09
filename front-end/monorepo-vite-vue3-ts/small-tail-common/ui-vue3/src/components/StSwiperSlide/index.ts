import StSwiperSlide from './StSwiperSlide.vue'
import {genCompGlobalRegisterPlugin} from "../../utils/gen-comp-global-register-plugin"

export default StSwiperSlide
export const StSwiperSlideRegister = genCompGlobalRegisterPlugin(StSwiperSlide)
