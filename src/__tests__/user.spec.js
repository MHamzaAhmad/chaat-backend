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
