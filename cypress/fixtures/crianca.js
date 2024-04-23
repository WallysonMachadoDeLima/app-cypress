const faker = require('faker-br');

let crianca = {
    nome: faker.name.findName(),
    cpf: faker.br.cpf({ format: true }),
    dataNascimento: new Date(
        new Date()
            .getFullYear() - 2,
    ).toLocaleDateString(
        'pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }),
}

export default crianca