const { test } = require('@playwright/test')
const { HomePage } = require('../utilidades/pages/home')
const { DeliverPage } = require('../utilidades/pages/deliver')
const { Utilidades } = require('../utilidades/utilidades')


test.describe('Cadastro de entregas Buger Eats', async () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    const homePage = new HomePage(page)
    await homePage.acessarTelaCadastro()
  })

  test('Deve cadastrar entregador para o método Moto', async ({ page }) => {
    const deliverPage = new DeliverPage(page)
    const utilidades = new Utilidades(page)

    const fakerUsuario = await utilidades.gerarDadosDoUsuario()
    const fakerEndereco = await utilidades.gerarDadosEndereco()

    await deliverPage.preencherDadosDoUsuario({
      nomeCompleto: fakerUsuario.nomeCompleto,
      cpf: fakerUsuario.cpf,
      email: fakerUsuario.email,
      telefone: fakerUsuario.telefone
    })
    await deliverPage.preencherDadosDoEndereco({
      cep: fakerEndereco.cep,
      numero: fakerEndereco.numero,
      complemento: fakerEndereco.complemento
    })
    await deliverPage.selecionarMetodoEntrega('Moto')
    await deliverPage.efetuarUploadCnh('utilidades/imagem/cnh.jpg')
    await deliverPage.efetuarCadastro()
  })

  test('Deve cadastrar entregador para o método Bicicleta', async ({ page }) => {
    const deliverPage = new DeliverPage(page)
    const utilidades = new Utilidades(page)

    const fakerUsuario = await utilidades.gerarDadosDoUsuario()
    const fakerEndereco = await utilidades.gerarDadosEndereco()

    await deliverPage.preencherDadosDoUsuario({
      nomeCompleto: fakerUsuario.nomeCompleto,
      cpf: fakerUsuario.cpf,
      email: fakerUsuario.email,
      telefone: fakerUsuario.telefone
    })
    await deliverPage.preencherDadosDoEndereco({
      cep: fakerEndereco.cep,
      numero: fakerEndereco.numero,
      complemento: fakerEndereco.complemento
    })
    await deliverPage.selecionarMetodoEntrega('Bicicleta')
    await deliverPage.efetuarUploadCnh('utilidades/imagem/cnh.jpg')
    await deliverPage.efetuarCadastro()
  })

  test('Deve cadastrar entregador para o método Van/Carro', async ({ page }) => {
    const deliverPage = new DeliverPage(page)
    const utilidades = new Utilidades(page)

    const fakerUsuario = await utilidades.gerarDadosDoUsuario()
    const fakerEndereco = await utilidades.gerarDadosEndereco()

    await deliverPage.preencherDadosDoUsuario({
      nomeCompleto: fakerUsuario.nomeCompleto,
      cpf: fakerUsuario.cpf,
      email: fakerUsuario.email,
      telefone: fakerUsuario.telefone
    })
    await deliverPage.preencherDadosDoEndereco({
      cep: fakerEndereco.cep,
      numero: fakerEndereco.numero,
      complemento: fakerEndereco.complemento
    })
    await deliverPage.selecionarMetodoEntrega('Van/Carro')
    await deliverPage.efetuarUploadCnh('utilidades/imagem/cnh.jpg')
    await deliverPage.efetuarCadastro()
  })
})