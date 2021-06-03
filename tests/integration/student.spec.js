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

  beforeEach(async (done) => {
    await truncate(connection.models);
    done();
  })

  it("é possivel criar um novo estudante", async () => {
    const response = await request(app).post("/students").send({
      name: "O Daniel vapo vapo",
      email: "danielvapovapo10@gmail.com",
      password: "123456",
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("id");
  });

  it("não é possivel cadastrar um aluno com email já existente", async () => {

    let response = await request(app).post("/students").send({
      name: "O Daniel vapo",
      email: "danielvapovapo100@gmail.com",
      password: "123456",
    });

    response = await request(app).post("/students").send({
        name: "O Daniel vapo",
        email: "danielvapovapo100@gmail.com",
        password: "123456",
    });

    expect(response.ok).toBeFalsy();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Email já cadastrado no sistema");
  });
});
