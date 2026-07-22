# teste-wdio

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
│   │   └── form.page.js
│   └── specs/                  # Casos de teste
│       ├── login.spec.js
│       └── form.spec.js
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
```

## Autora

Aline Bierhals
