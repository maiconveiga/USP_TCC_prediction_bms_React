import React, { useState } from 'react';
import Lateral from './components/lateral';
import Conteudo from './components/conteudo';
import './style.css';

function App() {
  const [forecastChiller, setForecastChiller] = useState([]);

  return (
    <div className="container">
      <Lateral setForecastChiller={setForecastChiller} />
      {forecastChiller.length > 0 && <Conteudo forecastChiller={forecastChiller} />}
    </div>
  );
}

export default App;
