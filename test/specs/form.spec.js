import formPage from '../pageobjects/form.page.js';

describe('Funcionalidade: Tela de Formulário', () => {
    beforeEach(async () => {
        await formPage.abrirMenuForm();
    });

    it('Deve validar se o texto foi preenchido corretamente', async () => {
        await formPage.preencherTexto('Teste de preenchimento')
        await formPage.validarResultado('Teste de preenchimento');
    });

    it('Validar a ação do dropdown', async () => {
        await formPage.selecionarOpcaoDropdown('Appium is awesome');
        expect(await formPage.validarOpcaoDropdown()).toEqual('Appium is awesome');
    });

    it('Deve validar o botão switch de on para off', async () => {
        const botaoOnOff = () => driver.$('android=new UiSelector().className("android.widget.Switch")');

        await botaoOnOff().click();
        await driver.pause(1000);
        await expect(botaoOnOff()).toHaveAttribute('checked', 'true');

        await browser.swipe({
            direction: 'left',
            duration: 5000,
            percent: 0.5,
            scrollableElement: botaoOnOff(),
        })
        await driver.pause(1000);
        await expect(botaoOnOff()).toHaveAttribute('checked', 'false');
    });

});
