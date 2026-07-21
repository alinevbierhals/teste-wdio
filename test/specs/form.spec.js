import formPage from '../pageobjects/form.page.js';

describe('Funcionalidade: Tela de Formulário', () => {
    beforeEach(async () => {
        await formPage.abrirMenuForm();
    });

    it('Deve validar se o texto foi preenchido corretamente', async () => {
        await formPage.preencherTexto('Teste de preenchimento')
        expect(await formPage.validarResultado('Teste de preenchimento'));

    });

    it('Validar a ação do dropdown', async () => {
        await formPage.selecionarOpcaoDropdown('Appium is awesome');
        expect(await formPage.validarOpcaoDropdown());

    });

    it('Deve validar o botão switch de on para off', async () => {
        // Trocar para On
        const botaoOnOff = await driver.$("accessibility id:switch");
        await botaoOnOff.click();
        await driver.pause(1000);
        // Trocar para Off
        await browser.swipe({
            direction: 'left',                  // Swipe from right to left
            duration: 5000,                     // Last for 5 seconds
            percent: 0.5,                       // Swipe 50% of the scrollableElement
            scrollableElement: botaoOnOff,  // The element to swipe within
        })
        await driver.pause(1000);

    });

});
