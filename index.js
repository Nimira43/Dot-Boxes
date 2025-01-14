import { stroke, sideObject, textSizeCell } from './variables.js'
import { getColour, getText } from './getters.js'
import { ctx, drawLine, drawText,  } from './drawers.js'

import { playGame, newGame, playersTurn, scoreAI, scoreRI } from './main.js'

export class Square {
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