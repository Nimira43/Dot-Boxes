import { gridSize } from './variables.js '
import { drawDot } from './script.js'
import { getGridX, getGridY } from './getters.js'

export function drawGrid() {
  for (let i = 0; i < gridSize + 1; i++) {
    for (let j = 0; j < gridSize + 1; j++) {
      drawDot(getGridX(j), getGridY(i))
    }
  }
}
