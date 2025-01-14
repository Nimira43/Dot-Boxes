import { gridSize, fps, delayEnd, width, cell, margin, colourAi, colourAiLight, colourPlayer, colourPlayerLight, colourTie, sideObject, textPlayer, textAi, textSizeTop, textTie, textWin } from './variables.js'
import { getGridX, getGridY } from './getters.js'
import { canvasRect, drawBoard, drawDot,  drawText } from './drawers.js'
import { Square } from './index.js'

let currentCells
let squares
let timeEnd

export let playersTurn 
export let scoreAI 
export let scoreRI 

export function playGame() {
  requestAnimationFrame(playGame)
  drawBoard()
  drawSquares()
  drawGrid()
  drawScores()
}

export function click(e) {
  if (timeEnd > 0) {
    return
  }
  selectSide()
}

export function drawGrid() {
  for (let i = 0; i < gridSize + 1; i++) {
    for (let j = 0; j < gridSize + 1; j++) {
      drawDot(getGridX(j), getGridY(i))
    }
  }
}

export function drawScores() {
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

export function drawSquares() {
  for (let row of squares) {
    for (let square of row) {
      square.drawSides()
      square.drawFill()
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

export function highlightSide(x, y) {
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

export function newGame() {
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

export function selectSide() {
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
