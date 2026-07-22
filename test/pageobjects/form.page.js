class FormPage {

    // Seletores

    get menuForm() { return $("accessibility id:Forms") };
    get campoTexto() { return $("accessibility id:text-input") };
    get labelResultado() { return $("accessibility id:input-text-result") };
    get dropdown() { return $("-android uiautomator:new UiSelector().resourceId(\"text_input\")") };

    // Métodos

    async abrirMenuForm() {
        await this.menuForm.click()
    }

    async preencherTexto(texto) {
        await this.campoTexto.waitForDisplayed();
        await this.campoTexto.clearValue();
        await this.campoTexto.setValue(texto);
    }

    async validarResultado(texto) {
        await expect(this.labelResultado).toHaveText(texto);
    }

    async selecionarOpcaoDropdown(txtOpcao) {
        await this.dropdown.click();
        const opcao = $(`-android uiautomator:new UiSelector().text(\"${txtOpcao}\")`);
        await opcao.click();
    }

    async validarOpcaoDropdown() {
        return await this.dropdown.getText();
    }

}

export default new FormPage()

