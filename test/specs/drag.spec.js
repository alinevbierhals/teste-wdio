import dragPage from '../pageobjects/drag.page.js';

describe('Funcionalidade: Tela de Drag and Drop', () => {
    beforeEach(async () => {
        await dragPage.abrirMenuDrag();
    });

    afterEach(async () => {
        await browser.relaunchActiveApp();
    });

    it('Deve remover a peça da bandeja ao soltá-la na zona correta', async () => {
        await dragPage.arrastarPecaParaZona('r1', 'r1');

        expect(await dragPage.peca('r1').isDisplayed()).toBe(false);
    });

    it('Deve exibir a mensagem de parabéns ao completar o quebra-cabeça', async () => {
        await dragPage.completarQuebraCabeca();

        await expect(dragPage.mensagemParabens).toBeDisplayed();
    });
});
