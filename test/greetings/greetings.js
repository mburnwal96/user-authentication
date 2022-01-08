const expect = require("chai").expect
const request = require("supertest")
const greetings = require('../../controllers/greetings/greetings')
const app = require('../../app')

describe("greetings test", function(){
    describe("greetings normal function test", function(){
        it("greetings test",function(){
            expect(greetings.greetings()).to.be.a('string')
        })
    })
    describe("greetings API function test", function(){
        it("greetings test", async function(){
            request(app).get('/greetings').then((req, res)=>{
                expect(res.statusCode).equal(200)
                expect(res.text).equal('Greetings From Node')
            })
        })
    })
})
