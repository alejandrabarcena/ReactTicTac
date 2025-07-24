#!/usr/bin/env python3
import subprocess
import os
import sys

def main():
    print("🚀 Iniciando TicTacToe...")
    
    # Cambiar al directorio correcto
    os.chdir('/home/runner/workspace')
    
    # Configurar variables de entorno
    env = os.environ.copy()
    env['NODE_ENV'] = 'development'
    
    try:
        # Ejecutar el servidor
        print("📦 Iniciando servidor Node.js...")
        process = subprocess.run(['npx', 'tsx', 'server/index.ts'], env=env, check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error al iniciar servidor: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido por el usuario")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()