const { expect } = require('@playwright/test')

exports.HomePage = class HomePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page
        this.textoHome = page.locator('main > h1')
        this.btnCadastrar = page.locator('a > strong')
    }

    async acessarTelaCadastro() {
        await expect(this.textoHome).toContainText('Seja um parceiro entregador pela Buger Eats')
        await this.btnCadastrar.click()
    }
}