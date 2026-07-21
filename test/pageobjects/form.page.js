class FormPage {
    constructor(parameters) {

    }

    //Seletores

    get MenuForm() { return $("accessibility id:Forms") };
    get CampoTexto() { return $("accessibility id:text-input") };
    get LabelResultado() { return $("accessibility id:input-text-result") };
    get Dropdown() { return $("-android uiautomator:new UiSelector().resourceId(\"text_input\")") };
    

    
    //Métodos

    async abrirMenuForm() {
        await this.MenuForm.click()
    }

    async preencherTexto(texto) {
        await this.CampoTexto.waitForDisplayed();
        await this.CampoTexto.clearValue();
        await this.CampoTexto.setValue(texto);
    }


    async validarResultado(texto) {
        await expect(this.LabelResultado).toHaveText(texto);
    }

    async selecionarOpcaoDropdown(txtOpcao) {
        await this.Dropdown.click();
        const opcao = $(`-android uiautomator:new UiSelector().text(\"${txtOpcao}\")`);
        await opcao.click();
    }

    async validarOpcaoDropdown() {
        return await this.Dropdown.getText();
    }

}

export default new FormPage()

