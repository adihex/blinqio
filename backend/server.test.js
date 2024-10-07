const mongoose = require("mongoose");
const request = require('supertest');
const app = require('./index'); // Import the app

describe('User API', () => {
    beforeAll(async () => {
        // Optionally, you could set up a test user here or reset the database
    });

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'newuser',
                password: 'newpasala',
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
        return response.body.token; // Return token for subsequent requests
    });

    it('should retrieve tasks for logged-in user', async () => {
        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'testpass',
            });

        const token = loginResponse.body.token;

        // Assume you have created a couple of tasks for this user
        const taskResponse = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`); // Include the token in the request

        expect(taskResponse.statusCode).toBe(200);
        expect(Array.isArray(taskResponse.body)).toBe(true); // Ensure it's an array
        // Additional assertions can be made based on your task schema
    });

    // Add more tests for other routes as needed
});

// Close MongoDB connection after tests
afterAll(async () => {
    await mongoose.connection.close(); // Close the MongoDB connection after tests
});

