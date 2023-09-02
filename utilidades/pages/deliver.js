const { expect } = require('@playwright/test')

exports.DeliverPage = class DeliverPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        this.textoCadastrase = page.locator('form > h1')
        this.buscarCep = page.locator('input[value="Buscar CEP"]')
        this.numero = page.locator('input[name="address-number"]')
        this.metodoMoto = page.locator('img[alt="Moto"]')
        this.metodoBicicleta = page.locator('img[alt="Bicicleta"]')
        this.metodoVanCarro = page.locator('img[alt="Van/Carro"]')
        this.selectMetodo = page.locator('li[class="selected"]')
        this.textoCnh = page.locator('.dropzone > p')
        this.inputFiles = page.locator('input[type="file"]')
        this.imagem = page.locator('div[class="dropzone"] img')
        this.btnCadastrar = page.locator('.button-success')
        this.textoCadastroSucesso = page.locator('#swal2-title')
        this.btnFecharPopupCadastroSucesso = page.locator('button[class="swal2-confirm swal2-styled"]')
    }

    async preencherDadosDoUsuario({ nomeCompleto, cpf, email, telefone }) {
        await expect(this.textoCadastrase).toContainText('Cadastre-se para')
        await this.page.getByPlaceholder('Nome completo').type(nomeCompleto)
        await this.page.getByPlaceholder('CPF somente números').type(cpf)
        await this.page.getByPlaceholder('E-mail').type(email)
        await this.page.getByPlaceholder('whatsapp').type(telefone)
    }

    async preencherDadosDoEndereco({ cep, numero, complemento }) {
        await this.page.getByPlaceholder('CEP').type(cep)
        await this.buscarCep.click()
        await this.page.waitForTimeout(1000)
        await this.numero.type(numero)
        await this.page.getByPlaceholder('Complemento').type(complemento)
    }

    async selecionarMetodoEntrega(metodoEntrega) {
        switch (metodoEntrega) {
            case 'Moto':
                await this.metodoMoto.click()
                await this.selectMetodo.isVisible()
                break

            case 'Bicicleta':
                await this.metodoBicicleta.click()
                await this.selectMetodo.isVisible()
                break

            case 'Van/Carro':
                await this.metodoVanCarro.click()
                await this.selectMetodo.isVisible()
                break
        }
    }

    async efetuarUploadCnh(cnh) {
        await expect(this.textoCnh).toContainText('Foto da sua CNH')
        await this.inputFiles.setInputFiles(cnh)
        await this.imagem.isVisible()
    }

    async efetuarCadastro() {
        await this.btnCadastrar.click()
        await expect(this.textoCadastroSucesso).toContainText('Aí Sim...')
        await this.btnFecharPopupCadastroSucesso.click()
    }
}