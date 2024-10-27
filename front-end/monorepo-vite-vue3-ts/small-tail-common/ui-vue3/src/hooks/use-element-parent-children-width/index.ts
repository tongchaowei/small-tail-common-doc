import {Ref} from "vue"
import {useParentElement} from '@vueuse/core'

/**
 * 获取当前元素父元素的所有子元素的宽度
 *
 * @param {Ref<HTMLElement | null | undefined>} elementRef 元素引用对象
 * @returns {{clientWidthSum: number, offsetWidthSum: number, clientWidth: number[], offsetWidth: number[]}}
 * clientWidth 为包含边框宽度的当前元素父元素的所有子元素的宽度，clientWidthSum 为 clientWidth 的总和；
 * offsetWidth 为包含边框和内边距宽度的当前元素父元素的所有子元素的宽度，offsetWidthSum 为 offsetWidth 的总和
 */
const useElementParentChildrenWidth = (elementRef: Ref<HTMLElement | null | undefined>) => {
  // 元素不存在
  if (!elementRef.value) {
    return {
      clientWidth: [],
      clientWidthSum: 0,
      offsetWidth: [],
      offsetWidthSum: 0,
    }
  }
  // 获取当前元素的父元素
  const parentElementRef = useParentElement(elementRef)
  const parentElement = parentElementRef.value as HTMLElement
  // 获取当前元素父元素的所有子元素的宽度(包含边框和内边距)
  let childrenOffsetWidthSum = 0
  const childrenOffsetWidth = Array.from(parentElement.children).map(child => {
    const offsetWidth = (child as HTMLElement).offsetWidth
    childrenOffsetWidthSum += offsetWidth
    return offsetWidth
  })
  // 获取当前元素父元素的所有子元素的宽度(包含内边距)
  let childrenClientWidthSum = 0
  const childrenClientWidth = Array.from(parentElement.children).map(child => {
    const clientWidth = (child as HTMLElement).clientWidth
    childrenClientWidthSum += clientWidth
    return clientWidth
  })
  return {
    clientWidth: childrenClientWidth,
    clientWidthSum: childrenClientWidthSum,
    offsetWidth: childrenOffsetWidth,
    offsetWidthSum: childrenOffsetWidthSum,
  }
}

export default useElementParentChildrenWidth
