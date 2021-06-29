let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server');
let should = chai.should();

server.initialize();
let app = server.app;

chai.use(chaiHttp);

//positive test
describe('CalculateBmi', () => {
    describe('/POST calculateBmi', () => {
        it('should calculate BMI to all the records in the input JSON and write the results',done => {
            let inputJson = [
                {
                  "Gender": "Male",
                  "HeightCm": 969,
                  "WeightKg": 96
                },
                {
                  "Gender": "Male",
                  "HeightCm": 161,
                  "WeightKg": 85
                }]
            chai.request(app)
                .post('/getBmiResults')
                .send(inputJson)
                .end((error, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('statusCode');
                    response.body.statusCode.should.equal(200);
                    response.body.should.have.property('result');
                    done();
                })
        });

        it('should say invalid input when negative value is sent', done => {
            let invalidJson = [
                {
                  "Gender": "Male",
                  "HeightCm": 969,
                  "WeightKg": 96
                },
                {
                  "Gender": "Male",
                  "HeightCm": -46,
                  "WeightKg": 85
                }];
            chai.request(app)
                .post('/getBmiResults')
                .send(invalidJson)
                .end((error, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('statusCode');
                    response.body.statusCode.should.equal(400);
                    response.body.should.have.property('error');
                    done();
                })
        });

        it('should say invalid input when some param(s) are missing',done => {
            let missingParamJson = [
                {
                  "Gender": "Male",
                  "WeightKg": 96
                },
                {
                  "Gender": "Male",
                  "HeightCm": 161,
                  "WeightKg": 85
                }]
            chai.request(app)
                .post('/getBmiResults')
                .send(missingParamJson)
                .end((error, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('statusCode');
                    response.body.statusCode.should.equal(400);
                    response.body.should.have.property('error');
                    done();
                })
        });
    })
})
