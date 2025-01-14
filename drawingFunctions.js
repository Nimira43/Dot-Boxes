import { ctx } from './canvasSetup.js'

import { colourBoard, colourBorder, colourDot, textSizeTop, colourTie, textTie, colourPlayer, textWin, textPlayer, width, margin, textAi, colourAi, cell, dot, stroke } from './variables'

import { getColour, getText } from './getters'

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

function drawLine(x0, y0, x1, y1, colour) {
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