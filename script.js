import { height, gridSize, fps, delayEnd, width, cell, stroke, dot, margin, colourBoard, colourBorder, colourDot, colourAi, colourAiLight, colourPlayer, colourPlayerLight, tie } from './variables'

let canvasEl = document.createElement('canvas')
canvasEl.height = height
canvasEl.width = width
document.body.appendChild(canvasEl)
let canvasRect = canvasEl.getBoundingClientRect()