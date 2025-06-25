// back/src/utils/testeGeo.js
const axios = require('axios');

async function buscarCoordenadas(cep, logradouro, numero) {
  try {
    const endereco = `${logradouro}, ${numero}, ${cep}, Brasil`;
    console.log("Endereço consultado:", endereco);

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'projetoAplicado2025' }
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('Endereço não encontrado');
    }

    const { lat, lon } = response.data[0];
    return { lat: parseFloat(lat), lng: parseFloat(lon) };
  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error.response?.data || error.message);
    return null;
  }
}

(async () => {
  const resultado = await buscarCoordenadas("01310-100", "Avenida Paulista", "1000");
  console.log("Resultado das coordenadas:", resultado);
})();
