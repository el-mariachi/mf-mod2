type TextPropsType = {
  ctx: CanvasRenderingContext2D
  textBaseline?:
    | 'top'
    | 'hanging'
    | 'middle'
    | 'alphabetic'
    | 'ideographic'
    | 'bottom'
  fillStyle?: string
  textAlign?: 'left' | 'right' | 'center' | 'start' | 'end'
  font?: string
}
type TextOptionsType = Omit<TextPropsType, 'ctx'>

export class Text {
  private options: TextOptionsType
  private ctx: CanvasRenderingContext2D
  constructor(props: TextPropsType) {
    const { ctx, ...rest } = props
    this.ctx = ctx
    this.options = rest
  }
  fill(text: string, x: number, y: number, opt = {}) {
    const options = { ...this.options, ...opt } as Required<TextOptionsType>
    this.ctx.textBaseline = options.textBaseline
    this.ctx.fillStyle = options.fillStyle
    this.ctx.textAlign = options.textAlign
    this.ctx.font = options.font
    this.ctx.fillText(text, x, y)
  }
}
