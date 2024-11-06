/**
 * 生成一个[0, n)之间的随机浮点数
 *
 * @param n 最大值，如果 n<=0，则直接返回 0
 * @return {number} 随机浮点数
 */
export const randomFloatRightOpen_0_n = (n: number): number => {
  if (n <= 0) return 0
  return Math.random() * n
}

/**
 * 生成一个[n, m)之间的随机浮点数。
 * 注意：如果 n>=m，则直接返回 m
 *
 * @param {number} n 最小值
 * @param {number} m 最大值
 * @returns {number} 随机浮点数
 */
export const randomFloatRightOpen_n_m = (n: number, m: number): number => {
  if (n >= m) return m
  return n + randomFloatRightOpen_0_n(m - n)
}

/**
 * 生成一个[0, n)之间的随机整数
 *
 * @param n 最大值，如果 n<=0，则直接返回 0
 * @return {number} 随机整数
 */
export const randomIntRightOpen_0_n = (n: number): number => {
  return Math.floor(randomFloatRightOpen_0_n(n))
}

/**
 * 生成一个[0, n]之间的随机整数
 *
 * @param {number} n 最大值，如果 n<=0，则直接返回 0
 * @returns {number} 随机整数
 */
export const randomInt_0_n = (n: number): number => {
  return Math.floor(randomFloatRightOpen_0_n(n + 1))
}

/**
 * 生成一个[n, m)之间的随机整数。
 * 注意：如果 n>=m，则直接返回 m
 *
 * @param {number} n 最小值
 * @param {number} m 最大值
 * @returns {number} 随机整数
 */
export const randomIntRightOpen_n_m = (n: number, m: number): number => {
  return Math.floor(randomFloatRightOpen_n_m(n, m))
}

/**
 * 生成一个[n, m]之间的随机整数。
 * 注意：如果 n>=m，则直接返回 m
 *
 * @param {number} n 最小值
 * @param {number} m 最大值
 * @returns {number} 随机整数
 */
export const randomInt_n_m = (n: number, m: number): number => {
  return Math.floor(randomFloatRightOpen_n_m(n, m + 1))
}
