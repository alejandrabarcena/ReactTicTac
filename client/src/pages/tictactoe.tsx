import { useState } from "react";

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
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-500 mb-3 sm:mb-4">
                🏆 Puntuación
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-3 sm:p-4 bg-blue-100 rounded-lg sm:rounded-xl border-4 border-blue-500 shadow-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm sm:text-base">✕</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">Jugador X</span>
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500">{scores.X}</span>
                </div>
                <div className="flex justify-between items-center p-3 sm:p-4 bg-red-100 rounded-lg sm:rounded-xl border-4 border-red-500 shadow-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm sm:text-base">○</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">Jugador O</span>
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500">{scores.O}</span>
                </div>
                <div className="flex justify-between items-center p-3 sm:p-4 bg-yellow-100 rounded-lg sm:rounded-xl border-4 border-yellow-500 shadow-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs sm:text-sm">🤝</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">Empates</span>
                  </div>
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-500">{scores.draws}</span>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-4 border-red-500">
              <h3 className="text-lg sm:text-xl font-bold text-blue-500 mb-3 sm:mb-4">
                🎮 Cómo Jugar
              </h3>
              <div className="text-gray-700 space-y-2 sm:space-y-3 text-sm sm:text-base">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">1</span>
                  <p>Haz clic en una casilla vacía para marcarla</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">2</span>
                  <p>Consigue 3 en línea para ganar</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">3</span>
                  <p>Puede ser horizontal, vertical o diagonal</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">✕</span>
                  <p><strong>¡El jugador X siempre empieza!</strong></p>
                </div>
              </div>
            </div>

            {/* Conceptos React */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-4 border-green-500">
              <h3 className="text-lg sm:text-xl font-bold text-red-500 mb-3 sm:mb-4">
                ⚛️ Conceptos React
              </h3>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <div className="bg-blue-50 border-4 border-blue-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-lg">
                  <div className="font-bold text-blue-700">useState</div>
                  <div className="text-blue-600">State para el tablero y jugador actual</div>
                </div>
                <div className="bg-green-50 border-4 border-green-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-lg">
                  <div className="font-bold text-green-700">Event Handlers</div>
                  <div className="text-green-600">onClick para manejar clics</div>
                </div>
                <div className="bg-red-50 border-4 border-red-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-lg">
                  <div className="font-bold text-red-700">Conditional Rendering</div>
                  <div className="text-red-600">Mostrar ganador o turno actual</div>
                </div>
                <div className="bg-yellow-50 border-4 border-yellow-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-lg">
                  <div className="font-bold text-yellow-700">Array Methods</div>
                  <div className="text-yellow-600">map() para renderizar casillas</div>
                </div>
              </div>
            </div>

            {/* Tecnologías Utilizadas */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-4 border-blue-500">
              <h3 className="text-lg sm:text-xl font-bold text-green-500 mb-3 sm:mb-4">
                🛠️ Stack Tecnológico
              </h3>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <div className="bg-blue-50 border-4 border-blue-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <img src="/attached_assets/2_1753301496354.PNG" alt="React" className="w-6 h-6" />
                    <div className="font-bold text-blue-700">React 18</div>
                  </div>
                  <div className="text-blue-600">Interfaz moderna con Hooks</div>
                </div>
                <div className="bg-green-50 border-4 border-green-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <img src="/attached_assets/1.1_1753301502920.PNG" alt="TypeScript" className="w-6 h-6" />
                    <div className="font-bold text-green-700">TypeScript</div>
                  </div>
                  <div className="text-green-600">Tipado estático y seguridad</div>
                </div>
                <div className="bg-yellow-50 border-4 border-yellow-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <img src="/attached_assets/2.2_1753301496354.PNG" alt="Vite" className="w-6 h-6" />
                    <div className="font-bold text-yellow-700">Vite</div>
                  </div>
                  <div className="text-yellow-600">Build tool ultra-rápido</div>
                </div>
                <div className="bg-red-50 border-4 border-red-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <img src="/attached_assets/3_1753301496354.png" alt="GitHub" className="w-6 h-6" />
                    <div className="font-bold text-red-700">GitHub</div>
                  </div>
                  <div className="text-red-600">Control de versiones</div>
                </div>
                <div className="bg-purple-50 border-4 border-purple-500 pl-3 sm:pl-4 py-2 sm:py-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <img src="/attached_assets/1_1753301496353.PNG" alt="Development" className="w-6 h-6" />
                    <div className="font-bold text-purple-700">Web Development</div>
                  </div>
                  <div className="text-purple-600">Audio API + Responsive Design</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg p-6 shadow-lg border-4 border-yellow-500">
            <p className="text-lg font-bold text-red-500">
              🚀 TicTacToe - Proyecto educativo con React.js
            </p>
            <p className="text-blue-500 mt-2 text-sm font-semibold">
              Juego interactivo con React.js y TypeScript
            </p>
            <div className="flex justify-center items-center mt-4 space-x-2">
              <img src="/attached_assets/patsydev_1753301584087.png" alt="Patsy The Pug Dev" className="h-8" />
              <span className="text-sm text-gray-600 font-medium">Desarrollado por Patsy The Pug Dev</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;