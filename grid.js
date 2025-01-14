import { gridSize } from './variables.js '
import { drawDot, timeEnd, canvasRect } from './script.js'
import { getGridX, getGridY } from './getters.js'
import { highlightSide } from './script.js'

export function drawGrid() {
  for (let i = 0; i < gridSize + 1; i++) {
    for (let j = 0; j < gridSize + 1; j++) {
      drawDot(getGridX(j), getGridY(i))
    }
  }
}

export function highlightGrid(e) {
    if (timeEnd > 0) {
      return
    }
    let x = e.clientX - canvasRect.left
    let y = e.clientY - canvasRect.top
    highlightSide(x, y)
  }
