const mongoose = require("mongoose")
const request = require('supertest');
const app = require('./index'); // Import the app

describe('User API', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'testpass',
            });
        expect(response.statusCode).toBe(201);
    });

    it('should log in a user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'testpass',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    // Add more tests for other routes as needed
});

// Close MongoDB connection after tests
afterAll(async () => {
    await mongoose.connection.close(); // Close the MongoDB connection after tests
});

