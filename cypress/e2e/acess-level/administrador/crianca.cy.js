import {agendamento} from '../../fixtures/agendamento'

describe('Cadastro de Criança', () => {
  describe('Cadastrando criança através do "Calendário de Agendamento" apartir do agendamento realizado', () => {
    it('Estando na página "Calendário de agendamentos"', () => {
      cy.wait(500)
      cy.visit('/dashboard/agendamento/calendario-agendamentos')
      cy.wait(500)
      cy.get('body > div.relative.flex.min-h-screen.flex-col > div.flex-1 > div > div > main > div.flex.flex-row > div > div > span').should('contain', 'Calendário de Agendamentos')
    })

    it('Buscando pelo agendamento realizado', () => {
      cy.log(agendamento.municipio)
      cy.wait(2000)
      cy.get('#radix-\\:re\\:').click()
      cy.wait(1000)
      cy.get('#\\:r17\\:-form-item').click()
      cy.wait(1000)
      cy.get('#\\:r1e\\:').type(agendamento.localAtendimento)
    })
  })
})