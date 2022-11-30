const request = require("supertest")
const app = require("../index")

// ==================== register user ====================
describe("User registration", () => {
    // user does not exist (happy)

    test("Registration is successful",  () => {
        request(app).post("/users/registration").send({
            email:"karinxlee@gmail.com",
            username:"karinlee",
            password:"12345678"
        }).expect(response.data.success).toBe(true);
    });

    // invalid username
    test("invalid username", () => {
        let a = 1;
        let b = 1;
        // success be false
        // message should be: "Invalid username"
        expect(a + b).toBe(2);
    });
    // invalid email
    // success be false
    // message should be: "Invalid email"

    // invalid password
    // success be false
    // message should be: "Invalid password"

    // username taken
    // success be false
    // message should be: "Username is taken"

    // email taken
    // success be false
    // message should be "Email is taken"
});
