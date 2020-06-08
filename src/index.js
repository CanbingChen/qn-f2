// import F2 from '@antv/f2';

import { useEffect, useState, useRef } from '@tarojs/taro'
import { Canvas, View } from '@tarojs/components'
import F2Context from '@/utils/f2Context'
import F2 from '@antv/f2/build/f2-simple'
// const F2 = require('@antv/f2/lib/core')

const Tooltip = require('@antv/f2/lib/plugin/tooltip')
F2.Chart.plugins.register(Tooltip)

function convertTouches(eventDetail) {
  if (!eventDetail) {
    return []
  }
  return [eventDetail]
}

function convertEvent(mouseEvent) {
  const touches = convertTouches(mouseEvent.detail)
  const changedTouches = touches
  return {
    preventDefault: function () {},
    touches,
    changedTouches,
  }
}

function randomStr(long: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const maxPos = chars.length
  var string = ''
  for (var i = 0; i < long; i++) {
    string += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return string
}

const Chart = ({ onInit, width, height }) => {
  const [w, setWidth] = useState(0)
  const [h, setHeaght] = useState(0)
  const canvasEl = useRef(null)
  const id = useRef(`f2-canvas-${randomStr(16)}`)
  useEffect(() => {
    const myCtx = my.createCanvasContext(id.current)
    const context = F2Context(myCtx)
    const query = my.createSelectorQuery()
    query
      .select(`#${id.current}`)
      .boundingClientRect()
      .exec((res) => {
        console.log(res, 'resres')
        // 获取画布实际宽高
        const { width, height } = res[0]
        // console.log(pixelRatio,'pixelRatio')
        // 高清解决方案
        setWidth(width)
        setHeaght(height)
        const chart = onInit(F2, { context, width, height, pixelRatio: 1 })
        if (chart) {
          canvasEl.current = chart.get('el')
        }
      })

    //     }
  }, [])

  const mouseDown = (e) => {
    const canvasEle = canvasEl.current
    if (!canvasEle) {
      return
    }
    canvasEle.dispatchEvent('touchstart', convertEvent(e))
  }

  const mouseMove = (e) => {
    const canvasEle = canvasEl.current
    if (!canvasEle) {
      return
    }

    canvasEle.dispatchEvent('touchmove', convertEvent(e))
  }

  const mouseUp = (e) => {
    const canvasEle = canvasEl.current
    if (!canvasEle) {
      return
    }
    canvasEle.dispatchEvent('touchend', convertEvent(e))
  }
  return (
    <view>
      <mouseable-view onMousemove={mouseMove} onMousedown={mouseDown} onMouseup={mouseUp} relative>
        <Canvas id={id.current} style={`width:${width}px;height:${height}px;`} />
      </mouseable-view>
    </view>
  )
}

export default Chart
