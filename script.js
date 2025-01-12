import { height, gridSize, fps, delayEnd, width, cell, stroke, dot, margin, colourBoard, colourBorder, colourDot, colourAi, colourAiLight, colourPlayer, colourPlayerLight, tie } from './variables.js'

let canvasEl = document.createElement('canvas')
canvasEl.height = height
canvasEl.width = width
document.body.appendChild(canvasEl)
let canvasRect = canvasEl.getBoundingClientRect()

const ctx = canvasEl.getContext('2d')
ctx.lineWidth = stroke
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'

let currentCells, playersTurn, squares, scoreAI, scoreRI, timeEnd

function playGame() {
  requestAnimationFrame(playGame)
  drawBoard()
}

function click(e) {

}

function drawBoard() {
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

function drawDot(x, y) {
  ctx.fillStyle = colourDot
  ctx.beginPath()
  ctx.arc(x, y, dot, 0, Math.PI * 2)
  ctx.fill()
}
 
function drawGrid() {
  for (let i = 0; i < gridSize + 1; i++) {
    for (let j = 0; j < gridSize + 1; j++) {
      drawDot(getGridX(j), getGridY(i))
    }
  }
}

function drawLine(x0, y0, x1, y1, colour) {

}

function drawScores() {

}

function drawSquares() {

}

function drawText(text, x, y, colour, size) {

}

function getColour(player, light) {

}

function getText(player, small) {

}

function getGridX(col) {
  return cell * (col + 1)
}

function getGridY(row) {
  return margin + cell * row
}

function hightlightGrid(e) {

}

function highlightSide(x, y) {

}

function newGame() {
  currentCells = []
  playersTurn = Math.random() >= 0.5
  scoreAI = 0
  scoreRI = 0 
  timeEnd = 0
  squares = []
}

function selectSide() {

}

class Square {

}

newGame()
playGame()