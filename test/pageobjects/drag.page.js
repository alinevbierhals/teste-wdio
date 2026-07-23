class DragPage {

    // Seletores

    get menuDrag() { return $('~Drag') };
    get mensagemParabens() { return $('android=new UiSelector().text("Congratulations")') };

    peca(nome) { return $(`~drag-${nome}`) };
    zona(nome) { return $(`~drop-${nome}`) };

    // Métodos

    async abrirMenuDrag() {
        await this.menuDrag.click();
    }

    async arrastarPecaParaZona(nomePeca, nomeZona) {
        const origem = this.peca(nomePeca);
        const destino = this.zona(nomeZona);

        const origemLoc = await origem.getLocation();
        const origemSize = await origem.getSize();
        const destinoLoc = await destino.getLocation();
        const destinoSize = await destino.getSize();

        const xOrigem = origemLoc.x + origemSize.width / 2;
        const yOrigem = origemLoc.y + origemSize.height / 2;
        const xDestino = destinoLoc.x + destinoSize.width / 2;
        const yDestino = destinoLoc.y + destinoSize.height / 2;

        await driver.action('pointer')
            .move({ duration: 0, x: xOrigem, y: yOrigem })
            .down({ button: 0 })
            .pause(300)
            .move({ duration: 500, x: xDestino, y: yDestino })
            .up({ button: 0 })
            .perform();
    }

    async completarQuebraCabeca() {
        const zonas = ['l1', 'c1', 'r1', 'l2', 'c2', 'r2', 'l3', 'c3', 'r3'];

        for (const nome of zonas) {
            await this.arrastarPecaParaZona(nome, nome);
        }
    }

}

export default new DragPage()
