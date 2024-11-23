import { useState } from 'react'

function Square({value, onSquereClick}){
  
  return <button className='square' onClick={onSquereClick}>{value}</button>
}

function Board({xIsNext, squares, onPlay}) {

  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true)

  function handleClick(i){

    if(squares[i] || calculteWinner(squares)) return;

    const nextSqueres = squares.slice();

    nextSqueres[i] = (xIsNext) ? 'X' : 'O';
    // setXIsNext(!xIsNext);
    // setSquares(nextSqueres);
    onPlay(nextSqueres)
  }

  const winner = calculteWinner(squares)
  let status = ''

  if (winner){
    status = "Winner Is " + winner
  }else{
    status = 'Next Player Is = ' + (xIsNext ? 'X' : 0)
  }
  console.log(winner)

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
        <Square value={squares[0]} onSquereClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquereClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquereClick={() => handleClick(2)}/>
        <Square value={squares[3]} onSquereClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquereClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquereClick={() => handleClick(5)}/>
        <Square value={squares[6]} onSquereClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquereClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquereClick={() => handleClick(8)}/>
      </div>
    </>
  )
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)

  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function jumpTo(nextMove){
    setCurrentMove(nextMove)
  }

  function handlePlay(nextSqueres ){
    const nextHistory = [...history.slice(0, currentMove+1), nextSqueres]
    
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  const moves = history.map((squares, move) => {
    let description = ''
    if(move > 0){
      description = 'Go to move #' + move
    }else{
      description = 'Go to game start'
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })


  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}

function calculteWinner(squares){
  const lines = [
    [0,1,2],
    [2,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],    
  ]

  for(let i=0; i<lines.length; i++){
    // const a = lines[i][0]; //0
    // const b = lines[i][1]; //1
    // const c = lines[i][2]; //1
    const [a,b,c] = lines[i];

    if (squares[a] == squares[b] && squares[b] == squares[c]) {
      return squares[a];
}
    
  }

  return false;

}
