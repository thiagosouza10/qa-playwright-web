const { expect } = require('@playwright/test')
import { el } from './elements'

class DeliverPage {

    async preencherDadosDoUsuario(page, { nomeCompleto, cpf, email, telefone }) {
        await expect(page.locator(el.textoCadastrase)).toContainText('Cadastre-se para')
        await page.getByPlaceholder('Nome completo').type(nomeCompleto)
        await page.getByPlaceholder('CPF somente números').type(cpf)
        await page.getByPlaceholder('E-mail').type(email)
        await page.getByPlaceholder('whatsapp').type(telefone)
    }

    async preencherDadosDoEndereco(page, { cep, numero, complemento }) {
        await page.getByPlaceholder('CEP').type(cep)
        await page.locator(el.buscarCep).click()
        await page.waitForTimeout(1000)
        await page.locator(el.numero).type(numero)
        await page.getByPlaceholder('Complemento').type(complemento)
    }

    async selecionarMetodoEntrega(page, metodoEntrega) {
        switch (metodoEntrega) {
            case 'Moto':
                await page.locator(el.metodoMoto).click()
                await page.locator(el.selectMetodo).isVisible()
                break

            case 'Bicicleta':
                await page.locator(el.metodoBicicleta).click()
                await page.locator(el.selectMetodo).isVisible()
                break

            case 'Van/Carro':
                await page.locator(el.metodoVanCarro).click()
                await page.locator(el.selectMetodo).isVisible()
                break
        }
    }

    async efetuarUploadCnh(page, cnh) {
        await expect(page.locator(el.textoCnh)).toContainText('Foto da sua CNH')
        await page.locator(el.inputFiles).setInputFiles(cnh)
        await page.locator(el.imagem).isVisible()
    }

    async efetuarCadastro(page) {
        await page.locator(el.btnCadastrar).click()
        await expect(page.locator(el.textoCadastroSucesso)).toContainText('Aí Sim...')
        await page.locator(el.btnFecharPopupCadastroSucesso).click()
    }
}

export default new DeliverPage