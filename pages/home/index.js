const { expect } = require('@playwright/test')
import { el } from './elements' 

class HomePage {
    
    async acessarTelaDeCadastro(page) {
        await expect(page.locator(el.textoHome)).toContainText('Seja um parceiro entregador pela Buger Eats')
        await page.locator(el.btnCadastrar).click()
    }
}

export default new HomePage