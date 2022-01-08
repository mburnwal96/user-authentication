const expect = require("chai").expect
const request = require("supertest")
const app = require('../../app')

describe("Login Test", function(){
    it("Login Success Test", async function(){
        request(app)
        .post('/user/login')
        .send({
            email : "mburnwal88@gmail.com",
            password : "mukesh123"
        })
        .then((req, res)=>{
            expect(res.statusCode).equal(200)
            // expect(res.text).equal('Greetings From Node')
        })
    })
})
