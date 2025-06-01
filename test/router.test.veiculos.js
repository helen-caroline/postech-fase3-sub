// router.test.veiculos.js
const request = require('supertest');
const app = require('../src/app'); // Certifique-se de que o arquivo principal do app está sendo exportado corretamente

describe('Testando rotas de veículos', () => {
  it('GET /viewer - deve retornar status 200', async () => {
    const response = await request(app).get('/viewer');
    expect(response.status).toBe(200);
    // Adicione mais validações conforme necessário, como verificar o corpo da resposta
  });

  it('GET /available - deve retornar status 200', async () => {
    const response = await request(app).get('/available');
    expect(response.status).toBe(200);
    // Adicione mais validações conforme necessário
  });

  it('GET /sold - deve retornar status 200', async () => {
    const response = await request(app).get('/sold');
    expect(response.status).toBe(200);
    // Adicione mais validações conforme necessário
  });
});