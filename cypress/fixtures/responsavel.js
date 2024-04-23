const faker = require('faker-br');

let responsavel = {
    nome: faker.name.findName(),
    cpf: faker.br.cpf({ format: true }),
    telefone: faker.phone.phoneNumber('(##) #####-####'),
    email: faker.internet.email(),
    formats: faker.phone.phoneFormats('(##) #####-####'),
}

export default responsavel

const responsavel2 = { }