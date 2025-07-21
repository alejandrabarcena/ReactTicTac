import { useState } from "react";

const TicTacToe = () => {
  // Estado del tablero (9 casillas vacías)
  const [board, setBoard] = useState(Array(9).fill(null));
  // Jugador actual (X empieza)
  const [isXNext, setIsXNext] = useState(true);
  // Puntuación
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Función para detectar ganador
  const checkWinner = (squares: (string | null)[]) => {
    console.log("Checking winner for:", squares);
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
      [0, 4, 8], [2, 4, 6] // diagonales
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log("Winner found:", squares[a]);
        return squares[a];
      }
    }
    return null;
  };

  // Función para manejar clic en casilla
  const handleClick = (index: number) => {
    console.log("Cell clicked:", index);
    console.log("Current player:", isXNext ? "X" : "O");
    
    // Si ya hay ganador o la casilla está ocupada, no hacer nada
    if (checkWinner(board) || board[index]) {
      console.log("Move not allowed");
      return;
    }

    // Crear nuevo tablero con la jugada
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    
    console.log("New board:", newBoard);
    
    setBoard(newBoard);
    
    // Verificar si hay ganador
    const winner = checkWinner(newBoard);
    if (winner) {
      console.log("Game won by:", winner);
      setScores(prev => ({ ...prev, [winner]: prev[winner as keyof typeof prev] + 1 }));
    } else if (newBoard.every(cell => cell)) {
      console.log("Game is a draw");
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
    
    // Cambiar turno
    setIsXNext(!isXNext);
  };

  // Función para reiniciar juego
  const resetGame = () => {
    console.log("Game reset");
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = checkWinner(board);
  const isDraw = !winner && board.every(cell => cell);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">TicTacToe</h1>
          <p className="text-xl text-gray-600">Construido con React.js</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          
          {/* Juego principal */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            
            {/* Estado del juego */}
            <div className="text-center mb-6">
              {winner ? (
                <div className="text-2xl font-bold text-green-600">
                  ¡Jugador {winner} ganó! 🎉
                </div>
              ) : isDraw ? (
                <div className="text-2xl font-bold text-gray-600">
                  ¡Empate! 🤝
                </div>
              ) : (
                <div className="text-xl font-semibold text-gray-700">
                  Turno del Jugador: <span className="text-blue-600">{isXNext ? "X" : "O"}</span>
                </div>
              )}
            </div>

            {/* Tablero */}
            <div className="grid grid-cols-3 gap-2 w-80 h-80 mx-auto mb-6">
              {board.map((cell, index) => (
                <button
                  key={index}
                  className="bg-gray-100 hover:bg-gray-200 text-4xl font-bold rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                  onClick={() => handleClick(index)}
                  disabled={winner || isDraw || cell}
                >
                  <span className={cell === "X" ? "text-blue-600" : "text-red-500"}>
                    {cell}
                  </span>
                </button>
              ))}
            </div>

            {/* Botón reiniciar */}
            <div className="text-center">
              <button
                onClick={resetGame}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                🔄 Reiniciar Juego
              </button>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            
            {/* Puntuación */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Puntuación</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Jugador X</span>
                  <span className="text-2xl font-bold text-blue-600">{scores.X}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="font-medium">Jugador O</span>
                  <span className="text-2xl font-bold text-red-500">{scores.O}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Empates</span>
                  <span className="text-2xl font-bold text-gray-600">{scores.draws}</span>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Cómo Jugar</h3>
              <div className="text-gray-600 space-y-2">
                <p>• Haz clic en una casilla vacía para marcarla</p>
                <p>• Consigue 3 en línea para ganar</p>
                <p>• Puede ser horizontal, vertical o diagonal</p>
                <p>• ¡El jugador X siempre empieza!</p>
              </div>
            </div>

            {/* Conceptos React */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Conceptos React</h3>
              <div className="space-y-3 text-sm">
                <div className="border-l-4 border-blue-500 pl-3">
                  <div className="font-semibold">useState</div>
                  <div className="text-gray-600">State para el tablero y jugador actual</div>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                  <div className="font-semibold">Event Handlers</div>
                  <div className="text-gray-600">onClick para manejar clics</div>
                </div>
                <div className="border-l-4 border-purple-500 pl-3">
                  <div className="font-semibold">Conditional Rendering</div>
                  <div className="text-gray-600">Mostrar ganador o turno actual</div>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <div className="font-semibold">Array Methods</div>
                  <div className="text-gray-600">map() para renderizar casillas</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>TicTacToe - Proyecto educativo con React.js</p>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;