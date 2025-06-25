const axios = require('axios');
require('dotenv').config();

async function calcularTempoDistancia(origem, destino) {
  try {
    console.log('ORS - Coordenadas recebidas:', origem, destino);

    const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
    const headers = {
      Authorization: process.env.ORS_API_KEY,
      'Content-Type': 'application/json'
    };

    const body = {
      coordinates: [
        [origem.lng, origem.lat],
        [destino.lng, destino.lat]
      ]
    };

    const response = await axios.post(url, body, { headers });
    const dados = response.data.routes[0].summary;

    console.log('Resposta ORS:', dados);

    return {
      distancia_km: parseFloat((dados.distance / 1000).toFixed(2)),
      tempo_estimado: Math.ceil(dados.duration / 60)
    };
  } catch (error) {
    console.error('Erro ao consultar OpenRouteService:', error.response?.data || error.message);
    return { distancia_km: 0, tempo_estimado: 0 };
  }
}

module.exports = { calcularTempoDistancia };
