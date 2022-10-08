
// Scaling Constants for Canvas
var BOXSIZE = 100;
var OFFSET = 100;

// /** Represents a rectangle. */
// export class Rectangle {
//   constructor(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//   }

//   /** Does the (x,y) point exist within the rectangle. */
//   contains(x, y) {
//     return x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height);
// }

// }

// /** Map piece into rectangle in puzzle view. */
// export function computeRectangle(square) {
//   let c = square.location();
//   return new Rectangle(BOXSIZE*c.column + OFFSET, BOXSIZE*c.row + OFFSET, 
//                        BOXSIZE*square.width - 2*OFFSET, BOXSIZE*square.height - 2*OFFSET);
// }

/** Draw puzzle. */
export function drawPuzzle (ctx, puzzle) {
  ctx.shadowColor = 'black';
  let selected = puzzle.selected;
  // console.log("ttyty",puzzle.squares)
  puzzle.squares.forEach(square => {

      // let rect = computeRectangle(square);
      // console.log('tttt',selected)
      ctx.textBaseline = 'top';
      ctx.fillStyle = square.color;

      if (selected) { if (square.row === selected.row && square.column === selected.column && square.isbase ){ctx.fillStyle = "green";  }    }

      ctx.shadowBlur = 30;
      // console.log('',square.column)
      ctx.fillRect(square.column*100, square.row*100, 100, 100);

      ctx.fillStyle = "black";
      ctx.font = "20px Georgia"
      if(square.count>0){
      // console.log('zzz',square.column*100+10,square.row*100+10)
      ctx.fillText(square.count,square.column*100+40,square.row*100+40,40)
      }
  })

}

export function redrawCanvas(model, canvasObj, appObj) {
  const ctx = canvasObj.getContext('2d');
  if (ctx === null) { return; }    // here for testing purposes...
  
  // clear the canvas area before rendering the coordinates held in state
  ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  
  // console.log('ggg',model.puzzle)
  if (model.puzzle) { 
      drawPuzzle (ctx, model.puzzle);
  }
}