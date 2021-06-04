//subit o servidor no supertest
//criar variavel de ambiente para rodar o teste no bd de teste

const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const truncate = require("./truncate");

describe("TEACHERS", () => {
  afterAll(() => {
    connection.close();
  });


  it("é possivel criar um novo professor", async () => {
    const response = await request(app).post("/teachers").send({
      name: "O Daniel vapo vapo",
      email: "danielvapovapo95aaaaaa8@gmail.com",
      password: "123456",
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("teacher");
  });

  it("não é possivel cadastrar um professor com email já existente", async () => {

    let response = await request(app).post("/teachers").send({
      name: "O Daniel vapo",
      email: "danielvapovapo1aaa00@gmail.com",
      password: "123456",
    });

    response = await request(app).post("/teachers").send({
        name: "O Daniel vapo",
        email: "danielvapovapo1aaa00@gmail.com",
        password: "123456",
    });

    expect(response.ok).toBeFalsy();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Email já cadastrado no sistema");
  });
});
