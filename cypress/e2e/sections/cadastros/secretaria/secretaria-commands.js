
Cypress.Commands.add('secretariaCadastro', () => {
  describe('CADASTRO DE SECRETARIA', () => {
    describe('PREENCHENDO: Guias do formulário', () => {
      it('GUIA: Identificação', () => {
        cy.get('razaoSocial').clear().type('Secretaria de Educação de Teste')
      })
    })
  })
})