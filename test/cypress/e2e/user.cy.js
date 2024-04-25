import { faker } from '@faker-js/faker';

describe('Teste do modulo de usuários da API', () => {

    // Validando modulo de criacao de usuarios

    it('Deve criar um novo usuário', () =>{
        cy.createUser().then((res) =>{
            expect(res.status).to.be.equal(201);
            expect(res.body.msg).to.be.equal("User created successfully");
        });
    });

    it('Deve apresentar mensagem de erro ao tentar criar um usuário com cpf já existente', () =>{
        cy.request({
            method: 'POST',
            url: '/user/register',
            body: {
                name: faker.person.firstName(),
                cpf: "001",
                password: faker.internet.password(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(409);
            expect(res.body.msg).to.be.equal("User already exists");
        })
    });

    it('Deve apresentar mensagem de erro ao tentar criar um usuário com email já existente', () =>{
        cy.request({
            method: 'POST',
            url: '/user/register',
            body: {
                name: faker.person.firstName(),
                cpf: faker.number.int(),
                password: faker.internet.password(),
                email: "teste",
                phone: faker.phone.number()
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(409);
            expect(res.body.msg).to.be.equal("User already exists");
        })
    });

    it('Deve apresentar mensagem de erro ao tentar criar um usuário com telefone já existente', () =>{
        cy.request({
            method: 'POST',
            url: '/user/register',
            body: {
                name: faker.person.firstName(),
                cpf: faker.number.int(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                phone: "123"
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(409);
            expect(res.body.msg).to.be.equal("User already exists");
        })
    });

        // Validando Json esquema para cadastro de usuario

        it('Deve validar o schema de cadastro de usuário', () => {
            const schema = {
                title: "User Schema",
                type: 'object',
                required: ['name', 'cpf', 'password', 'email', 'phone'],
                properties: {
                    name: { type: 'string' },
                    cpf: { type: 'string' },
                    password: { type: 'string' },
                    email: { type: 'string' },
                    phone: { type: 'string' }
                },
            };
            cy.request({
                method: 'POST',
                url: 'user/register/',
                body: {
                    name: faker.person.firstName(),
                    cpf: faker.number.int(),
                    password: faker.internet.password(),
                    email: faker.internet.email(),
                    phone: faker.phone.number()
                }
            }).then((res) => {
                expect(res.body.response).to.be.jsonSchema(schema);
            });
        });


    // Validando modulo de listagem de usuarios

    it('Deve listar todos os usuarios', () => {
        cy.request({
            method: 'GET',
            url: '/user'
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.users).to.be.an('array');
        });
    });

    it('Deve listar um usuario especifico', () => {
        cy.request({
            method: 'GET',
            url: '/user/661e9aef5b4df67f8710af82'
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.user).to.be.an('object');
        });
    });

    // Validando modulo de update de usuarios

    it('Deve atualizar um usuario', () => {
        cy.request({
            method: 'PUT',
            url: 'user/66282df08cebdf588bc298fe',
            body: {
                name: "Teste Atualizar",
                cpf: faker.number.int(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            }
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.msg).to.be.equal("User updated successfully");
        });
    });

    // Validando user schema para update de usuario
    it('Deve validar o schema de update de usuário', () => {
        const schema = {
            title: "User Schema",
            type: 'object',
            required: ['name', 'cpf', 'password', 'email', 'phone'],
            properties: {
                name: { type: 'string' },
                cpf: { type: 'string' },
                password: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' }
            },
        };
        cy.request({
            method: 'PUT',
            url: 'user/66282df08cebdf588bc298fe',
            body: {
                name: "Teste Atualizar",
                cpf: faker.number.int(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            }
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.userUpdate).to.be.jsonSchema(schema);
        });
    });

    it('Deve apresentar mensagem de erro ao tentar atualizar um usuário inexistente', () =>{
        cy.request({
            method: 'PUT',
            url: 'user/16282df08cebdf588bc298fe',
            body: {
                name: faker.person.firstName(),
                cpf: faker.number.int(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(404);
            expect(res.body.msg).to.be.equal("User not found");
        });
    });

    it('Deve apresentar mensagem de erro ao tentar atualizar um usuario com um cpf já existente', () => {
        cy.request({
            method: 'PUT',
            url: 'user/661e9aef5b4df67f8710af82',
            body: {
                name: faker.person.firstName(),
                cpf: "100",
                password: faker.internet.password(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(409);
            expect(res.body.msg).to.be.equal("CPF, email or phone number already exists");
        });
    });

    it('Deve apresentar mensagem de erro ao tentar atualizar um usuario com um email já existente', () => {
        cy.request({
            method: 'PUT',
            url: 'user/661e9aef5b4df67f8710af82',
            body: {
                name: faker.person.firstName(),
                cpf: faker.number.int(),
                password: faker.internet.password(),
                email: "10",
                phone: faker.phone.number()
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(409);
            expect(res.body.msg).to.be.equal("CPF, email or phone number already exists");
        });
    });

    it('Deve apresentar mensagem de erro ao tentar atualizar um usuario com um telefone já existente', () => {
        cy.request({
            method: 'PUT',
            url: 'user/661e9aef5b4df67f8710af82',
            body: {
                name: faker.person.firstName(),
                cpf: faker.number.int(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                phone: "12345"
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(409);
            expect(res.body.msg).to.be.equal("CPF, email or phone number already exists");
        });
    });

    // Validando modulo de deletar usuario

    it('Deve deletar um usuario', () => {
        cy.request({
            method: 'DELETE',
            url: 'user/66290e424297d83b25fba2ce',

        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.msg).to.be.equal("User deleted successfully");
        });
    });

    it('Deve apresentar mensagem de erro ao tentar deletar um usuario inexistente', () =>{
        cy.request({
            method: 'DELETE',
            url: 'user/16290e424297d83b25fba2ce',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(404);
            expect(res.body.msg).to.be.equal("User not found");
        });
    });

    // Validando modulo de login
    it('Deve fazer login de um usuario', () => {
        cy.login("teste@01.com", "12345").then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body.msg).to.be.equal("Login successfully");
            expect(res.body).to.an('object');
        });
    });

    it('Deve apresentar mensagem de erro ao tentar fazer login com credenciais incorretas', () =>{
        cy.login("teste@01.com", "123").then((res) => {
            expect(res.status).to.be.equal(401);
            expect(res.body.msg).to.be.equal("Invalid password");
        });
    });

    it.only('Deve apresentar mensagem de erro ao tentar fazer login de um usuario inexistente', () =>{
        cy.login("testeinvalido@", "123").then((res) => {
            expect(res.status).to.be.equal(404);
            expect(res.body.msg).to.be.equal("User not found");
        });
    });
});