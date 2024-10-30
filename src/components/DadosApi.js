import React, { useEffect, useState } from 'react';

function DadosApi() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setpointChiller, setSetpointChiller] = useState(9.5);
  const [numeroChiller, setNumeroChiller] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const response = await fetch('https://02-prediction-bms-fastapi.fly.dev/forecast/chiller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ur_temp_saida: setpointChiller,
          chiller: numeroChiller
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Dados recebidos:", data);
      setDados(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setpointChiller, numeroChiller]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Previsão de chiller</h1>
      <div style={styles.inputContainer}>
        <label style={styles.label}>
          Setpoint Chiller:
          <input
            type="number"
            value={setpointChiller}
            onChange={(e) => setSetpointChiller(parseFloat(e.target.value))}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Número Chiller:
          <select
            value={numeroChiller}
            onChange={(e) => setNumeroChiller(parseInt(e.target.value, 10))}
            style={styles.select}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p style={styles.loading}>Carregando...</p>
      ) : dados.length > 0 ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableCell}>Data e Hora</th>
                <th style={styles.tableCell}>Corrente</th>
                <th style={styles.tableCell}>VAG</th>
                <th style={styles.tableCell}>Ligados</th>
                <th style={styles.tableCell}>Delta AC</th>
                <th style={styles.tableCell}>TR</th>
                <th style={styles.tableCell}>KWH</th>
                <th style={styles.tableCell}>Torre</th>
                <th style={styles.tableCell}>Temperatura</th>
                <th style={styles.tableCell}>Pressão</th>
                <th style={styles.tableCell}>Umidade</th>
                <th style={styles.tableCell}>Horário Comercial</th>
                <th style={styles.tableCell}>Fim de Semana</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item, index) => (
                <tr key={index}>
                  <td style={styles.tableCell}>{item.data_hora}</td>
                  <td style={styles.tableCell}>{item.corrente.toFixed(1)}</td>
                  <td style={styles.tableCell}>{item.vag.toFixed(1)}</td>
                  <td style={styles.tableCell}>{item.ligados.toFixed(1)}</td>
                  <td style={styles.tableCell}>{item.delta_ac.toFixed(1)}</td>
                  <td style={styles.tableCell}>{item.tr.toFixed(1)}</td>
                  <td style={styles.tableCell}>{item.kwh.toFixed(1)}</td>
                  <td style={styles.tableCell}>{item.torre.toFixed(1)}</td>
                  <td style={styles.tableCell}>{item.temperatura.toFixed(1)}</td>
                  <td style={styles.tableCell}>{item.pressao.toFixed(1)}</td>
                  <td style={styles.tableCell}>{item.umidade.toFixed(1)}</td>
                  <td style={styles.tableCell}>{item.horario_comercial ? 'Sim' : 'Não'}</td>
                  <td style={styles.tableCell}>{item.fim_de_semana ? 'Sim' : 'Não'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={styles.errorMessage}>Sem dados disponíveis</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    color: '#444',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  label: {
    fontSize: '1.1rem',
  },
  input: {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '80px',
  },
  select: {
    marginLeft: '10px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  tableContainer: {
    marginTop: '20px',
    width: '100%',
    maxWidth: '1000px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableCell: {
    padding: '8px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap', // Evita quebra de linha
    minWidth: '80px', // Ajusta a largura mínima para evitar colunas estreitas
  },
  loading: {
    fontSize: '1.2rem',
    color: '#555',
  },
  errorMessage: {
    color: '#a00',
    fontSize: '1.1rem',
  },
};

export default DadosApi;
