import { colourPlayerLight, colourPlayer, colourAiLight, colourAi, textPlayerSm, textPlayer, textAiSm, textAi, cell, margin } from './variables.js'

export function getColour(player, light) {
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

export function getText(player, small) {
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

export function getGridX(col) {
  return cell * (col + 1)
}

export function getGridY(row) {
  return margin + cell * row
}