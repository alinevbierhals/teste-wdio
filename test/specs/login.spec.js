
import loginPage from "../pageobjects/login.page";

describe('Funcionalidade login', () => {

    beforeEach(async () => {
        await loginPage.abrirMenu()
    })

    afterEach(async () => {
        await browser.relaunchActiveApp()
    })


    it('Deve realizar login com sucesso', async () => {
        await loginPage.preencherLogin(
            'usuario@teste.com',
            'senha123')
        await expect(loginPage.mensagemSucesso).toBeDisplayed()
        expect(await loginPage.mensagemAlerta()).toEqual('You are logged in!')
      

    })

    it('Deve fazer login com e-mail inválido', async () => {
        await loginPage.preencherLogin(
            'usuario@teste',
            'senha123')
        await loginPage.mensagemErro('Please enter a valid email address')
    });

    it('Deve falhar fazer login com senha inválida', async () => {
        await loginPage.preencherLogin(
            'usuario@teste.com',
            '1234')
        await loginPage.mensagemErro("Please enter at least 8 characters")
    });
});