/**
 * 判断数据是否为字符串类型
 *
 * @param data 任意数据
 * @returns {data is string} 传入的数据是否为字符串类型
 */
export const isStr = (data: any): data is string => typeof data ==='string'
