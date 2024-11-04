import React, { useState } from 'react';
import './style.css';

interface LateralProps {
  setForecastChiller: React.Dispatch<React.SetStateAction<any[]>>;
}

const Lateral: React.FC<LateralProps> = ({ setForecastChiller }) => {
  const [chiller, setChiller] = useState('');
  const [valor, setValor] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para o loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o loading ao enviar

    const data = {
      ur_temp_saida: parseFloat(valor),
      chiller: parseInt(chiller, 10)
    };

    try {
      const response = await fetch('https://02-prediction-bms-fastapi.fly.dev/forecast/chiller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro na solicitação');
      }

      const result = await response.json();
      setForecastChiller(result);
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    } finally {
      setIsLoading(false); // Desativa o loading após a resposta
    }
  };

  return (
    <aside className="sidebar">
      <h1>Parâmetros de entrada</h1>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="chiller">Selecionar Chiller:</label>
        <select
          id="chiller"
          name="chiller"
          value={chiller}
          onChange={(e) => setChiller(e.target.value)}
          required
        >
          <option value="" disabled>Escolha uma opção</option>
          <option value="1">Chiller 1</option>
          <option value="2">Chiller 2</option>
        </select>

        <label htmlFor="valor">Setpoint chiller (°C):</label>
        <input
          type="number"
          id="valor"
          name="valor"
          step="0.5"
          placeholder="Defina o setpoint"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>Enviar</button>
        {isLoading && <div className="loading"></div>} {/* Elemento de loading */}
      </form>
    </aside>
  );
};

export default Lateral;
