import { height, gridSize, fps, delayEnd, width, cell, stroke, dot, margin, colourBoard, colourBorder, colourDot, colourAi, colourAiLight, colourPlayer, colourPlayerLight, colourTie, sideObject, textSizeCell, textPlayer, textAi, textSizeTop, textTie, textWin } from './variables.js'

import { getColour, getText, getGridX, getGridY } from './getters.js'

let canvasEl = document.createElement('canvas')
canvasEl.height = height
canvasEl.width = width
document.body.appendChild(canvasEl)
let canvasRect = canvasEl.getBoundingClientRect()

const ctx = canvasEl.getContext('2d')
ctx.lineWidth = stroke
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'

let currentCells
let playersTurn 
let squares
let scoreAI 
let scoreRI 
let timeEnd

canvasEl.addEventListener('mousemove', highlightGrid)
  
canvasEl.addEventListener('click', click)

function playGame() {
  requestAnimationFrame(playGame)
  drawBoard()
  drawSquares()
  drawGrid()
  drawScores()
}

function click(e) {
  if (timeEnd > 0) {
    return
  }
  selectSide()
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
  let colourAI = playersTurn ? colourAiLight : colourAi
  let colourRI = playersTurn ? colourPlayer : colourPlayerLight

  drawText(
    textPlayer, 
    width * 0.25, 
    margin * 0.25,
    colourRI,
    textSizeTop
  )

  drawText(
    scoreRI,
    width * 0.25,
    margin * 0.6,
    colourRI,
    textSizeTop * 2
  )

  drawText(
    textAi, 
    width * 0.75, 
    margin * 0.25,
    colourAI,
    textSizeTop 
  )

  drawText(
    scoreAI,
    width * 0.75,
    margin * 0.6,
    colourAI,
    textSizeTop * 2
  )

  if (timeEnd > 0) {
    timeEnd--
    if (scoreRI == scoreAI) {
      drawText(
        textTie,
        width * 0.5,
        margin * 0.6,
        colourTie,
        textSizeTop
      ) 
    } else {
      let playerWins = scoreRI > scoreAI
      let colour = playerWins ? colourPlayer : colourAi
      let text = playerWins ? textPlayer : textAi
      drawText(
        text,
        width * 0.5,
        margin * 0.5,
        colour,
        textSizeTop
      )
      drawText(
        textWin, 
        width * 0.5,
        margin * 0.7,
        colour,
        textSizeTop
      )
    }
    if (timeEnd == 0) {
      newGame()
    }
  }
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
  ctx.fillText(text, x, y)
}

function highlightGrid(e) {
  if (timeEnd > 0) {
    return
  }
  let x = e.clientX - canvasRect.left
  let y = e.clientY - canvasRect.top
  highlightSide(x, y)
}

function highlightSide(x, y) {
  for (let row of squares) {
    for (let square of row) {
      square.highlight = null
    }
  }
  let rows = squares.length
  let cols = squares[0].length
  currentCells = []
  
  OUTER: for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (squares[i][j].contains(x, y)) {
        let side = squares[i][j].highlightSide(x, y)

        if (side != null) {
          currentCells.push({ row: i, col: j })
        }

        let row = i,
        col = j,
        highlight,
        neighbour = true

        if (
          side == sideObject.left && j > 0
        ) {
          col = j - 1
          highlight = sideObject.right
        } else if (
          side == sideObject.right && j < cols - 1
        ) {
          col = j + 1
          highlight = sideObject.left
        } else if (
          side == sideObject.top && i > 0
        ) {
          row = i - 1
          highlight = sideObject.bottom
        } else if (
          side == sideObject.bottom && i < rows - 1
        ) {
          row = i + 1
          highlight = sideObject.top
        } else {
          neighbour = false
        }

        if (neighbour) {
          squares[row][col].highlight = highlight
          currentCells.push({ row: row, col: col })
        }
        break OUTER
      }
    }
  }
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
  if (currentCells == null || currentCells.length == 0) {
    return
  }
  let filledSquare = false
  for (let cell of currentCells) {
    if (squares[cell.row][cell.col].selectSide()) {
      filledSquare = true
    }
  }
  currentCells = []

  if (filledSquare) {
    if (scoreRI + scoreAI == gridSize * gridSize) {
      timeEnd = Math.ceil(delayEnd * fps)
    } 
  } else {
    playersTurn = !playersTurn
  }
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
      case sideObject.bottom:
        drawLine(this.left, this.bottom, this.right, this.bottom, colour);
        break;
      case sideObject.left:
        drawLine(this.left, this.top, this.left, this.bottom, colour);
        break;
      case sideObject.right:
        drawLine(this.right, this.top, this.right, this.bottom, colour);
        break;
      case sideObject.top:
        drawLine(this.left, this.top, this.right, this.top, colour);
        break;
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
        sideObject.bottom, 
        getColour(this.sideBottom.owner, false)
      )
    }
    if (this.sideLeft.selected) {
      this.drawSide(
        sideObject.left, 
        getColour(this.sideLeft.owner, false)
      )
    }
    if (this.sideRight.selected) {
      this.drawSide(
        sideObject.right, 
        getColour(this.sideRight.owner, false)
      )
    }
    if (this.sideTop.selected) {
      this.drawSide(
        sideObject.top, 
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
    
    if (distClosest === distBottom && !this.sideBottom.selected) {
      this.highlight = sideObject.bottom
    } else if (distClosest === distLeft && !this.sideLeft.selected) {
      this.highlight = sideObject.left
    } else if (distClosest === distRight && !this.sideRight.selected) {
      this.highlight = sideObject.right
    } else if (distClosest === distTop && !this.sideTop.selected) {
      this.highlight = sideObject.top
    }
   
    return this.highlight
  }
  
  selectSide = () => {
    if (this.highlight == null) {
      return
    }

    switch (this.highlight) {
      case sideObject.bottom:
        this.sideBottom.owner = playersTurn
        this.sideBottom.selected = true
        break
      case sideObject.left:
        this.sideLeft.owner = playersTurn
        this.sideLeft.selected = true
        break
      case sideObject.right:
        this.sideRight.owner = playersTurn
        this.sideRight.selected = true
        break
      case sideObject.top:
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