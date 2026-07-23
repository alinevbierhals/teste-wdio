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
        const carrossel = this.containerSwipe;
        const { x, y } = await carrossel.getLocation();
        const { width, height } = await carrossel.getSize();

        const yCentro = y + height / 2;
        const xInicio = x + width * 0.9;
        const xFim = x + width * 0.1;

        await driver.action('pointer')
            .move({ duration: 0, x: xInicio, y: yCentro })
            .down({ button: 0 })
            .move({ duration: 1000, x: xFim, y: yCentro })
            .up({ button: 0 })
            .perform();
    }

    async arrastarVertical() {
        const containerLoc = await this.containerVertical.getLocation();
        const containerSize = await this.containerVertical.getSize();
        const carrosselLoc = await this.containerSwipe.getLocation();
        const carrosselSize = await this.containerSwipe.getSize();

        const xCentro = containerLoc.x + containerSize.width / 2;
        const yInicio = carrosselLoc.y + carrosselSize.height + 40;
        const yFim = containerLoc.y + 40;

        await driver.action('pointer')
            .move({ duration: 0, x: xCentro, y: yInicio })
            .down({ button: 0 })
            .move({ duration: 500, x: xCentro, y: yFim })
            .up({ button: 0 })
            .perform();
    }

    async revelarMensagemEscondida() {
        const maxTentativas = 10;

        for (let tentativa = 0; tentativa < maxTentativas; tentativa++) {
            if (await this.mensagemEscondida.isDisplayed()) {
                return;
            }
            await this.arrastarVertical();
        }
    }

}

export default new SwipePage()
