const { test, expect } = require('@playwright/test')
let faker = require('faker-br')


test.describe('Cadastro de entregas Buger Eats', async () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Deve cadastrar entregador para o método Moto', async ({ page }) => {
    //Dados do usuário
    const _fakerCpf = faker.br.cpf()
    const _fakerNomeCompleto = `${faker.name.firstName()} ${faker.name.lastName()}`
    const _fakerEmail = faker.internet.email()
    // Telefone está sendo gerado dessa forma para poder mostrar array no projeto
    const _dddsValidos = ['11', '21', '31', '41', '48', '61']
    const _dddEstado = faker.random.arrayElement(_dddsValidos)
    const _numeroTelefone = faker.random.number({ min: 10000000, max: 99999999 })
    const _fakerTelefone = `(${_dddEstado})9${_numeroTelefone}`

    //Dados endereço
    const _fakerCep = faker.address.zipCodeValidByState()
    //A função match() retorna um array contendo todas as correspondências encontradas
    // e o método join('') combina todos os dígitos encontrados em uma única string, eliminando quaisquer espaços ou outros caracteres não numéricos.
    const _fakerNumero = faker.address.streetAddress().match(/\d+/g).join('')
    const _fakerComplemento = `Apto: ${faker.random.number({ min: 1, max: 300 })} Bloco: ${faker.random.number({ min: 1, max: 2 })}`

    await test.step('acessa tela de cadastro', async () => {
      await expect(page.locator('main > h1')).toContainText('Seja um parceiro entregador pela Buger Eats')
      await page.locator('a > strong').click()
      await expect(page.locator('form > h1')).toContainText('Cadastre-se para')
    })

    await test.step('preenche os dados do usuário', async () => {
      await page.locator('input[placeholder="Nome completo"]').type(_fakerNomeCompleto)
      await page.locator('input[placeholder="CPF somente números"]').type(_fakerCpf)
      await page.locator('input[placeholder="E-mail"]').type(_fakerEmail)
      await page.locator('input[name="whatsapp"]').type(_fakerTelefone)
    })

    await test.step('preenche endereço do usuário', async () => {
      await page.locator('input[placeholder="CEP"]').type(_fakerCep)
      await page.locator('input[value="Buscar CEP"]').click()
      await page.waitForTimeout(1000)
      await page.locator('input[placeholder="Número"]').type(_fakerNumero)
      await page.locator('input[placeholder="Complemento"]').type(_fakerComplemento)
    })

    await test.step('selecionar o método de entrega', async () => {
      await page.locator('li > span').first().click()
      await page.locator('li[class="selected"]').isVisible()
    })

    await test.step('upload da CNH', async () => {
      await expect(page.locator('.dropzone > p')).toContainText('Foto da sua CNH')
      await page.locator('input[type="file"]').setInputFiles('utilidades/imagem/cnh.jpg')
      await page.locator('div[class="dropzone"] img').isVisible()
    })

    await test.step('efetuar cadastro', async () => {
      await page.locator('.button-success').click()
      await expect(page.locator('#swal2-title')).toContainText('Aí Sim...')
      await page.locator('button[class="swal2-confirm swal2-styled"]').click()
      await expect(page.locator('main > h1')).toContainText('Seja um parceiro entregador pela Buger Eats')
    })
  })
})