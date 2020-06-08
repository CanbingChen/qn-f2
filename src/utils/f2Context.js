const CAPITALIZED_ATTRS_MAP = {
  fillStyle: 'FillStyle',
  fontSize: 'FontSize',
  globalAlpha: 'GlobalAlpha',
  opacity: 'GlobalAlpha',
  lineCap: 'LineCap',
  lineJoin: 'LineJoin',
  lineWidth: 'LineWidth',
  miterLimit: 'MiterLimit',
  strokeStyle: 'StrokeStyle',
  textAlign: 'TextAlign',
  textBaseline: 'TextBaseline',
  shadow: 'Shadow',
}

function strLen(str: string) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len++
    } else {
      len += 2
    }
  }
  return len
}

export default (ctx: any) => {
  Object.keys(CAPITALIZED_ATTRS_MAP).map((key) => {
    Object.defineProperty(ctx, key, {
      set(value) {
        if (key === 'shadow' && ctx.setShadow && Array.isArray(value)) {
          ctx.setShadow(value[0], value[1], value[2], value[3])
        } else {
          const name = 'set' + CAPITALIZED_ATTRS_MAP[key]
          ctx[name](value)
        }
      },
    })
    return key
  })
 //处理tooltip宽度问题
  ctx.measureText = (text: string) => {
    let fontSize = 6
    return {
      width: strLen(text) * fontSize,
    }
  }
  return ctx
}
