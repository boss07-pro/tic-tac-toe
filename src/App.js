
import './App.css';
import ReactDOM from "react-dom/client";

import { useState } from "react";

function Square({value,onSquareClick}) {
    //creating a button
    return (<button className="square" style={{"height":30,"width": 30}} onClick={onSquareClick}>
        {value}
    </button> )
}
function Board({xIsNext, squares, onPlay}) {
    function handleClick(i){
        if(squares[i] || calculateWinners(squares)){
            return; //checking if the game is already won and not displaying after that
        }
        const nextSquares  = squares.slice()
        if(xIsNext){
            nextSquares[i] = "X";//displaying X after O
        } else {
            nextSquares[i] = "O";//displaying O after X
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinners(squares)
    let status;
    if(winner) {
        status = "Winner: "+ winner;//Display winner

    }
    else{
        status = "Next player: " + (xIsNext? "X" : "O")//Check status
    }

    return (
        <>
            {/* Creating multiple buttons */}
            <div className="status">{ status }</div>

        <div className="board-row">
        <Square value = {squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value = {squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value = {squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>

        <div className="board-row">
        <Square value = {squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value = {squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value = {squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>

        <div className="board-row">
        <Square value = {squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value = {squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value = {squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
        </>

    );


}

export default function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)]);//initialising an array
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 ===0 ;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0,currentMove + 1),nextSquares]
        setHistory([...history,nextSquares]);
        setCurrentMove(nextHistory.length - 1)

    }

    function jumpTo(nextMove){

        setCurrentMove(nextMove);

    }

    const moves = history.map((squares,move) => {
        let description;
        if(move > 0) {
            description = 'You are at move #' + move;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key = {move}>
               <p>{description}</p>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}



function calculateWinners(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    //check for winner
    for (let i=0 ;i < lines.length ; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
            return squares[a]; //return the winner
        }

    }
    //return null if no winner
    return null;

}












