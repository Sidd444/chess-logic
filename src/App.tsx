import React, { useState, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ChessBoard from './components/ChessBoard';
import Timers from './components/Timers';
import MoveList from './components/MoveList';
import CapturedPieces from './components/CapturedPieces';

const App = () => {
  const [moves, setMoves] = useState([]);
  const [turn, setTurn] = useState('white');
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [paused, setPaused] = useState(false);
  const boardState = useRef([]);

  const handleMove = (move) => {
    boardState.current.push({ moves, turn, capturedPieces });
    setMoves([...moves, move]);
    setTurn(turn === 'white' ? 'black' : 'white');
  };

  const handleIllegalMove = () => {
    toast.error('Illegal move');
  };

  const handleReset = () => {
    setMoves([]);
    setTurn('white');
    setCapturedPieces({ white: [], black: [] });
    boardState.current = [];
    toast.success('Game reset');
  };

  const handlePauseResume = () => {
    setPaused(!paused);
    toast.success(paused ? 'Resumed' : 'Paused');
  };

  const handleUndo = () => {
    if (boardState.current.length > 0) {
      const { moves: previousMoves, turn: previousTurn, capturedPieces: previousCapturedPieces } = boardState.current.pop();
      setMoves(previousMoves);
      setTurn(previousTurn);
      setCapturedPieces(previousCapturedPieces);
      toast.success('Move undone');
    } else {
      toast.error('No moves to undo');
    }
  };

  return (
    <div className="flex mt-4 justify-center">
      <Toaster />
      <div className="flex-shrink-0">
        <ChessBoard onMove={handleMove} onIllegalMove={handleIllegalMove} turn={turn} setCapturedPieces={setCapturedPieces} capturedPieces={capturedPieces} />
      </div>
      <div className="flex-shrink-0 ml-4">
        <Timers turn={turn} paused={paused} />
        <div className="mt-4">
          <h3 className="text-lg">Current Turn: {turn.charAt(0).toUpperCase() + turn.slice(1)}</h3>
        </div>
        {/* <button onClick={handleReset} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Reset Game</button>
        <button onClick={handlePauseResume} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">{paused ? 'Resume' : 'Pause'} Game</button>
        <button onClick={handleUndo} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded">Undo Move</button> */}
        <MoveList moves={moves} />
        <CapturedPieces capturedPieces={capturedPieces} />
      </div>
    </div>
  );
};

export default App;
