const request = require('supertest');
const app = require('../server');

describe('Test the root path', () => {
    it('should respond with Hello, Jenkins!', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello, Jenkins!');
    });
});
