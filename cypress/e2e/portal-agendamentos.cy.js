const faker = require('faker-br');

const verificacao = {
  proximo: 'Próximo',
  confirmar: 'Confirmar',
  campoObrigatorio: 'Campo obrigatório.',
  informeUmCPF: 'Informe um CPF.',
  informeUmCPFValido: 'Informe um CPF válido.',
  informeUmCPFDiferente: 'O CPF do responsável deve ser diferente do informado para a criança.',
  informeUmaDataPassada: 'Informe uma data passada.',
}

const invalido = {
  cpf1: '11111111111',
  cpf2: '22222222222',
  dataNascimento: new Date(
    new Date()
      .getTime() + 24 * 60 * 60 * 1000,
  ).toLocaleDateString(
    'pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }),
}

const crianca = {
  nome: faker.name.findName(),
  cpf: faker.br.cpf({format:true}),
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

const responsavel = {
  nome: faker.name.findName(),
  cpf: faker.br.cpf({format:true}),
  telefone: faker.phone.phoneNumber('(##) #####-####'),
  email: faker.internet.email(),
  formats: faker.phone.phoneFormats('(##) #####-####'),
}

let municipio = 'municipio'
let localAtendimento = 'localAtendimento'
let data = 'data'
let horario = 'horario'

describe('Cadastro de Agendamento', () => {
  describe('Acessando a página "Potal de Agendamento de Fila de Creches"', () => {
    it('Estando na página de cadastro de "Agendamento"', () => {
      cy.wait(500)
      cy.visit('https://fila-de-espera-app.dev.tcero.tc.br:8888/agendamento/agendar')
      cy.wait(500)
      cy.get('.h-24 > .flex > .text-lg').should('contain', 'Realizar Agendamento')
    })
  })

  describe('Guia "Local e horário"', () => {

    it('Extraindo o valor de "Município", "Local de atendimento", "Data" e "Horário" na guia "Local e horário"', () => {
      cy.wait(1000)
      cy.get('#\\:r7\\:-form-item > .text-start').then(($dom) => {
        municipio = $dom.text()
        cy.log($dom.text())
      })
      cy.get('#\\:rd\\:-form-item > .text-start').then(($dom) => {
        localAtendimento = $dom.text()
        cy.log($dom.text())
      })
      cy.get('[style="min-width: 100%; display: table;"] > .px-4 > :nth-child(1)').then(($dom) => {
        horario = $dom.text()
        cy.log($dom.text())
      })
    })

    it('Bloqueando passar para a próxima guia com campos não selecionados na guia "Local e horário"', () => {
      cy.wait(500)
      cy.get('button').contains(verificacao.proximo).click()
      cy.wait(500)
      cy.get('.ml-\\[5rem\\]').should('contain', verificacao.campoObrigatorio)
    })

    it('Passando para a próxima guia com todos os campos selecionados corretamente', () => {
      cy.wait(500)
      cy.get('[style="min-width: 100%; display: table;"] > .px-4 > :nth-child(1)').click()
      cy.wait(500)
      cy.get('button').contains(verificacao.proximo).click()
      cy.wait(500)
      cy.get('.h-full > .items-start > :nth-child(1)').should('contain', 'Informe os dados da criança para pré-cadastro')
    })
  })

  describe('Guia "Dados Pessoais"', () => {
    it('Bloqueando passar para a próxima guia com campos vazios na guia "Dados Pessoais"', () => {
      cy.wait(500)
      cy.get('button').contains(verificacao.proximo).click()
      cy.wait(500)
      cy.get('#\\:rg\\:-form-item-message').should('contain', verificacao.campoObrigatorio)
      cy.get('#\\:ri\\:-form-item-message').should('contain', verificacao.informeUmCPF)
      cy.get('#\\:rk\\:-form-item-message').should('contain', verificacao.campoObrigatorio)
      cy.get('#\\:rn\\:-form-item-message').should('contain', verificacao.campoObrigatorio)
      cy.get('#\\:rp\\:-form-item-message').should('contain', verificacao.informeUmCPF)
      cy.get('#\\:rr\\:-form-item-message').should('contain', verificacao.campoObrigatorio)
      cy.get('#\\:rt\\:-form-item-message').should('contain', verificacao.campoObrigatorio)
    })

    it('Bloqueando passar para a próxima guia com "CPFs" inválidos na guia "Dados Pessoais"', () => {
      cy.wait(500)
      cy.get('#\\:ri\\:-form-item').type(invalido.cpf1)
      cy.get('#\\:rp\\:-form-item').type(invalido.cpf2)
      cy.get('button').contains(verificacao.proximo).click()
      cy.wait(500)
      cy.get('#\\:ri\\:-form-item-message').should('contain', verificacao.informeUmCPFValido)
      cy.get('#\\:rp\\:-form-item-message').should('contain', verificacao.informeUmCPFValido)
    })

    it('Bloqueando passar para a próxima guia com "CPFs" repetidos para a "Criança" e o "Responsável" na guia "Dados Pessoais"', () => {
      cy.wait(500)
      cy.get('#\\:ri\\:-form-item').clear().type(invalido.cpf1)
      cy.get('#\\:rp\\:-form-item').clear().type(invalido.cpf1)
      cy.get('button').contains(verificacao.proximo).click()
      cy.wait(500)
      cy.get('#\\:rp\\:-form-item-message').should('contain', verificacao.informeUmCPFDiferente)
    })

    it('Bloqueando passar para a próxima guia com a "Data de Nascimento" maior do que a data atual na guia "Dados Pessoais"', () => {
      cy.wait(500)
      cy.get('.flex-col > .flex-row > .flex').type(invalido.dataNascimento)
      cy.wait(500)
      cy.get('button').contains(verificacao.proximo).click()
      cy.wait(500)
      cy.get('#\\:rk\\:-form-item-message').should('contain', verificacao.informeUmaDataPassada)
    })

    it('Passando para a próxima guia com todos os campos preenchidos corretamente na guia "Dados Pessoais"', () => {
      cy.wait(500)
      cy.get('#\\:rg\\:-form-item').type(crianca.nome)
      cy.get('#\\:ri\\:-form-item').clear().type(crianca.cpf)
      cy.get('.flex-col > .flex-row > .flex').clear().type(crianca.dataNascimento)
      cy.get('#\\:rn\\:-form-item').type(responsavel.nome)
      cy.get('#\\:rp\\:-form-item').clear().type(responsavel.cpf)
      console.log(responsavel.telefone)
      cy.get('#\\:rr\\:-form-item').type(responsavel.telefone)
      cy.get('#\\:rt\\:-form-item').type(responsavel.email)
      cy.get('button').contains(verificacao.proximo).click()
      cy.wait(500)
      cy.get('#radix-\\:rv\\: > div.flex.flex-col.space-y-1\\.5.text-center.sm\\:text-left > div').should('contain', 'Confirme os dados para continuar')
    })
  })
  
  describe('Guia "Confirmação"', () => {
    it('Confirmando os dados na guia "Confirmação"', () => {
      cy.wait(500)
      cy.contains(municipio).should('exist')
      cy.contains(localAtendimento).should('exist')
      // cy.contains(data).should('exist')
      cy.contains(horario).should('exist')
      cy.contains(crianca.nome).should('exist')
      cy.contains(crianca.cpf).should('exist')
      cy.contains(crianca.dataNascimento).should('exist')
      cy.contains(responsavel.nome).should('exist')
      cy.contains(responsavel.cpf).should('exist')
      cy.contains(responsavel.telefone).should('exist')
      cy.contains(responsavel.email).should('exist')
    })

    it('Confirmando o cadastro do "Agendamento"', () => {
      cy.wait(500)
      cy.get('button').contains(verificacao.confirmar).click()
      cy.get('.grid > .font-semibold').should('contain', 'Agendamento realizado com sucesso!')
    })
  })
})