import invalido from '../fixtures/invalido'
import credencialGestorCreche from '../fixtures/credencial'
import textoVerificacao from '../fixtures/texto-verificacao'
import crianca from '../fixtures/crianca'
import responsavel from '../fixtures/responsavel'
import agendamento from '../fixtures/agendamento'

describe('Perfil Gestor de Creche', () => {
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
          agendamento.municipio = $dom.text();
          cy.log($dom.text())
        })
        cy.get('#\\:rd\\:-form-item > .text-start').then(($dom) => {
          agendamento.localAtendimento = $dom.text();
          cy.log($dom.text())
        })
        agendamento.data = 'data'
        cy.get('[style="min-width: 100%; display: table;"] > .px-4 > :nth-child(1)').then(($dom) => {
          agendamento.horario = $dom.text();
          cy.log($dom.text())
        })
      })

      it('Bloqueando passar para a próxima guia com campos não selecionados na guia "Local e horário"', () => {
        cy.wait(500)
        cy.get('button').contains(textoVerificacao.proximo).click()
        cy.wait(500)
        cy.get('.ml-\\[5rem\\]').should('contain', textoVerificacao.campoObrigatorio)
      })

      it('Passando para a próxima guia com todos os campos selecionados corretamente', () => {
        cy.wait(500)
        cy.get('[style="min-width: 100%; display: table;"] > .px-4 > :nth-child(1)').click()
        cy.wait(500)
        cy.get('button').contains(textoVerificacao.proximo).click()
        cy.wait(500)
        cy.get('.h-full > .items-start > :nth-child(1)').should('contain', 'Informe os dados da criança para pré-cadastro')
      })
    })

    describe('Guia "Dados Pessoais"', () => {
      it('Bloqueando passar para a próxima guia com campos vazios na guia "Dados Pessoais"', () => {
        cy.wait(500)
        cy.get('button').contains(textoVerificacao.proximo).click()
        cy.wait(500)
        cy.get('#\\:rg\\:-form-item-message').should('contain', textoVerificacao.campoObrigatorio)
        cy.get('#\\:ri\\:-form-item-message').should('contain', textoVerificacao.informeUmCPF)
        cy.get('#\\:rk\\:-form-item-message').should('contain', textoVerificacao.campoObrigatorio)
        cy.get('#\\:rn\\:-form-item-message').should('contain', textoVerificacao.campoObrigatorio)
        cy.get('#\\:rp\\:-form-item-message').should('contain', textoVerificacao.informeUmCPF)
        cy.get('#\\:rr\\:-form-item-message').should('contain', textoVerificacao.campoObrigatorio)
        cy.get('#\\:rt\\:-form-item-message').should('contain', textoVerificacao.campoObrigatorio)
      })

      it('Bloqueando passar para a próxima guia com "CPFs" inválidos na guia "Dados Pessoais"', () => {
        cy.wait(500)
        cy.get('#\\:ri\\:-form-item').type(invalido.cpf)
        cy.get('#\\:rp\\:-form-item').type(invalido.cpf2)
        cy.get('button').contains(textoVerificacao.proximo).click()
        cy.wait(500)
        cy.get('#\\:ri\\:-form-item-message').should('contain', textoVerificacao.informeUmCPFValido)
        cy.get('#\\:rp\\:-form-item-message').should('contain', textoVerificacao.informeUmCPFValido)
      })

      it('Bloqueando passar para a próxima guia com "CPFs" repetidos para a "Criança" e o "Responsável" na guia "Dados Pessoais"', () => {
        cy.wait(500)
        cy.get('#\\:ri\\:-form-item').clear().type(invalido.cpf)
        cy.get('#\\:rp\\:-form-item').clear().type(invalido.cpf)
        cy.get('button').contains(textoVerificacao.proximo).click()
        cy.wait(500)
        cy.get('#\\:rp\\:-form-item-message').should('contain', textoVerificacao.informeUmCPFDiferente)
      })

      it('Bloqueando passar para a próxima guia com a "Data de Nascimento" maior do que a data atual na guia "Dados Pessoais"', () => {
        cy.wait(500)
        cy.get('.flex-col > .flex-row > .flex').type(invalido.dataNascimento)
        cy.wait(500)
        cy.get('button').contains(textoVerificacao.proximo).click()
        cy.wait(500)
        cy.get('#\\:rk\\:-form-item-message').should('contain', textoVerificacao.informeUmaDataPassada)
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
        cy.get('button').contains(textoVerificacao.proximo).click()
        cy.wait(500)
        cy.get('#radix-\\:rv\\: > div.flex.flex-col.space-y-1\\.5.text-center.sm\\:text-left > div').should('contain', 'Confirme os dados para continuar')
      })
    })

    describe('Guia "Confirmação"', () => {
      it('Confirmando os dados na guia "Confirmação"', () => {
        cy.wait(500)
        cy.contains(agendamento.municipio).should('exist')
        cy.contains(agendamento.localAtendimento).should('exist')
        // cy.contains(agendamento.data).should('exist')
        cy.contains(agendamento.horario).should('exist')
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
        cy.get('button').contains(textoVerificacao.confirmar).click()
        cy.get('.grid > .font-semibold').should('contain', 'Agendamento realizado com sucesso!')
      })
    })
  })

  describe('Login', () => {
    describe('Acessando a página "Login"', () => {
      it('Estando na página de cadastro de "Login" através do "Portal do Cidadão"', () => {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()

        cy.wait(500)
        cy.visit('')
        cy.wait(500)
        cy.get('#wt-cli-accept-all-btn').click();
        cy.wait(500)
        cy.get('#dontShowAgainCheckbox').dblclick();
        cy.wait(500)
        cy.get('body > div.content > div.login-section > div > div.call-to-login').should('contain', 'Faça seu login na plataforma')
      })
    })

    describe('Fazendo Login', () => {
      it('Bloqueando login com credenciais inválidas', () => {
        cy.wait(500)
        cy.get('#Username').type(invalido.cpf)
        cy.get('#Password').type(invalido.senha)
        cy.wait(500)
        cy.get('body > div.content > div.login-section > div > div.login-card > div.login-card-content > div.login-form > form > button').click()
        cy.wait(500)
        cy.get('body > div.content > div.login-section > div > div.login-card > div.login-card-content > div.login-form > form > div.alert.alert-danger > div > ul > li').should('contain', 'Acesso inválido')
      })

      it('Realizando login com credenciais válidas', () => {
        cy.wait(500)
        cy.get('#Username').clear().type(credencialGestorCreche.cpf)
        cy.get('#Password').clear().type(credencialGestorCreche.senha)
        cy.wait(500)
        cy.get('body > div.content > div.login-section > div > div.login-card > div.login-card-content > div.login-form > form > button').click()
        cy.wait(500)
        cy.get('body > div.relative.flex.min-h-screen.flex-col > div.flex-1 > div > div > main > div.flex.flex-row > div > div > span').should('contain', 'Bem-vindo(a)!')
      })
    })
  })

  describe('Cadastro de Criança', () => {
    describe('Cadastrando criança através do "Calendário de Agendamento" apartir do agendamento realizado', () => {
      it('Estando na página "Calendário de agendamentos"', () => {
        cy.wait(500)
        cy.visit('/dashboard/agendamento/calendario-agendamentos')
        cy.wait(500)
        cy.get('body > div.relative.flex.min-h-screen.flex-col > div.flex-1 > div > div > main > div.flex.flex-row > div > div > span').should('contain', 'Calendário de Agendamentos')
      })

      it('Buscando pelo agendamento realizado', () => {
        cy.wait(500)
        cy.log(agendamento.municipio)
        cy.wait(500)
        cy.get('#radix-\\:rh\\: > div').click()
        cy.wait(500)
        cy.get('#\\:rr\\:-form-item > span').click()
        cy.wait(500)
        cy.get('#\\:rv\\:').type(agendamento.localAtendimento)
        cy.wait(500)
        cy.get('#radix-\\:rs\\: > div > div.overflow-hidden.p-1.text-foreground.\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2.\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs.\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium.\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-muted-foreground > div > div > div > div > div').click()
        cy.wait(500)
        cy.contains(crianca.nome).should('exist')
      })

      it('Cadastrando criança apartir do agendamento realizado', () => {
        cy.wait(500)
        cy.reload()
        cy.wait(2000)
        cy.contains('.grid-cols-10 .col-span-8', crianca.nome).siblings('.col-span-2').click()
        cy.wait(5000)
        cy.contains('button', 'Iniciar Atendimento').click();
      })
    })
  })
})