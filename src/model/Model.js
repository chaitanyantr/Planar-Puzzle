

// export class Coordinate {
//     constructor(row, column) {
//         this.row = row;
//         this.column = column;
//     }
// }

export class Square{

    constructor(row,col,sq_color,unuse,base,c,play_parm){
        this.row = row
        this.column = col
        this.count = c || 0
        this.color = sq_color || "lightblue"
        this.unused = unuse || false
        this.isbase = base || false
        this.played = play_parm || false
    }

    place(row, col) {
        this.row = row;
        this.column = col;
    }
    // location() {
    //     return new Coordinate(this.row, this.column);
    // }

    copy() {
        // console.log('yyyyy',this.color)
        let s = new Square(this.width, this.height, this.color,this.unused,this.isbase,this.count,this.played);
        s.place(this.row, this.column);
        return s;
    }
}

export class PlanarPuzzle{
    constructor(numRows,numColumns){
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.selected = null;
    }

    initialize(squares) {
        // make sure to create NEW Piece objects
        // console.log('sedts',squares)
        this.squares = squares.map(s => s.copy());
        // console.log('dsfhydrh',this.squares)
    }

    select(square) {
        this.selected = square;
    }
    
    isSelected(square) {
        return square === this.selected;
    }

    clone() {
        // console.log('clonee',this.selected)
        let copy = new PlanarPuzzle(this.numRows, this.numColumns);
        copy.squares = [];
        for (let p of this.squares) {
            let dup = p.copy();
            copy.squares.push(dup);
            if (p === this.selected) {
                copy.selected = dup;
            }
        }
        // console.log('clonee2',this.selected)
        return copy;
    }
}

export default class Model{

    constructor(info) {
        this.initialize(info);
        this.info = info;
    }

    initialize(info) {
        let numRows = parseInt(info.numRows);
        let numColumns = parseInt(info.numColumns);
        // console.log(info.numRows)
        var allSquares = [];
        this.win = false;
  
        // console.log("Im called")
        for(let i=0; i<numRows; i++) {
            for(let j=0; j<numColumns; j++) {
                
                const inBS = info.baseSquares.find(sq => sq.row === i.toString() && sq.column === j.toString())
                const inUnUsed = info.unusedSquares.find(sq => sq.row === i.toString() && sq.column === j.toString())

                let sq = new Square(i,j);
                if (inBS){
                    sq = new Square(i, j,inBS.color,false,true)
                }else if(inUnUsed) {
                    sq = new Square(i, j,inUnUsed.color,true,false,0,true)
                }
                allSquares.push(sq)
            }
        }
        // console.log('aaallll',allSquares)
        this.puzzle = new PlanarPuzzle(numRows, numColumns);        
        this.puzzle.initialize(allSquares);
        // console.log('seleeeee',this.puzzle.selected)
    }

    copy() {
        let m = new Model(this.info);                 
        m.puzzle = this.puzzle.clone();
        m.puzzle.selected = this.puzzle.selected;
        m.puzzle.selected.count = this.puzzle.selected.count
        m.puzzle.selected.played = this.puzzle.selected.played;
        m.win = this.win
        return m;
    }
}