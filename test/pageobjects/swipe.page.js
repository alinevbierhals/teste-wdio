class SwipePage {

    // Seletores

    get menuSwipe() { return $('~Swipe') };
    get containerSwipe() { return $('android=new UiSelector().resourceId("Carousel")') };

    get textoCartaoSeguinte() {
        return $('android=new UiSelector().text("WebdriverIO has a great community that supports all members.")');
    }

    get containerVertical() { return $('~Swipe-screen') };
    get mensagemEscondida() { return $('android=new UiSelector().text("You found me!!!")') };

    // Métodos

    async abrirMenuSwipe() {
        await this.menuSwipe.click();
    }

    async arrastarHorizontal() {
        await browser.swipe({
            direction: 'left',
            duration: 5000,
            percent: 0.5,
            scrollableElement: this.containerSwipe,
        });
    }

    async arrastarVertical() {
        const container = this.containerVertical;
        const { x, y } = await container.getLocation();
        const { width, height } = await container.getSize();

        const xCentro = x + width / 2;
        const yInicio = y + height * 0.9;
        const yFim = y + height * 0.3;

        await driver.action('pointer')
            .move({ duration: 0, x: xCentro, y: yInicio })
            .down({ button: 0 })
            .move({ duration: 500, x: xCentro, y: yFim })
            .up({ button: 0 })
            .perform();
    }

    async revelarMensagemEscondida() {
        const maxTentativas = 5;

        for (let tentativa = 0; tentativa < maxTentativas; tentativa++) {
            if (await this.mensagemEscondida.isDisplayed()) {
                return;
            }
            await this.arrastarVertical();
        }
    }

}

export default new SwipePage()
