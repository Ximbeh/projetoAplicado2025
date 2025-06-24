async function buscarCoordenadas(cep, logradouro, numero) {
  try {
    const endereco = `${logradouro}, ${numero}, ${cep}, Brasil`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`;

    console.log('Consultando geocodificação para:', endereco);

    const response = await axios.get(url, {
      headers: { 'User-Agent': 'projetoAplicado2025' }
    });

    if (response.data.length === 0 || !response.data[0]?.lat || !response.data[0]?.lon) {
      throw new Error('Endereço não encontrado ou coordenadas ausentes');
    }

    const { lat, lon } = response.data[0];

    console.log(`Coordenadas encontradas: (${lat}, ${lon})`);

    return {
      lat: parseFloat(lat),
      lng: parseFloat(lon)
    };
  } catch (error) {
    console.error('Erro ao buscar coordenadas para endereço:', logradouro, numero, cep);
    console.error('Detalhes:', error.response?.data || error.message);
    return null;
  }
}
