import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';  // Default import for app

describe('Auth API Tests', () => {

    describe('GET /healthz', () => {
        it('should return OK', (done) => {
            request(app)
                .get('/healthz')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('status').eql('OK');
                    done();
                });
        });
    });

    describe('POST /signup', () => {
        it('should create a new user', (done) => {
            request(app)
                .post('/signup')
                .send({
                    name: 'Test User',
                    email: 'testuser@example.com',
                    password: 'testpassword'
                })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('message').eql('User created successfully');
                    done();
                });
        });

        it('should return error when user already exists', (done) => {
            request(app)
                .post('/signup')
                .send({
                    name: 'Test User',
                    email: 'testuser@example.com',
                    password: 'testpassword'
                })
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error').eql('User already exists');
                    done();
                });
        });
    });

    describe('POST /signin', () => {
        it('should login an existing user', (done) => {
            request(app)
                .post('/signin')
                .send({
                    email: 'testuser@example.com',
                    password: 'testpassword'
                })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('message').eql('Signin successful');
                    expect(res.body).to.have.property('token');
                    done();
                });
        });

        it('should return error when password is incorrect', (done) => {
            request(app)
                .post('/signin')
                .send({
                    email: 'testuser@example.com',
                    password: 'wrongpassword'
                })
                .expect(401)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error').eql('Invalid password');
                    done();
                });
        });

        it('should return error when user does not exist', (done) => {
            request(app)
                .post('/signin')
                .send({
                    email: 'nonexistentuser@example.com',
                    password: 'testpassword'
                })
                .expect(401)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('error').eql('User not found');
                    done();
                });
        });
    });
});
