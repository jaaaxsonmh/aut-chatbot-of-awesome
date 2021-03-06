'use strict';

const assert = require('chai').assert;
const jsonEqual = require('chai').chaiJsonEqual;
const chai = require('chai');
const expect = chai.expect;
const to = require('chai').to;
chai.use(require('chai-http'));
const end = require('chai').end;
const should = require('chai').should;
const have = require('chai').have;
const dataController = require('../../../API/Controllers/dataController');
const getRandomInt  = require('../../../API/Controllers/getRandomInt')
const index = require('../../../index');

/**
 * Tests if the unit tests actually works
 * @author Alvin Tang
 */
describe('Unit Test Test', function() {
    it('It should return helloWorld to test if the unit tests actually works', function() {
        assert.equal(dataController.helloWorld(),"hello world");
    });
}) ;

/**
 * Tests if the random number generator works
 * @author Thom Bilton
 */
describe('Random number test', function () {
    it('should retun a number between 0 and the value input, inclusive', function () {
        getRandomInt
        expect(getRandomInt.getRandomInt(10)).to.be.within(0,10);
    });
})

/**
 * Tests if the .to.equal chai function works
 * @author Alvin Tang
 */
describe('A=A', function() {
    it('A should equal A', function() {
        expect("A").to.equal("A");
    })
})

/**
 * Tests if the getPaper function works
 * @author Thom Bilton
 */
describe('getPaper', function () {

    var fs = require('fs');
    var request = JSON.parse(fs.readFileSync('./test/API/Controllers/getPaperTest.json'));

    var response = JSON.parse(fs.readFileSync('./test/API/Controllers/getPaperResponse.json'));

    it('It should return the correct JSON file if unit test works',function (done) {
        this.timeout(10000);
        chai.request("http://localhost:8000")
        .post('/')
        // .set('content-type', 'application/x-www-form-urlencoded')
        .send(request)
        .end(function (err, res) {

            expect(res.body).to.deep.equal(response);

            done();
        });

    });

});

/**
 * Tests if the failed paper function works
 * @author Alvin Tang
 */
describe('failedPaper', function () {

    var fs = require('fs');
    var request = JSON.parse(fs.readFileSync('./test/API/Controllers/failedPaperTest.json'));

    var response = JSON.parse(fs.readFileSync('./test/API/Controllers/failedPaperResponse.json'));

    it('It should return the correct JSON response file.',function (done) {
        this.timeout(10000);
        chai.request("http://localhost:8000")
        .post('/')
        .send(request)
        .end(function (err, res) {

            expect(res.body).to.deep.equal(response);

            done();
        });

    });

});


/**
 * Tests if the jobs major function works
 * @author Thom Bilton
 */
describe('majorsJob', function () {

    var fs = require('fs');
    var request = JSON.parse(fs.readFileSync('./test/API/Controllers/testJobs.json'));

    var response = JSON.parse(fs.readFileSync('./test/API/Controllers/testJobsResponse.json'));

    it('It should return the correct JSON response file.',function (done) {
        this.timeout(10000);
        chai.request("http://localhost:8000")
            .post('/')
            .send(request)
            .end(function (err, res) {

                expect(res.body).to.deep.equal(response);

                done();
            });

    });

})

/**
 * Tests if the database connection suceeds
 * @author Alvin Tang
 */
describe('Database Connection', function () {
    it('The database should connect successfully', function () {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://ping:ping@ds117070.mlab.com:17070/chatbot";
        MongoClient.connect(url, function (err, db) {
            assert.equal(err, null);
            db.close();
        });
    })
})
