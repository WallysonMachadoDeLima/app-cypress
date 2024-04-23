import invalido from '../fixtures/invalido'
import credencial from '../fixtures/credencial'

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
      cy.get('#Username').clear().type(credencial.cpf)
      cy.get('#Password').clear().type(credencial.senha)
      cy.wait(500)
      cy.get('body > div.content > div.login-section > div > div.login-card > div.login-card-content > div.login-form > form > button').click()
      cy.wait(500)
      cy.get('body > div.relative.flex.min-h-screen.flex-col > div.flex-1 > div > div > main > div.flex.flex-row > div > div > span').should('contain', 'Bem-vindo(a)!')
    })
  })
})