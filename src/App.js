import React from 'react';
import './App.css';
import { layout } from './Layout.js';
import Model from './model/Model.js';
import { configuration_1,configuration_2,configuration_3 } from './model/configs.js';
import { selectPiece,displayConfig,movePiece,solveCheck,resetPuzzle} from './controller/Controller.js';
import { redrawCanvas } from './boundary/Boundary.js'

var config_1 = JSON.parse(JSON.stringify(configuration_1)); 
var config_2 = JSON.parse(JSON.stringify(configuration_2));
var config_3 = JSON.parse(JSON.stringify(configuration_3));
var choosed_config = config_1;

function App() {
  const [model, setModel] = React.useState(new Model(choosed_config));
  
  const appRef = React.useRef(null);      // Later need to be able to refer to App 
  const canvasRef = React.useRef(null);   // Later need to be able to refer to Canvas

    /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
    React.useEffect (() => {
    
      /** Happens once. */
      redrawCanvas(model, canvasRef.current, appRef.current);
    }, [model]) 

  const chooseConfig = (config) => {
    let newModel = null;
    
    if (config === 1){
      newModel = displayConfig(model, config_1);
      choosed_config = config_1
      // console.log('ccc',choosed_config)
    }
    else if (config === 2){
      newModel = displayConfig(model, config_2);
      choosed_config = config_2
    }
    else if (config === 3){
      newModel = displayConfig(model, config_3);
      choosed_config = config_3
    }
    setModel(newModel);
  }

  const handleClick = (e) => {
    // console.log(e.screenX, e.screenY, e.clientX, e.clientY)
    // ^^^^^ useful for logging specific events for testing purposes
    let newModel = selectPiece(model, canvasRef.current, e);
    // console.log("selectpiece",newModel.puzzle.selected)
    setModel(newModel);   // react to changes, if model has changed.
  }

  const movePieceHandler = (direction,config_parm) => {
    // console.log("movepiecerrrr",model.puzzle.squares)
    let newModel = movePiece(model, direction,choosed_config);
    
    setModel(newModel);   // react to changes, if model has changed.
  }

  const solveHandler = () => {
    let newModel = solveCheck(model,choosed_config)
    setModel(newModel);
  }

  const resetHandler = () => {
    let newModel = resetPuzzle(choosed_config);
    // console.log("reset",newModel)
    // movePiece(newModel,"dummy",choosed_config)
    setModel(newModel);
  }

  return (
    <main style={layout.Appmain} ref={appRef}>
      <canvas tabIndex="1"  
        data-testid="canvas"
        className="App-canvas"
        ref={canvasRef}
        width={layout.canvas.width}
        height={layout.canvas.height}
        onClick={handleClick}
        />
        {/* Using '?' construct is proper React way to make image visible only when victorious. */}  

        <label data-testid="moves-label" style={layout.text}>{"Planar Puzzle"}</label>
        <div style={layout.buttons}>
           <button data-testid="one" style={layout.configOne}   onClick={(e) => chooseConfig(1)}  >Easy config</button>
           <button data-testid="two" style={layout.configTwo}   onClick={(e) => chooseConfig(2)}  >Medium config</button>
           <button data-testid="three" style={layout.configThree}   onClick={(e) => chooseConfig(3)}  >Hard config</button>
           <button data-testid="upbutton" style={layout.upbutton}     onClick={(e) => movePieceHandler("Up",choosed_config)}   >up</button>
           <button data-testid="leftbutton" style={layout.leftbutton}   onClick={(e) => movePieceHandler("Left",choosed_config)}  >left</button>
           <button data-testid="rightbutton" style={layout.rightbutton}  onClick={(e) => movePieceHandler("Right",choosed_config)}  >right</button>
           <button data-testid="downbutton" style={layout.downbutton}   onClick={(e) => movePieceHandler("Down",choosed_config)}  >down</button>

           <button data-testid="solve" style={layout.solvebutton}  onClick={(e) => solveHandler()}  >Solve</button>
           <button data-testid="reset" style={layout.resetbutton}   onClick={(e) => resetHandler()}  >Reset</button>

          {/* Label to show you have won the game */}
        { model.win ? (<label style={layout.victory}>You've Won!</label>) : (<label style={layout.victory}>Not Solved</label>) }

        </div>
    </main>
  );
}

export default App;
