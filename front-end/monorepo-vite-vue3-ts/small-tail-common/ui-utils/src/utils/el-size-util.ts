/**
 * 对页面元素的大小进行预处理，如果为页面元素指定的大小为数字类型，则为其添加单位，默认情况下添加的单位为 px，否则不进行预处理
 *
 * @param {string | number} elSize 为页面元素指定的大小
 * @param {string} unit 为页面元素指定的大小的单位，默认为 px
 * @returns {string} 预处理后的元素大小
 */
export const elSizePreHandler = (elSize: string | number, unit: string = 'px'): string => {
  if (typeof elSize === 'number') {
    return elSize + unit;
  }
  return elSize;
}
