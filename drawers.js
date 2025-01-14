import { height, width, stroke, dot, colourBoard, colourBorder, colourDot } from './variables.js'
import { click, highlightGrid } from './main.js'

export let canvasEl = document.createElement('canvas')

canvasEl.height = height
canvasEl.width = width
document.body.appendChild(canvasEl)

export let canvasRect = canvasEl.getBoundingClientRect()

export const ctx = canvasEl.getContext('2d')
ctx.lineWidth = stroke
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'

canvasEl.addEventListener('mousemove', highlightGrid)
canvasEl.addEventListener('click', click)

export function drawBoard() {
  ctx.fillStyle = colourBoard
  ctx.strokeStyle = colourBorder
  ctx.fillRect(0, 0, width, height)
  ctx.strokeRect(
    stroke / 4,
    stroke / 4,
    width - stroke / 2,
    height - stroke / 2
  )
}

export function drawDot(x, y) {
  ctx.fillStyle = colourDot
  ctx.beginPath()
  ctx.arc(x, y, dot, 0, Math.PI * 2)
  ctx.fill()
}

export function drawLine(x0, y0, x1, y1, colour) {
  ctx.strokeStyle = colour
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.stroke()
}

export function drawText(text, x, y, colour, size) {
  ctx.fillStyle = colour
  ctx.font = `${size}px sans-serif`
  ctx.fillText(text, x, y)
}
