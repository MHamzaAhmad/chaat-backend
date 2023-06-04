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

  it("User should not validate", async () => {
    const res = await supertest(app).post("/api/user/").send({
      email: faker.internet.email(),
    });
    console.log(res.body.error);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});
