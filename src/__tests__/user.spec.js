import supertest from "supertest";
import app from "../app.js";
import { faker } from "@faker-js/faker";

const randomEmail = faker.internet.email();
const userName = faker.person.fullName();

describe("Sign up", () => {
  it("User should sign up", async () => {
    const res = await supertest(app).post("/api/user/").send({
      name: userName,
      email: randomEmail,
      password: "testPassword123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });

  it("User already exists", async () => {
    const res = await supertest(app).post("/api/user/").send({
      name: userName,
      email: randomEmail,
      password: "testPassword123",
    });
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("msg");
  });

  it("Email should be required", async () => {
    const res = await supertest(app).post("/api/user/").send({
      password: "testPassword123",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("msg");
  });

  it("Password should be required", async () => {
    const res = await supertest(app).post("/api/user/").send({
      email: faker.internet.email(),
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("msg");
  });
});

//tests for login

describe("Log in", () => {
  it("User should login", async () => {
    const res = await supertest(app).post("/api/user/login").send({
      email: randomEmail,
      password: "testPassword123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });

  it("Password should not validate", async () => {
    const res = await supertest(app).post("/api/user/login").send({
      email: randomEmail,
      password: "somewrongpassword",
    });
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("msg");
  });

  it("User does not exist", async () => {
    const res = await supertest(app)
      .post("/api/user/login")
      .send({
        email: randomEmail + "m",
        password: "testPassword123",
      });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("msg");
  });

  it("Email should be required", async () => {
    const res = await supertest(app).post("/api/user/login").send({
      password: "testPassword123",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("msg");
  });

  it("Password should be required", async () => {
    const res = await supertest(app).post("/api/user/login").send({
      email: randomEmail,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("msg");
  });
});

//test the get user endpoint
describe("Get user from bearer token", () => {
  it("should return the user", async () => {
    const loginRes = await supertest(app).post("/api/user/login").send({
      email: "hamza@gmail.com",
      password: "Test@123",
    });
    const res = await supertest(app)
      .get("/api/user/")
      .set("Authorization", `Bearer ${loginRes.body.accessToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("user");
  });

  it("should return unAuthorzied", async () => {
    const res = await supertest(app)
      .get("/api/user/")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      );
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("msg");
  });
});
