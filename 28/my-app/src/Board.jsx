import Square from "./Components/Square.jsx";
import {useEffect, useState} from "react";
import calculateWinner from "./helpers/calculateWinner.jsx";
import ResetButton from "./Components/resetButton.jsx";
import PWinner from "./Components/pWinner.jsx";

const initialBoard = Array(9).fill(null)

function Board() {
    const [squares, setSquares] = useState(initialBoard)
    const [xIsNext, setXIsNext] = useState(true)
    const [winner, setWinner] = useState('');
    const handleClick = (position) => {
        if (squares[position] || calculateWinner(squares)){
            return
        } else {
            const newSquares = [...squares];
            newSquares[position] = xIsNext ? 'x' : "0";
            setSquares(newSquares)
            setXIsNext(!xIsNext)
        }
    }
    const handleReset = (position) => {
        setSquares(initialBoard);
        setXIsNext(true);
        setWinner('');
    }
    useEffect(() => {
        const isWinner = calculateWinner(squares)
        if (isWinner){
            setWinner(isWinner);

        }
    }, [squares])

    const renderSquare = (i) => {
        return <Square key={i} value={squares[i]} onClick={() => { handleClick(i) }} />
    }

    return (
        <div>
            <div className='flex'>
                {[0, 1, 2].map(renderSquare)}
            </div>
            <div className='flex'>
                {[3, 4, 5].map(renderSquare)}
            </div>
            <div className='flex'>
                {[6, 7, 8].map(renderSquare)}
            </div>
            <ResetButton onClick={handleReset} text="Новая игра"/>
            <PWinner className='winner' text={`winner:${winner}`}></PWinner>
        </div>
    )
}

export default Board
