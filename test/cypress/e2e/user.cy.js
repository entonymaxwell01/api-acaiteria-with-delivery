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

    it.only('Deve apresentar mensagem de erro ao tentar atualizar um usuário inexistente', () =>{
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

});