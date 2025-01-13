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

  for (let i = 0; i < gridSize; i++) {
    squares[i] = []
    for (let j = 0; j < gridSize; j++) {
      squares[i][j] = new Square(getGridX(j), getGridY(i), cell, cell)
    }
  }
}

function selectSide() {

}

class Square {
  constructor(x, y, w, h) {
    this.w = w
    this. h = h
    this.bottom = y + h
    this.left = x
    this.right = x + w
    this.top = y
    this.highlight = null
    this.numSelected = 0
    this.owner = null
    this.sideBottom = {
      owner: null, 
      selected: false
    }
    this.sideLeft = {
      owner: null, 
      selected: false
    }
    this.sideRight = {
      owner: null, 
      selected: false
    }
    this.sideTop = {
      owner: null, 
      selected: false
    }
  }
  contains = (x, y) => {
    return x >= this.left && 
           x < this.right &&
           y >= this.top &&
           y < this.bottom
  }
  drawFill = () => {

  }
  drawSide = (side, colour) => {

  }
  drawSides = () => {

  }
  highlightSide = (x, y) => {

  }
  selectSide = () => {

  }
}

newGame()
playGame()