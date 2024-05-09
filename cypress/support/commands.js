import './sections/secretaria/commands'

Cypress.Commands.add('login', (username, password) => {
    cy.log('LIMPANDO: Dados de login')
    cy.clearAllCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.wait(500) 

    cy.log('ACESSANDO: Portal do Cidadão')
    cy.visit('')
    cy.wait(500) 
    cy.get('#wt-cli-accept-all-btn').click();
    cy.wait(500)
    cy.get('#dontShowAgainCheckbox').dblclick();
    cy.wait(500)
    cy.get('body > div.content > div.login-section > div > div.call-to-login').should('contain', 'Faça seu login na plataforma')

    cy.log('PREENCHENDO: Dados de login')
    cy.wait(500)
    cy.get('#Username').clear().type(username)
    cy.get('#Password').clear().type(password)
    cy.wait(500)
    cy.get('body > div.content > div.login-section > div > div.login-card > div.login-card-content > div.login-form > form > button').click()
    cy.wait(500)
    cy.get('body > div.relative.flex.min-h-screen.flex-col > div.flex-1 > div > div > main > div.flex.flex-row > div > div > span').should('contain', 'Bem-vindo(a)!')

})

