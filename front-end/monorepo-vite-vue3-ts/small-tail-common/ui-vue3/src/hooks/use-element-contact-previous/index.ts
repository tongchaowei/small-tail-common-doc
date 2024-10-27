import {Ref} from "vue"
import {useParentElement} from '@vueuse/core'

/**
 * 判断当前元素(左边界)是否与上一个兄弟元素(右边界)接触<br/>
 * 如果传入的元素不存在，则直接返回 false，即当前元素不与上一个兄弟元素接触；如果传入的元素为其父元素的第一个子元素，
 * 则直接返回 true，即没有上一个兄弟元素，当前元素与上一个兄弟元素接触；<br/>
 * 除上述两种情况外，如果当前元素相对于其偏移父元素(offsetParent)的左偏移量等于上一个兄弟元素相对于其偏移父元素的
 * 左偏移量加上上一个兄弟元素的宽度(包含边框和内边距)，则认为当前元素与上一个兄弟元素接触；否则，当前元素不与上一个兄
 * 弟元素接触。<br/>
 * 需要注意的是，<b style="color: red;">对于当前元素与其上一个兄弟元素，需要保证偏移父元素(offsetParent)是同
 * 一个元素</b>
 *
 * @param {Ref<HTMLElement | null | undefined>} elementRef 元素引用
 * @returns {boolean} 当前元素是否与上一个兄弟元素接触
 */
const useElementContactPrevious = (elementRef: Ref<HTMLElement | null | undefined>): boolean => {
  // 元素不存在
  if (!elementRef.value) return false
  const element = elementRef.value
  // 获取父元素引用对象
  const parentElementRef = useParentElement(elementRef)
  // 获取当前元素为父元素的第几个子元素
  const parentElement = parentElementRef.value as HTMLElement
  const index = Array.from(parentElement.children).indexOf(element)
  // 当前元素为父元素的第一个子元素
  if (index === 0) return true
  // 判断当前元素是否与上一个兄弟元素接触
  const previousElement = parentElement.children[index - 1] as HTMLElement
  return previousElement.offsetLeft + previousElement.offsetWidth >= element.offsetLeft
}

export default useElementContactPrevious
