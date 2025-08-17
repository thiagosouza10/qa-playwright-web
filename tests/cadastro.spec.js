import { test } from '@playwright/test'
import HomePage from '../pages/home'
import DeliverPage from '../pages/deliver'
import Utilidades from '../utilidades/utilidades'


test.describe('Cadastro de entregas Buger Eats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await HomePage.acessarTelaDeCadastro(page)
  })

  test('Deve cadastrar entregador para o método Moto', async ({ page }) => {
    const fakerUsuario = await Utilidades.gerarDadosDoUsuario(page)
    const fakerEndereco = await Utilidades.gerarDadosEndereco(page)

    await DeliverPage.preencherDadosDoUsuario(page, {
      nomeCompleto: fakerUsuario.nomeCompleto,
      cpf: fakerUsuario.cpf,
      email: fakerUsuario.email,
      telefone: fakerUsuario.telefone
    })
    await DeliverPage.preencherDadosDoEndereco(page, {
      cep: fakerEndereco.cep,
      numero: fakerEndereco.numero,
      complemento: fakerEndereco.complemento
    })
    await DeliverPage.selecionarMetodoEntrega(page, 'Moto')
    await DeliverPage.efetuarUploadCnh(page, 'utilidades/imagem/cnh.jpg')
    await DeliverPage.efetuarCadastro(page)
  })

  test('Deve cadastrar entregador para o método Bicicleta', async ({ page }) => {
    const fakerUsuario = await Utilidades.gerarDadosDoUsuario(page)
    const fakerEndereco = await Utilidades.gerarDadosEndereco(page)

    await DeliverPage.preencherDadosDoUsuario(page, {
      nomeCompleto: fakerUsuario.nomeCompleto,
      cpf: fakerUsuario.cpf,
      email: fakerUsuario.email,
      telefone: fakerUsuario.telefone
    })
    await DeliverPage.preencherDadosDoEndereco(page, {
      cep: fakerEndereco.cep,
      numero: fakerEndereco.numero,
      complemento: fakerEndereco.complemento
    })
    await DeliverPage.selecionarMetodoEntrega(page, 'Bicicleta')
    await DeliverPage.efetuarUploadCnh(page, 'utilidades/imagem/cnh.jpg')
    await DeliverPage.efetuarCadastro(page)
  })

  test('Deve cadastrar entregador para o método Van/Carro', async ({ page }) => {
    const fakerUsuario = await Utilidades.gerarDadosDoUsuario(page)
    const fakerEndereco = await Utilidades.gerarDadosEndereco(page)

    await DeliverPage.preencherDadosDoUsuario(page, {
      nomeCompleto: fakerUsuario.nomeCompleto,
      cpf: fakerUsuario.cpf,
      email: fakerUsuario.email,
      telefone: fakerUsuario.telefone
    })
    await DeliverPage.preencherDadosDoEndereco(page, {
      cep: fakerEndereco.cep,
      numero: fakerEndereco.numero,
      complemento: fakerEndereco.complemento
    })
    await DeliverPage.selecionarMetodoEntrega(page, 'Van/Carro')
    await DeliverPage.efetuarUploadCnh(page, 'utilidades/imagem/cnh.jpg')
    await DeliverPage.efetuarCadastro(page)
  })
})