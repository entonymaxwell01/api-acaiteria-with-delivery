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

        // Validando Json esquema 

    it.only('Deve apresentar mensagem de erro ao tentar criar um usuario com campo de nome vazio', () =>{
        cy.request({
            method: 'POST',
            url: '/user/register',
            body: {
                name: "",
                cpf: faker.number.int(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(406);
            expect(res.body.msg).to.be.equal("Missing required fields");
        })
    });

    it.only('Deve apresentar mensagem de erro ao tentar criar um usuario com campo de cpf vazio', () =>{
        cy.request({
            method: 'POST',
            url: '/user/register',
            body: {
                name: faker.person.firstName(),
                cpf: "",
                password: faker.internet.password(),
                email: faker.internet.email(),
                phone: faker.phone.number()
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(406);
            expect(res.body.msg).to.be.equal("Missing required fields");
        })
    });

    it.only('Deve apresentar mensagem de erro ao tentar criar um usuario com campo de senha vazio', () =>{
        cy.request({
            method: 'POST',
            url: '/user/register',
            body: {
                name: faker.person.firstName(),
                cpf: faker.number.int(),
                password: "",
                email: faker.internet.email(),
                phone: faker.phone.number()
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(406);
            expect(res.body.msg).to.be.equal("Missing required fields");
        })
    });


    it.only('Deve apresentar mensagem de erro ao tentar criar um usuario com campo de email vazio', () =>{
        cy.request({
            method: 'POST',
            url: '/user/register',
            body: {
                name: faker.person.firstName(),
                cpf: faker.number.int(),
                password: faker.internet.password(),
                email: "",
                phone: faker.phone.number()
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(406);
            expect(res.body.msg).to.be.equal("Missing required fields");
        })
    });

    it('Deve apresentar mensagem de erro ao tentar criar um usuário com campo de telefone', () =>{
        cy.request({
            method: 'POST',
            url: '/user/register',
            body: {
                name: faker.person.firstName(),
                cpf: faker.number.int(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                phone: ""
            },
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(406);
            expect(res.body.msg).to.be.equal("Missing required fields");
        })
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
});