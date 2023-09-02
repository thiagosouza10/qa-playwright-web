const { test, expect } = require('@playwright/test')


test.describe('Cadastro de entregas Buger Eats', async () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Deve cadastrar entregador para o método de entrega Moto', async ({ page }) => {

    await test.step('acessa tela de cadastro', async () => {
      await expect(page.locator('main > h1')).toContainText('Seja um parceiro entregador pela Buger Eats')
      await page.locator('a > strong').click()
      await expect(page.locator('form > h1')).toContainText('Cadastre-se para')
    })

    await test.step('preenche os dados do usuário', async () => {
      await page.locator('input[placeholder="Nome completo"]').type('Thiago de Souza')
      await page.locator('input[placeholder="CPF somente números"]').type('31054155544')
      await page.locator('input[placeholder="E-mail"]').type('thiago.souza@entregas.com.br')
      await page.locator('input[name="whatsapp"]').type('11971712020')
    })

    await test.step('preenche endereço do usuário', async () => {
      await page.locator('input[placeholder="CEP"]').type('09110160')
      await page.locator('input[value="Buscar CEP"]').click()
      await expect(page.locator('input[name="address"]')).toHaveAttribute('value', 'Rua Cristóvão Colombo')
      await page.locator('input[placeholder="Número"]').type('100')
      await page.locator('input[placeholder="Complemento"]').type('Apartamento 10')
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