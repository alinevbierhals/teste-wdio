class LoginPage {

    // Seletores
    get menuLogin() {
        return $('~Login')
    }

    get campoEmail() {
        return $('~input-email')
    }

    get campoSenha() {
        return $('~input-password')
    }

    get botaoLogin() {
        return $('~button-LOGIN')
    }

    get mensagemSucesso() {
        return $('id=android:id/message')
    }

    get botaoOk() {
        return $('id=android:id/button1')
    }

    // Métodos

    async abrirMenu() {
        await this.menuLogin.click()
    }

    async preencherLogin(email, senha) {
        await this.campoEmail.clearValue()
        await this.campoEmail.setValue(email)
        await this.campoSenha.clearValue()
        await this.campoSenha.setValue(senha)
        await this.botaoLogin.click()
    }

    async mensagemAlerta() {
        return await this.mensagemSucesso.getText()
    }

    async fecharAlerta() {
        await this.botaoOk.click()
    }


    async mensagemErro(texto) {
        const elemento = await $(`android=new UiSelector().text("${texto}")`)
        await expect(elemento).toHaveText(texto)
    }
}

export default new LoginPage()