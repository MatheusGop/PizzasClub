# PizzasClub

### Clonar repositório

Para clonar o repositório, clique no botão verde acima onde está escrito "Code" e copie o link, em seguida abra o CMD em seu computador e digite o seguinte comando:

git clone `link`

### Back-end

Para rodar o back-end, execute os seguintes comandos:

- npm install -g json-server
- json-server -H `seu ip aqui` --watch db.json
- Mudar o ip no arquivo constant.js dentro da pasta src/services

### Front-end

Para rodar o front-end, execute os seguintes comandos:
- npm install ou yarn
- npx react-native run-android ou npx react-native run-ios
