const app = require("../server");
const supertest = require("supertest");
test("POST /api/clients/register", async () => {
    await supertest(app).post("/api/clients/register")
        .set('Accept', 'application/json')
        .send({name: 'test_name', address: 'test_address', mobile: '012345678', user_name: 'uname', password: 'password'})
        .expect(200)
        .expect('Content-Type', /json/)
})



test("GET /api/clients/login [Invalid Credentials]", async () => {
    await supertest(app).post("/api/clients/login")
        .set('Accept', 'application/json')
        .send({user_name: 'user_name', password: 'password'})
        .expect(401)


})

test("GET /api/clients/login [Valid Credentials]", async () => {
    await supertest(app).post("/api/clients/login")
        .set('Accept', 'application/json')
        .send({user_name: 'uname', password: 'password'})
        .expect(200)

})


test("GET /api/clients", async () => {
    await supertest(app).get("/api/clients/")
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
            expect(response.body.data.length).toBe(1);
        })
})

test("POST /api/client [Invalid URL]", async () => {
    await supertest(app).get("/api/client/")
        .expect(404)
})
