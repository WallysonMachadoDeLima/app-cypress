import { nameLogs } from '../../../utils/name-logs'

Cypress.Commands.add('secretariaCadastro', () => {
  cy.log(nameLogs('preencher', 'Guias do formulário'))
  cy.log('GUIA: Identificação')
  //cy.get('\\:r34\\:-form-item').clear().type('Secretaria de Educação de Teste')
  })