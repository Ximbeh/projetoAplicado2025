const bcrypt = require('bcryptjs');

const gerarHash = async () => {
  const senhaPura = '123456'; // você pode trocar aqui
  const hash = await bcrypt.hash(senhaPura, 10);
  console.log('Senha hash:', hash);
};

gerarHash();
