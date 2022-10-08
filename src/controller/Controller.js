
import Model, { Square } from '../model/Model.js';
// import { computeRectangle } from '../boundary/Boundary.js';

var path_done = []

export function selectPiece(model, canvas, event) {
    // const canvasRect = canvas.getBoundingClientRect();
    // find piece on which mouse was clicked.
    console.log('EVENT',event.screenX,event.screenY,event.clientY,event.clientX)
    let selected_sq = new Square(parseInt(event.clientY/100),parseInt(event.clientX/100),"green")
    
    // select this piece! Construct new model to represent this situation.
    var count_se = 0
    let numRows = model.puzzle.numRows;
    let numColumns = model.puzzle.numColumns;

    for(let i=0; i<numRows; i++) {
        for(let j=0; j<numColumns; j++) {

            if (model.puzzle.squares.find((sq => sq.row === i && sq.column === j)).isbase === true && model.puzzle.squares.find((sq => sq.row === i && sq.column === j)).played === true )
            {
              count_se += 1
            }
        }
    }

    var baseOrnot = model.puzzle.squares.find((sq => sq.row === selected_sq.row && sq.column === selected_sq.column)).isbase
 
    if (count_se % 2 === 0 && baseOrnot)
    {
        model.puzzle.select(selected_sq);
        model.puzzle.selected.played =true
        model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row && s.column === model.puzzle.selected.column).played = true
        return model.copy();
    }else{

        return model;

    }
    
}

export function displayConfig(model, config_info){
    return new Model(config_info);
}

export function resetPuzzle(choosed_config){
    // let puzzle = model(choosed_config)
    path_done = []
    // console.log("resttt_controller")
    return new Model(choosed_config)
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
export function  movePiece(model, direction, config_info){

    console.log('mmnnmn',direction)
    if (model.puzzle.selected === null){
        console.log("in",model.puzzle.selected)
        return model }

    console.log("oout------------")
    const inbaseSqures = config_info.baseSquares.find(sq => sq.row === model.puzzle.selected.row.toString() && sq.column === model.puzzle.selected.column.toString())
    var color_selected = null

    if (inbaseSqures){
        color_selected = inbaseSqures.color
    }else{
        color_selected = model.puzzle.selected.color
    }
    
    var num =model.puzzle.selected.count
    
    
    if ( !path_done.find(lg => lg === color_selected )) {
        // console.log("moveinside")
    
    if (direction === "Up" && !model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row - 1 && s.column === model.puzzle.selected.column).played )
    {    
        if( (model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row - 1 && s.column === model.puzzle.selected.column).color === color_selected ) || (model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row - 1 && s.column === model.puzzle.selected.column).color === "lightblue"))
        {
        // console.log('inside_up',direction)
        const up_row = model.puzzle.selected.row - 1
        const up_col = model.puzzle.selected.column
        model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col).color = color_selected

        model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col).count = num + 1

        model.puzzle.selected = model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col)
        // Make the square as played 
        model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row && s.column === model.puzzle.selected.column).played = true
        }
    }
    // left
    if (direction === "Left" && !model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row && s.column === model.puzzle.selected.column-1).played)
    {
        if( (model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row && s.column === model.puzzle.selected.column -1).color === color_selected ) || (model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row  && s.column === model.puzzle.selected.column-1).color === "lightblue"))
        {
        // console.log('inside_left',direction)
        const up_row = model.puzzle.selected.row 
        const up_col = model.puzzle.selected.column - 1
        model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col).color = color_selected
        
        // var num =model.puzzle.selected.count
        model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col).count = num + 1
        
        model.puzzle.selected = model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col)
        // Make the square as played 
        model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row && s.column === model.puzzle.selected.column).played = true
        }
    }

    // Right
    if (direction === "Right" && !model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row && s.column === model.puzzle.selected.column +1).played)
    {
        if( (model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row && s.column === model.puzzle.selected.column +1).color === color_selected ) || (model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row  && s.column === model.puzzle.selected.column+1).color === "lightblue"))
        {
        // console.log('inside_right',direction)
        const up_row = model.puzzle.selected.row 
        const up_col = model.puzzle.selected.column + 1

        console.log(model.puzzle.selected)
        model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col).color = color_selected

        // var num =model.puzzle.selected.count
        model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col).count = num + 1

        model.puzzle.selected = model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col)
        // Make the square as played 
        model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row && s.column === model.puzzle.selected.column).played = true
        }
    }
     // Down
     if (direction === "Down" && !model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row + 1 && s.column === model.puzzle.selected.column).played)
     {
        if( (model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row +1 && s.column === model.puzzle.selected.column ).color === color_selected ) || (model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row +1  && s.column === model.puzzle.selected.column).color === "lightblue"))
        {
        // console.log('inside_down',direction)
        const up_row = model.puzzle.selected.row +1
        const up_col = model.puzzle.selected.column 
        model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col).color = color_selected

        // var num =model.puzzle.selected.count
        model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col).count = num + 1

        model.puzzle.selected = model.puzzle.squares.find(s=> s.row === up_row && s.column === up_col)
        // Make the square as played 
        model.puzzle.squares.find(s=> s.row === model.puzzle.selected.row && s.column === model.puzzle.selected.column).played = true
        }
    }
    // console.log('out',model.puzzle.selected.isbase)
    

    if (model.puzzle.selected.isbase){

        path_done.push(model.puzzle.selected.color)
        
    }
    console.log('path',path_done)
    }
    // console.log("changedcount11",model.copy().puzzle.squares)
    return model.copy();
}
// }

export function solveCheck(model,configg){

    if(model.puzzle.selected === null){return model}

    var count = 0
    // console.log("sq",model.puzzle.squares)
    // check all squares are played.?
    let numRows = parseInt(configg.numRows);
    let numColumns = parseInt(configg.numColumns);
    let mul_cont = numColumns * numRows

    for(let i=0; i<numRows; i++) {
        for(let j=0; j<numColumns; j++) {

            if (model.puzzle.squares.find((sq => sq.row === i && sq.column === j)).played === true){
              count += 1
            }
        }
    }

    if(count === mul_cont){
        model.win = true
        // console.log("winnnner",model.win)
    }

    return model.copy();

}

 