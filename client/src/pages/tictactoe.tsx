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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
            TicTacToe
          </h1>
          <p className="text-xl text-gray-700 font-medium">Construido con React.js ⚛️</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-center justify-center">
          
          {/* Juego principal */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg">
            
            {/* Estado del juego */}
            <div className="text-center mb-4 lg:mb-6">
              {winner ? (
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent animate-bounce">
                  ¡Jugador {winner} ganó! 🎉
                </div>
              ) : isDraw ? (
                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  ¡Empate! 🤝
                </div>
              ) : (
                <div className="text-lg sm:text-xl font-semibold text-gray-800">
                  <div className="mb-2">Turno del Jugador:</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-white font-bold text-lg ${
                    isXNext 
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25" 
                      : "bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25"
                  }`}>
                    {isXNext ? "X" : "O"}
                  </span>
                </div>
              )}
            </div>

            {/* Tablero */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto mb-4 lg:mb-6">
              {board.map((cell, index) => (
                <button
                  key={index}
                  className={`text-3xl sm:text-4xl lg:text-5xl font-bold rounded-lg lg:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed shadow-md ${
                    cell 
                      ? 'bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200' 
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-purple-50 border-2 border-gray-200 hover:border-indigo-300 active:border-indigo-400'
                  }`}
                  onClick={() => handleClick(index)}
                  disabled={winner || isDraw || cell}
                >
                  {cell === "X" && (
                    <span className="bg-gradient-to-br from-blue-500 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
                      ✕
                    </span>
                  )}
                  {cell === "O" && (
                    <span className="bg-gradient-to-br from-red-500 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
                      ○
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Botón reiniciar */}
            <div className="text-center">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                🔄 Reiniciar Juego
              </button>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="w-full xl:w-80 space-y-4 lg:space-y-6">
            
            {/* Puntuación */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                🏆 Puntuación
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg sm:rounded-xl border-l-4 border-blue-500 shadow-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm sm:text-base">✕</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">Jugador X</span>
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-br from-blue-500 to-cyan-600 bg-clip-text text-transparent">{scores.X}</span>
                </div>
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg sm:rounded-xl border-l-4 border-red-500 shadow-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm sm:text-base">○</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">Jugador O</span>
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-br from-red-500 to-pink-600 bg-clip-text text-transparent">{scores.O}</span>
                </div>
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg sm:rounded-xl border-l-4 border-yellow-500 shadow-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs sm:text-sm">🤝</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">Empates</span>
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-br from-yellow-500 to-orange-500 bg-clip-text text-transparent">{scores.draws}</span>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow-lg p-4 sm:p-6 border border-indigo-200">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                🎮 Cómo Jugar
              </h3>
              <div className="text-gray-700 space-y-2 sm:space-y-3 text-sm sm:text-base">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">1</span>
                  <p>Haz clic en una casilla vacía para marcarla</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">2</span>
                  <p>Consigue 3 en línea para ganar</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">3</span>
                  <p>Puede ser horizontal, vertical o diagonal</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">✕</span>
                  <p><strong>¡El jugador X siempre empieza!</strong></p>
                </div>
              </div>
            </div>

            {/* Conceptos React */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent mb-3 sm:mb-4">
                ⚛️ Conceptos React
              </h3>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-r-lg">
                  <div className="font-bold text-blue-700">useState</div>
                  <div className="text-blue-600">State para el tablero y jugador actual</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-r-lg">
                  <div className="font-bold text-green-700">Event Handlers</div>
                  <div className="text-green-600">onClick para manejar clics</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-r-lg">
                  <div className="font-bold text-purple-700">Conditional Rendering</div>
                  <div className="text-purple-600">Mostrar ganador o turno actual</div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-r-lg">
                  <div className="font-bold text-red-700">Array Methods</div>
                  <div className="text-red-600">map() para renderizar casillas</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 shadow-sm">
            <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🚀 TicTacToe - Proyecto educativo con React.js
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Creado siguiendo el flujo de desarrollo estructurado • Listo para GitHub
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;