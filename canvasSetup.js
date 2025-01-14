import { height, width, stroke } from './variables.js'

let canvasEl = document.createElement('canvas')
canvasEl.height = height
canvasEl.width = width
document.body.appendChild(canvasEl)
export let canvasRect = canvasEl.getBoundingClientRect()

export const ctx = canvasEl.getContext('2d')
ctx.lineWidth = stroke
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'