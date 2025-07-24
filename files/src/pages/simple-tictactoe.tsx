import React, { useState } from "react";

const SimpleTicTacToe = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (checkWinner(board) || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setScores(prev => ({ ...prev, [winner]: prev[winner as keyof typeof prev] + 1 }));
    } else if (newBoard.every(cell => cell)) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
  };

  const winner = checkWinner(board);
  const isDraw = !winner && board.every(cell => cell);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '20px',
          fontSize: '2rem'
        }}>
          TicTacToe
        </h1>

        {/* Puntuación */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '20px',
          fontSize: '1.1rem'
        }}>
          <div>X: {scores.X}</div>
          <div>O: {scores.O}</div>
          <div>Empates: {scores.draws}</div>
        </div>

        {/* Estado del juego */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
          {winner ? `¡Ganador: ${winner}!` :
           isDraw ? '¡Empate!' :
           `Turno: ${isXNext ? 'X' : 'O'}`}
        </div>

        {/* Tablero */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '5px',
          marginBottom: '20px',
          aspectRatio: '1',
          background: '#333'
        }}>
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              style={{
                background: 'white',
                border: 'none',
                fontSize: '3rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: cell === 'X' ? '#e74c3c' : '#3498db',
                transition: 'all 0.2s'
              }}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Botones */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center'
        }}>
          <button
            onClick={resetGame}
            style={{
              background: '#3498db',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Nuevo Juego
          </button>
          <button
            onClick={resetScores}
            style={{
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Reset Puntuación
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleTicTacToe;