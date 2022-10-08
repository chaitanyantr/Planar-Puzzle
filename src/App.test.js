import App from './App';
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import Model from './model/Model.js';
import { configuration_1,configuration_2,configuration_3 } from './model/configs.js';
import { displayConfig, selectPiece, movePiece,solveCheck,path_done} from './controller/Controller.js';

var config = JSON.parse(JSON.stringify(configuration_1)); 
var model = new Model(config)

// test model loading

test('Initially when model is loded model - the puzzle copy should not be null',()=>{
  expect(model.puzzle.clone() != null)
});

test('Initially puzzle win should not be True',()=>{
    expect(model.win != true)
  });

test('Initially model variable allsquares should be loaded with array of squares',()=>{
  expect(model.initialize.allSquares != null)
});

test('Initially Model Rows should not be 0',()=>{
  expect(model.numRows != 0)
});

test('Initially Model columns should not be 0',()=>{
    expect(model.numColumns != 0)
});

  test('Model should get a configuration as param',()=>{
    expect(model.info != 0)
});

// test planar puzzle class

test('Initially puzzle Rows should not be 0',()=>{
  expect(model.puzzle.numRows != 0)
});

test('Initially puzzle columns should not be 0',()=>{
    expect(model.puzzle.numColumns != 0)
});

test('Initially puzzle should have all squares information',()=>{
  expect(model.puzzle.squares != 0)
});

test('Initially puzzle copy should not be 0',()=>{
  expect(model.puzzle.clone() != 0)
});

test('Initially puzzle selected is null',()=>{
  expect(model.puzzle.selected === null)
});

test('Initially puzzle isSelected return null',()=>{
  expect(model.puzzle.isSelected === null)
});

// inital model should be config1

test('Initially inital model rows should be 2',()=>{
  // console.log(model.info.numRows)
  expect(model.info.numRows === "2"  ) 
});

test(' initial model col should be 4',()=>{
  // console.log('ggg',model.info.numColumns)
  expect(model.info.numColumns === "4" )
});


test('color_seelcted should be null if no Selection of square',()=>{  
  expect(movePiece.color_selected == null)
});

test('color_seelcted should be null if its not base square',()=>{
  // console.log(model.info.numColumns)
  var sq = model.puzzle.squares.find(sq => sq.row == 1 && sq.column == 1)  
  // set the puzzle
  model.puzzle.select(sq)
  expect(movePiece.color_selected == null)
});


// test selection of square controller
test('Selection of square should set in model select function',()=>{
  // console.log(model.info.numColumns)
  var sq = model.puzzle.squares.find(sq => sq.row == 1 && sq.column == 1)
  // set the puzzle
  model.puzzle.select(sq)
  expect(model.puzzle.selected == sq)
});

// test displayConfig in controller

test('diplay config should not return null initally',()=>{  
  expect(displayConfig(model,config) != null )
});

// selectPiece controller

test('select piece should be 0 initally',()=>{  
  expect(selectPiece.count_se === 0 )
});

// app js
test('Expect App to be rendered', () => {
  expect(<App/>)
});

test('Expect config1 to be rendered when easy button pressed', () => {
  const ren = render(<App/>)
  // const canvasElememnt = screen.getByTestId("canvas")
  const config1button = screen.getByTestId("one")
  fireEvent.click(config1button)
  // console.log('ttt',model.puzzle.squares)
  expect(model.puzzle.squares.length)
});

test('Expect config2 to be rendered', () => {
  const ren = render(<App/>)
  // const canvasElememnt = screen.getByTestId("canvas")
  const config2button = screen.getByTestId("two")
  fireEvent.click(config2button)
  // console.log('ttt',model.puzzle.squares)
  expect(model.puzzle.squares.length)
});

test('Expect config3 to be rendered', () => {
  const ren = render(<App/>)
  // const canvasElememnt = screen.getByTestId("canvas")
  const config3button = screen.getByTestId("three")
  fireEvent.click(config3button)
  // console.log('ttt',model.puzzle.squares)
  expect(model.puzzle.squares.length)
});

test('Expect solve test on GUI without starting game', () => {
  const ren = render(<App/>)
  const canvasElement = screen.getByTestId("canvas")
  const solbutton = screen.getByTestId("solve")
  
  // console.log('ttt',model.puzzle.squares)
  // expect(model.puzzle.squares.length)
  fireEvent.click(canvasElement,{screenX:50, screenY:145,clientX:60, clientY:60})
  fireEvent.click(solbutton)
  expect(screen.getByText(/Not Solved/i)).toBeInTheDocument()
});

