import swipePage from '../pageobjects/swipe.page.js';

describe('Funcionalidade: Tela de Swipe', () => {
    beforeEach(async () => {
        await swipePage.abrirMenuSwipe();
    });

    afterEach(async () => {
        await browser.relaunchActiveApp();
    });

    it('Deve trazer o próximo cartão para a tela ao arrastar horizontalmente', async () => {
        await swipePage.arrastarHorizontal();
        await driver.pause(1000);

        await expect(swipePage.textoCartaoSeguinte).toBeDisplayed();
    });

    it('Deve revelar a mensagem escondida ao arrastar verticalmente', async () => {
        expect(await swipePage.mensagemEscondida.isDisplayed()).toBe(false);

        await swipePage.revelarMensagemEscondida();

        await expect(swipePage.mensagemEscondida).toBeDisplayed();
    });
});
