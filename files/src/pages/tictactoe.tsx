import React, { useState } from "react";

// Use direct image URLs since @assets alias has issues with .PNG extensions

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

  // Función para reproducir sonidos
  const playSound = (type: 'click' | 'win' | 'draw') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configurar sonidos diferentes
      switch (type) {
        case 'click':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
        case 'win':
          // Sonido de victoria - secuencia de notas
          const frequencies = [523, 659, 784, 1047]; // Do, Mi, Sol, Do
          frequencies.forEach((freq, i) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
            gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.2);
            osc.start(audioContext.currentTime + i * 0.15);
            osc.stop(audioContext.currentTime + i * 0.15 + 0.2);
          });
          break;
        case 'draw':
          oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
      }
    } catch (error) {
      console.log("Audio no disponible:", error);
    }
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

    // Reproducir sonido de clic
    playSound('click');

    // Crear nuevo tablero con la jugada
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    
    console.log("New board:", newBoard);
    
    setBoard(newBoard);
    
    // Verificar si hay ganador
    const winner = checkWinner(newBoard);
    if (winner) {
      console.log("Game won by:", winner);
      playSound('win');
      setScores(prev => ({ ...prev, [winner]: prev[winner as keyof typeof prev] + 1 }));
    } else if (newBoard.every(cell => cell)) {
      console.log("Game is a draw");
      playSound('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
    
    // Cambiar turno
    setIsXNext(!isXNext);
  };

  // Función para reiniciar juego
  const resetGame = () => {
    console.log("Game reset");
    
    // Sonido de reinicio
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.log("Audio no disponible:", error);
    }
    
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = checkWinner(board);
  const isDraw = !winner && board.every(cell => cell);

  return (
    <div className="min-h-screen bg-blue-500 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4 drop-shadow-lg">
            TicTacToe
          </h1>
          <p className="text-xl text-white font-bold drop-shadow-md">Construido con React.js ⚛️</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 items-center justify-center">
          
          {/* Juego principal */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg">
            
            {/* Estado del juego */}
            <div className="text-center mb-4 lg:mb-6">
              {winner ? (
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 animate-bounce bg-white rounded-lg p-3 shadow-lg">
                  ¡Jugador {winner} ganó! 🎉
                </div>
              ) : isDraw ? (
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600 bg-white rounded-lg p-3 shadow-lg">
                  ¡Empate! 🤝
                </div>
              ) : (
                <div className="text-lg sm:text-xl font-semibold text-white bg-black/20 rounded-lg p-3 backdrop-blur-sm">
                  <div className="mb-2">Turno del Jugador:</div>
                  <span className={`inline-block px-4 py-2 rounded-full text-white font-bold text-xl shadow-lg ${
                    isXNext 
                      ? "bg-blue-500 border-2 border-white" 
                      : "bg-red-500 border-2 border-white"
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
                  className={`text-3xl sm:text-4xl lg:text-5xl font-bold rounded-lg lg:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed shadow-lg ${
                    cell 
                      ? 'bg-white border-4 border-gray-300' 
                      : 'bg-white hover:bg-yellow-500 border-4 border-gray-800 hover:border-red-500'
                  }`}
                  onClick={() => handleClick(index)}
                  disabled={winner || isDraw || cell}
                >
                  {cell === "X" && (
                    <span className="text-blue-500 drop-shadow-xl font-black">
                      ✕
                    </span>
                  )}
                  {cell === "O" && (
                    <span className="text-red-500 drop-shadow-xl font-black">
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
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border-2 border-white"
              >
                🔄 Reiniciar Juego
              </button>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="w-full xl:w-80 space-y-4 lg:space-y-6">
            
            {/* Puntuación */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-4 border-yellow-500">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-green-600 mb-3 md:mb-4 text-center">
                🏆 Puntuación
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg md:rounded-xl border-3 border-blue-400 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-sm md:text-base">✕</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm md:text-base">Jugador X</span>
                  </div>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">{scores.X}</span>
                </div>
                <div className="flex justify-between items-center p-3 md:p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg md:rounded-xl border-3 border-red-400 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-sm md:text-base">○</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm md:text-base">Jugador O</span>
                  </div>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-600">{scores.O}</span>
                </div>
                <div className="flex justify-between items-center p-3 md:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg md:rounded-xl border-3 border-green-400 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-xs md:text-sm">🤝</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm md:text-base">Empates</span>
                  </div>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600">{scores.draws}</span>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 border-4 border-purple-400">
              <h3 className="text-lg md:text-xl font-bold text-purple-600 mb-3 md:mb-4 text-center">
                🎮 Cómo Jugar
              </h3>
              <div className="text-gray-700 space-y-3 md:space-y-4 text-sm md:text-base">
                <div className="flex items-start space-x-3 md:space-x-4 p-2 rounded-lg bg-blue-50 border-l-4 border-blue-400">
                  <span className="w-6 h-6 md:w-7 md:h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold flex-shrink-0 shadow-sm">1</span>
                  <p className="font-medium">Haz clic en una casilla vacía para marcarla</p>
                </div>
                <div className="flex items-start space-x-3 md:space-x-4 p-2 rounded-lg bg-green-50 border-l-4 border-green-400">
                  <span className="w-6 h-6 md:w-7 md:h-7 bg-green-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold flex-shrink-0 shadow-sm">2</span>
                  <p className="font-medium">Consigue 3 en línea para ganar</p>
                </div>
                <div className="flex items-start space-x-3 md:space-x-4 p-2 rounded-lg bg-red-50 border-l-4 border-red-400">
                  <span className="w-6 h-6 md:w-7 md:h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold flex-shrink-0 shadow-sm">3</span>
                  <p className="font-medium">Puede ser horizontal, vertical o diagonal</p>
                </div>
                <div className="flex items-start space-x-3 md:space-x-4 p-2 rounded-lg bg-yellow-50 border-l-4 border-yellow-400">
                  <span className="w-6 h-6 md:w-7 md:h-7 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold flex-shrink-0 shadow-sm">✕</span>
                  <p className="font-bold text-yellow-700">¡El jugador X siempre empieza!</p>
                </div>
              </div>
            </div>

          </div>

          {/* Panel lateral derecho */}
          <div className="lg:col-span-1 xl:col-span-1 space-y-4 md:space-y-6 order-3 lg:order-3">
            
            {/* Conceptos React */}
            <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 border-4 border-green-400">
              <h3 className="text-lg md:text-xl font-bold text-green-600 mb-3 md:mb-4 text-center">
                ⚛️ Conceptos React
              </h3>
              <div className="space-y-3 md:space-y-4 text-xs md:text-sm">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 pl-3 md:pl-4 py-3 rounded-lg shadow-sm">
                  <div className="font-bold text-blue-700 text-sm md:text-base">useState</div>
                  <div className="text-blue-600">Estado del tablero y jugador actual</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 pl-3 md:pl-4 py-3 rounded-lg shadow-sm">
                  <div className="font-bold text-green-700 text-sm md:text-base">Event Handlers</div>
                  <div className="text-green-600">onClick para manejar clics</div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 pl-3 md:pl-4 py-3 rounded-lg shadow-sm">
                  <div className="font-bold text-red-700 text-sm md:text-base">Conditional Rendering</div>
                  <div className="text-red-600">Mostrar ganador o turno actual</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 pl-3 md:pl-4 py-3 rounded-lg shadow-sm">
                  <div className="font-bold text-yellow-700 text-sm md:text-base">Array Methods</div>
                  <div className="text-yellow-600">map() para renderizar casillas</div>
                </div>
              </div>
            </div>

            {/* Tecnologías Utilizadas */}
            <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 border-4 border-indigo-400">
              <h3 className="text-lg md:text-xl font-bold text-indigo-600 mb-3 md:mb-4 text-center">
                🛠️ Stack Tecnológico
              </h3>
              <div className="space-y-3 md:space-y-4 text-xs md:text-sm">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 pl-3 md:pl-4 py-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 md:w-7 md:h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">⚛️</div>
                    <div className="font-bold text-blue-700 text-sm md:text-base">React 18</div>
                  </div>
                  <div className="text-blue-600 text-xs md:text-sm">Interfaz moderna con Hooks</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 pl-3 md:pl-4 py-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 md:w-7 md:h-7 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">TS</div>
                    <div className="font-bold text-green-700 text-sm md:text-base">TypeScript</div>
                  </div>
                  <div className="text-green-600 text-xs md:text-sm">Tipado estático y seguridad</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 pl-3 md:pl-4 py-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 md:w-7 md:h-7 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">⚡</div>
                    <div className="font-bold text-yellow-700 text-sm md:text-base">Vite</div>
                  </div>
                  <div className="text-yellow-600 text-xs md:text-sm">Build tool ultra-rápido</div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 pl-3 md:pl-4 py-3 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 md:w-7 md:h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">🎨</div>
                    <div className="font-bold text-red-700 text-sm md:text-base">Tailwind CSS</div>
                  </div>
                  <div className="text-red-600 text-xs md:text-sm">Estilos y diseño responsivo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 md:mt-12 lg:col-span-full xl:col-span-3">
          <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 md:p-6 shadow-xl border-4 border-yellow-400 max-w-2xl mx-auto">
            <p className="text-lg md:text-xl font-bold text-red-500 mb-2">
              🚀 TicTacToe - Proyecto educativo con React.js
            </p>
            <p className="text-blue-500 text-sm md:text-base font-semibold mb-4">
              Juego interactivo con React.js y TypeScript
            </p>
            <div className="flex justify-center items-center space-x-3 md:space-x-4">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">⚛️</div>
              <span className="text-xs md:text-sm text-gray-600 font-medium">Proyecto educativo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;