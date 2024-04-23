let invalido = {
    cpf: '11111111111',
    cpf2: '22222222222',
    senha: 'abcd1234',
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

  export default invalido