# teste-wdio

![CI](https://github.com/alinevbierhals/teste-wdio/actions/workflows/ci.yml/badge.svg)

Suíte de testes automatizados de UI para um aplicativo Android, usando **WebdriverIO** + **Appium**. Projeto criado para praticar automação de testes mobile com Page Object Model (POM).

## Tecnologias utilizadas

- [WebdriverIO](https://webdriver.io/) v9 — framework de automação
- [Appium](https://appium.io/) — driver de automação mobile
- [Mocha](https://mochajs.org/) — framework de testes (BDD)
- `appium-uiautomator2-driver` — automação nativa Android

## Estrutura do projeto

```
├── app/                        # APK do app sob teste (não versionado)
├── test/
│   ├── pageobjects/            # Page Objects (seletores + ações da tela)
│   │   ├── login.page.js
│   │   ├── form.page.js
│   │   ├── swipe.page.js
│   │   └── drag.page.js
│   └── specs/                  # Casos de teste
│       ├── login.spec.js
│       ├── form.spec.js
│       ├── swipe.spec.js
│       └── drag.spec.js
└── wdio.conf.js                # Configuração do WebdriverIO/Appium
```

O projeto segue o padrão **Page Object Model**: cada tela do app tem uma classe própria com seus seletores e métodos, e os arquivos de spec só descrevem o comportamento esperado, sem lidar com seletores diretamente.

## Funcionalidades testadas

**Login** ([login.spec.js](test/specs/login.spec.js))
- Login com sucesso
- Login com e-mail inválido
- Login com senha inválida

**Formulário** ([form.spec.js](test/specs/form.spec.js))
- Preenchimento de campo de texto
- Seleção de opção em dropdown
- Alternância de switch (on/off)

**Swipe** ([swipe.spec.js](test/specs/swipe.spec.js))
- Troca de cartão ao arrastar horizontalmente (gestos com W3C Actions)
- Revelação de mensagem escondida ao arrastar verticalmente

**Drag and Drop** ([drag.spec.js](test/specs/drag.spec.js))
- Remoção da peça da bandeja ao soltá-la na zona correta
- Conclusão do quebra-cabeça (9 peças) com exibição da mensagem de parabéns

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [Appium](https://appium.io/) instalado globalmente ou via `@wdio/appium-service` (já incluso nas dependências)
- [Android SDK](https://developer.android.com/studio) com `adb` configurado no PATH
- Um emulador Android disponível (o projeto está configurado para um dispositivo chamado `Medium Phone`, Android 17.0 — ajuste em [wdio.conf.js](wdio.conf.js) conforme seu ambiente)
- O APK do app de teste em `app/android.wdio.native.app.v2.2.0.apk` (usa-se o [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app))

## Instalação

```bash
npm install
```

## Como rodar os testes

Com o emulador Android já aberto e o Appium configurado, rode a suíte completa:

```bash
npm test
```

Ou rode um arquivo de spec específico:

```bash
npx wdio run ./wdio.conf.js --spec ./test/specs/login.spec.js
npx wdio run ./wdio.conf.js --spec ./test/specs/form.spec.js
npx wdio run ./wdio.conf.js --spec ./test/specs/swipe.spec.js
npx wdio run ./wdio.conf.js --spec ./test/specs/drag.spec.js
```

Para rodar a análise de lint (ESLint):

```bash
npm run lint
```

## Relatório de testes (Allure)

Os testes geram dados de execução automaticamente (pasta `allure-results/`, não versionada) graças ao [`@wdio/allure-reporter`](https://webdriver.io/docs/allure-reporter). Depois de rodar a suíte, gere e abra o relatório visual:

```bash
npm run allure:report
```

Isso abre um dashboard no navegador com o resultado de cada teste, linha do tempo de execução, gráficos de aprovação/falha e histórico de passos. Requer [Java](https://www.java.com/) instalado (usado pelo Allure Commandline).

Só gerar o relatório (sem abrir automaticamente): `npm run allure:generate`. Só abrir um relatório já gerado: `npm run allure:open`.

## Integração contínua

O workflow em [.github/workflows/ci.yml](.github/workflows/ci.yml) roda o lint automaticamente a cada push/PR para a `main`. Os testes E2E (Appium) não rodam em CI — eles dependem de um emulador Android real, o que exigiria uma configuração significativamente mais complexa (veja a seção de limitações abaixo).

## Limitações conhecidas

Automação mobile com Appium + UiAutomator2 é naturalmente mais suscetível a instabilidade do que testes web, especialmente rodando em emulador (em vez de dispositivo físico) numa máquina com poucos recursos livres. Durante o desenvolvimento deste projeto, foram observados:

- **Crashes ocasionais do processo de instrumentação do UiAutomator2**, principalmente ao rodar múltiplos spec files em sequência ou após relançar o app repetidamente. Mitigado com `specFileRetries: 1` em [wdio.conf.js](wdio.conf.js), que reexecuta automaticamente um spec file que falhe por instabilidade do ambiente.
- **Gestos de swipe/drag são sensíveis a duração e distância do toque.** Diferentes componentes (carrossel, scroll, drag and drop) exigem calibrações distintas — por exemplo, o carrossel da tela de Swipe só troca de cartão se o arrasto cobrir mais de 50% da largura da tela, e o Drag and Drop precisa de uma pequena pausa entre tocar e mover para o app reconhecer o gesto como um arrasto.

Se a suíte apresentar falhas intermitentes, geralmente resolve reiniciar o emulador e o servidor Appium antes de rodar novamente.

## Autora

Aline Bierhals
