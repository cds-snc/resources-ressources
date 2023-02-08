import tailwindConfig from '@/tailwind.config.js'

export default class Viewport {
  // Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  static isSmAndBigger(windowInnerWidth: number): boolean {
    return windowInnerWidth >= this.getBreakpointValue(Breakpoints.SM)
  }

  static isMdAndBigger(windowInnerWidth: number): boolean {
    return windowInnerWidth >= this.getBreakpointValue(Breakpoints.MD)
  }

  static isLgAndBigger(windowInnerWidth: number): boolean {
    return windowInnerWidth >= this.getBreakpointValue(Breakpoints.LG)
  }

  static isXlAndBigger(windowInnerWidth: number): boolean {
    return windowInnerWidth >= this.getBreakpointValue(Breakpoints.XL)
  }

  static isXl2AndBigger(windowInnerWidth: number): boolean {
    return windowInnerWidth >= this.getBreakpointValue(Breakpoints.XL2)
  }

  // Private Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  private static getBreakpointValue(breakpointPrefix: string): number {
    const screens = tailwindConfig.theme.screens
    let breakpoint = '0'

    switch (breakpointPrefix) {
      case Breakpoints.SM:
        breakpoint = screens.sm
        break
      case Breakpoints.MD:
        breakpoint = screens.md
        break
      case Breakpoints.LG:
        breakpoint = screens.lg
        break
      case Breakpoints.XL:
        breakpoint = screens.xl
        break
      case Breakpoints.XL2:
        breakpoint = screens['2xl']
    }

    return parseInt(breakpoint.replace('px', ''))
  }
}

class Breakpoints {
  static readonly SM: string = 'sm'
  static readonly MD: string = 'md'
  static readonly LG: string = 'lg'
  static readonly XL: string = 'xl'
  static readonly XL2: string = '2xl'
}
