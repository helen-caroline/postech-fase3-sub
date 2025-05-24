const axios = require('axios');

async function authenticateUser() {
    const url = 'http://localhost:8080/realms/dev/protocol/openid-connect/token';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = new URLSearchParams({
        username: 'hcssantos',
        password: '123456',
        client_id: 'api-veiculos',
        client_secret: 'suwnoeEGbvJJdzpdDrViVjKtJwdEKYsh',
        grant_type: 'password',
    });

    const response = await axios.post(url, body, { headers });

    if (response.status === 200 && response.data.access_token) {
        return response.data.access_token;
    } else {
        throw new Error('Authentication failed');
    }
}

describe('Authentication Tests', () => {
    test('Should authenticate user and return access token', async () => {
        const accessToken = await authenticateUser();

        // Verifica se o token de acesso foi retornado
        expect(accessToken).toBeDefined();
        console.log('Access Token:', accessToken);
    });
});