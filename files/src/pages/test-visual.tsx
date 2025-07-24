import React from "react";

const TestVisual = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, red, yellow, green, blue)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3rem',
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      <div>
        <h1>CAMBIOS FUNCIONANDO ✅</h1>
        <p>Si ves este mensaje, los cambios se están aplicando correctamente</p>
        <div style={{
          background: 'white',
          color: 'black',
          padding: '20px',
          borderRadius: '10px',
          marginTop: '20px'
        }}>
          Hora actual: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default TestVisual;