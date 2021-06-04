//subit o servidor no supertest
//criar variavel de ambiente para rodar o teste no bd de teste

const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const truncate = require("./truncate");

describe("STUDENTS", () => {
  afterAll(() => {
    connection.close();
  })

  it("é possivel criar um novo estudante", async () => {
    const response = await request(app).post("/students").send({
      name: "O Daniel vapo vapo",
      email: "danielvapovapo1aaaaaaa0@gmail.com",
      password: "123456",
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("student");
  });

  it("não é possivel cadastrar um aluno com email já existente", async () => {

    let response = await request(app).post("/students").send({
      name: "O Daniel vapo",
      email: "danielvapovapo1000@gmail.com",
      password: "123456",
    });

    response = await request(app).post("/students").send({
        name: "O Daniel vapo",
        email: "danielvapovapo1000@gmail.com",
        password: "123456",
    });

    expect(response.ok).toBeFalsy();
    expect(response.body).toHaveProperty("error");
  });
});
