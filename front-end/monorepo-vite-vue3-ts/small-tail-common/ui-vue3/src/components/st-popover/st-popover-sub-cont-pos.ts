/**
 * 小尾巴气泡组件中子内容区域相对于组件根元素的相对位置<br/>
 */
export enum StPopoverSubContPosEnum {
  /**
   * 左上
   * @type {StPopoverSubContPosEnum.LT}
   */
  LT = 'LT',
  /**
   * 左下
   * @type {StPopoverSubContPosEnum.LB}
   */
  LB = 'LB',
  /**
   * 右上
   * @type {StPopoverSubContPosEnum.RT}
   */
  RT = 'RT',
  /**
   * 右下
   * @type {StPopoverSubContPosEnum.RB}
   */
  RB = 'RB',
  /**
   * 上左
   * @type {StPopoverSubContPosEnum.TL}
   */
  TL = 'TL',
  /**
   * 上右
   * @type {StPopoverSubContPosEnum.TR}
   */
  TR = 'TR',
  /**
   * 下左
   * @type {StPopoverSubContPosEnum.BL}
   */
  BL = 'BL',
  /**
   * 下右
   * @type {StPopoverSubContPosEnum.BR}
   */
  BR = 'BR',
}

/**
 * 小尾巴气泡组件中子内容区域相对于组件根元素的相对位置对象组成的对象，
 * 其中，相对位置对象的 key 为 {@link StPopoverSubContPosEnum}
 * 的枚举值，相对位置对象中包含子内容区域相对于组件根元素的相对位置以及
 * 子内容区域出现时过渡效果变换的原点位置
 */
export const StPopoverSubContPosConst = {
  // --------------------------------------------------------------------------------------------------- 水平方向 --------
  [StPopoverSubContPosEnum.LT]: {
    position: {
      right: '100%',
      top: 0,
      transformOrigin: 'right top',
    }
  },
  [StPopoverSubContPosEnum.LB]: {
    position: {
      right: '100%',
      bottom: 0,
      transformOrigin: 'right bottom',
    }
  },
  [StPopoverSubContPosEnum.RT]: {
    position: {
      left: '100%',
      top: 0,
      transformOrigin: 'left top',
    }
  },
  [StPopoverSubContPosEnum.RB]: {
    position: {
      left: '100%',
      bottom: 0,
      transformOrigin: 'left bottom',
    }
  },
  // --------------------------------------------------------------------------------------------------- 垂直方向 --------
  [StPopoverSubContPosEnum.TL]: {
    position: {
      bottom: '100%',
      left: 0,
      transformOrigin: 'bottom left',
    }
  },
  [StPopoverSubContPosEnum.TR]: {
    position: {
      bottom: '100%',
      right: 0,
      transformOrigin: 'bottom right',
    }
  },
  [StPopoverSubContPosEnum.BL]: {
    position: {
      top: '100%',
      left: 0,
      transformOrigin: 'top left',
    }
  },
  [StPopoverSubContPosEnum.BR]: {
    position: {
      top: '100%',
      right: 0,
      transformOrigin: 'top right',
    }
  },
} as const
