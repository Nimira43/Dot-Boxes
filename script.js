import { height, gridSize, fps, delayEnd, width, cell, stroke, dot, margin, colourBoard, colourBorder, colourDot, colourAi, colourAiLight, colourPlayer, colourPlayerLight, tie, textSizeCell, textPlayerSm, textPlayer, textAiSm, textAi } from './variables.js'

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
  drawSquares()
  drawGrid()
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
  ctx.strokeStyle = colour
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.stroke()
}

function drawScores() {

}

function drawSquares() {
  for (let row of squares) {
    for (let square of row) {
      square.drawSides()
      square.drawFill()
    }
  }
}

function drawText(text, x, y, colour, size) {
  ctx.fillStyle = colour
  ctx.font = `${size}px sans-serif`
  ctx.fillText(text(text, x, y))
}

function getColour(player, light) {
  if (player) {
    return light 
    ? colourPlayerLight 
    : colourPlayer 
  } else {
    return light
    ? colourAiLight
    : colourAi
  }
}

function getText(player, small) {
  if (player) {
    return small 
    ? textPlayerSm
    : textPlayer
  } else {
    return small 
    ? textAiSm 
    : textAi
  }
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
    if (this.owner == null) {
      return
    }
    ctx.fillStyle = getColour(this.owner, true)
    ctx.fillRect(
      this.left + stroke,
      this.top + stroke,
      this.w - stroke * 2,
      this.h - stroke * 2,
    )
    drawText(
      getText(this.owner, true),
      this.left + this.w / 2,
      this.top + this.h / 2,
      getColour(this.owner, false),
      textSizeCell
    )
  }
  drawSide = (side, colour) => {
    switch (side) {
      case side.bottom:
        drawLine(
          this.left,
          this.bottom,
          this.right,
          this.bottom,
          colour
        )
        break
      case side.left:
        drawLine(
          this.left,
          this.top,
          this.left,
          this.bottom,
          colour
        )
        break
      case side.right:
        drawLine(
          this.right,
          this.top,
          this.right,
          this.bottom,
          colour
        )
        break
      case side.top:
        drawLine(
          this.left,
          this.top,
          this.right,
          this.top,
          colour
        )
        break
    }
  }
  drawSides = () => {
    if (this.highlight != null) {
      this.drawSide(
        this.highlight, 
        getColour(playersTurn, true)
      )
    }
    if (this.sideBottom.selected) {
      this.drawSide(
        side.bottom, 
        getColour(this.sideBottom.owner, false)
      )
    }
    if (this.sideLeft.selected) {
      this.drawSide(
        side.left, 
        getColour(this.sideLeft.owner, false)
      )
    }
    if (this.sideRight.selected) {
      this.drawSide(
        side.right, 
        getColour(this.sideRight.owner, false)
      )
    }
    if (this.sideTop.selected) {
      this.drawSide(
        side.top, 
        getColour(this.sideTop.owner, false)
      )
    }
  }
  highlightSide = (x, y) => {
    let distBottom = this.bottom - y
    let distLeft = x - this.left
    let distRight = this.right - x
    let distTop = y - this.top
    let distClosest = Math.min(
      distBottom,
      distLeft,
      distRight,
      distTop
    )

    if (distClosest == distBottom && !this.sideBottom.selected) {
      this.highlight = side.bottom
    } else if (distClosest == distLeft && !this.sideLeft.selected) {
      this.highlight = side.left
    } else if (distClosest == distRight && !this.sideRight.selected) {
      this.highlight = side.right
    } else if (distClosest == distTop && !this.sideTop.selected) {
      this.highlight = side.top
    }
    return this.highlight
  }

  selectSide = () => {
    if (this.highlight == null) {
      return
    }

    switch (this.highlight) {
      case side.bottom:
        this.sideBottom.owner = playersTurn
        this.sideBottom.selected = true
        break
      case side.left:
        this.sideLeft.owner = playersTurn
        this.sideLeft.selected = true
        break
      case side.right:
        this.sideRight.owner = playersTurn
        this.sideRight.selected = true
        break
      case side.top:
        this.sideTop.owner = playersTurn
        this.sideTop.selected = true
        break
    }
    this.highlight = null
    this.numSelected++

    if (this.numSelected == 4) {
      this.owner = playersTurn
      if (playersTurn) {
        scoreRI++
      } else {
        scoreAI++
      }
      return true
    }
    return false
  }
}

newGame()
playGame()