test('Expect solve text on GUI with selected function call only', () => {
  const ren = render(<App/>)
  const canvasElement = screen.getByTestId("canvas")
  const solbutton = screen.getByTestId("solve")
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 0)
  model.puzzle.selected = square
  // console.log('ttt',model.puzzle.squares)
  // expect(model.puzzle.squares.length)
  fireEvent.click(canvasElement,{screenX:50, screenY:145,clientX:60, clientY:60})
  fireEvent.click(solbutton)
  expect(screen.getByText(/Not Solved/i)).toBeInTheDocument()
});


test('config1 test button moves with function selection - movepiece function down param', ()=> {
  const ren = render(<App/>)
  const canvasElement = screen.getByTestId("canvas")
  const dowbutton = screen.getByTestId("downbutton")
  // const solbutton = screen.getByTestId("solve")
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 0)
  model.puzzle.selected = square

  // console.log('dowwwww',model.puzzle.selected)
  // fireEvent.click(dowbutton)
  expect(movePiece(model,"Down",config))
})

test('config1 test buttons through GUI - down button', ()=> {
  const ren = render(<App/>)
  const canvasElement = screen.getByTestId("canvas")
  const dowbutton = screen.getByTestId("downbutton")
  // const solbutton = screen.getByTestId("solve")
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 0)
  var ex_sq =  model.puzzle.squares.find(square => square.row === 1 && square.column === 0)
  model.puzzle.selected = square

  // console.log('dowwwww',model.puzzle.selected)
  fireEvent.click(dowbutton)
  expect(ex_sq.color === "red")
})

test('config1 solution test - movepiece function right param', ()=> {
  const ren = render(<App/>)
  const canvasElement = screen.getByTestId("canvas")
  const dowbutton = screen.getByTestId("downbutton")
  // const solbutton = screen.getByTestId("solve")
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 0)
  var ex_sq =  model.puzzle.squares.find(square => square.row === 0 && square.column === 1)
  model.puzzle.selected = square

  movePiece(model,"Right",config)

  expect(ex_sq.color === "red")
})

test('config1 solution test - movepiece function Left param', ()=> {
  const ren = render(<App/>)
  const canvasElement = screen.getByTestId("canvas")
  const dowbutton = screen.getByTestId("downbutton")
  // const solbutton = screen.getByTestId("solve")
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 2)
  var ex_sq =  model.puzzle.squares.find(square => square.row === 0 && square.column === 1)
  model.puzzle.selected = square

  movePiece(model,"Left",config)
  expect(ex_sq.color === "red")
})

test('config1 solution test - movepiece function Left param', ()=> {
  const ren = render(<App/>)
  const canvasElement = screen.getByTestId("canvas")
  // const lefbutton = screen.getByTestId("leftbutton")
  // const solbutton = screen.getByTestId("solve")
  var square = model.puzzle.squares.find(square => square.row === 1 && square.column === 2)
  
  model.puzzle.selected = square
  movePiece(model,"Right",config)
  movePiece(model,"Up",config)

  var ex_sq =  model.puzzle.squares.find(square => square.row === 1 && square.column === 3)

  expect(ex_sq.color === "orange")
})

test('Expect reset to be rendered', () => {
  const ren = render(<App/>)
  // const canvasElememnt = screen.getByTestId("canvas")
  const resbutton = screen.getByTestId("reset")
  fireEvent.click(resbutton)
  // console.log('ttt',model.puzzle.squares)
  expect(model.puzzle.squares.length)
});



test('model.puzzle.isSelected', ()=> {
  
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 2)
  model.puzzle.selected = square
  expect(model.puzzle.isSelected(square))

  // movePiece(model,"Left",config)
})


// ----------------------------test game with a predefined solution-----------------#

test('config1 solution test - predefined solution steps', ()=> {
  const ren = render(<App/>)

  const canvasElement = screen.getByTestId("canvas")
  const dowbutton = screen.getByTestId("downbutton")
  const rigbutton = screen.getByTestId("rightbutton")
  const lefbutton = screen.getByTestId("leftbutton")
  const upbutton = screen.getByTestId("upbutton")
  const solbutton = screen.getByTestId("solve")

  // const solbutton = screen.getByTestId("solve")
  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 0)
  model.puzzle.selected = square

  movePiece(model,"Down",config)
  movePiece(model,"Right",config)
  movePiece(model,"Up",config)
  movePiece(model,"Right",config)

  var square = model.puzzle.squares.find(square => square.row === 0 && square.column === 3)
  model.puzzle.selected = square

  movePiece(model,"Down",config)
  movePiece(model,"Left",config)

  // fireEvent.click(solbutton)

  solveCheck(model,config)

})



