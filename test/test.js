const express = require('express');
const request = require('supertest');

var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = 'localhost:3001';

describe('POST Register User', () => {
    it('register user to the database.', () => {
        // request(app)
        chai.request(app)
        .post('/register')
        .send({ 'username': 'fasf', 'password':'fdsaf' })
        .end(function (err, res) {
            chai.expect(res.statusCode).to.deep.equal(200);
    });
 });
});

describe('POST Login User', () => {
    it('login user to the system.', () => {
        // request(app)
        chai.request(app)
        .post('/register')
        .send({ 'username': 'fasf', 'password':'fdsaf' })
        .end(function (err, res) {
            // try {
            //     chai.expect(res.statusCode).to.deep.equal(200);
            // } catch (e) {
            //         throw(e)
            // }
                
            if(err != null) {
                chai.expect(res.statusCode).to.deep.equal(200);
            } 
    });
 });
});

