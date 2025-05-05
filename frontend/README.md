# Final Project
## Programação para Web e Desenvolvimento de Software para a Nuvem

### Frontend application React + Vite + Bootstrap + NGINX

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) [![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev/) [![Vite](https://img.shields.io/badge/Vite-5.0-yellow?logo=vite)](https://vitejs.dev/) [![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)](https://getbootstrap.com/) [![NGINX](https://img.shields.io/badge/NGINX-1.25-green?logo=nginx)](https://nginx.org/) [![Docker](https://img.shields.io/badge/Docker-24.0-blue?logo=docker)](https://www.docker.com/) [![Version](https://img.shields.io/badge/Version-1.0-lightgrey)](https://semver.org/)


1. Clone este repositório em sua máquina usando o seguinte comando:
```bash
git clone git@github.com:StorThiago/dsa-frontend.git
```


2. Entre no repositório clonado
```bash
cd dsa-frontend/
```


3. Crie a network caso não exista
```bash
docker network create --driver bridge dsa-network
```


4. No diretório raiz do projeto, execute o seguinte comando para instalar as dependências:
```bash
docker-compose up -d --build
```


5. A aplicação está ouvindo em:
http://localhost



## Folder struture

```bash
dsa-frontend/
├── nginx/
│   ├── nginx.conf
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── styles.css
│   │   ├── images/
│   │   ├── js/
│   │   ├── scss/
│   │   │   ├── custom.scss
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Footer.module.css
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Perfil.jsx
│   ├── App.js
│   ├── index.html
│   ├── main.jsx
├── docker-compose.yml
├── Dockerfile
├── LICENSE
├── package.json
├── vite.config.js
```


## Documentation

[React](https://react.dev/reference/react)

[Vite](https://vite.dev/guide/)

[Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

[Nginx](https://nginx.org/)

[Docker](https://docs.docker.com/)


## Autores

- [@StorThiago](https://www.github.com/StorThiago)
- [@joaomatosiscte](https://www.github.com/joaomatosiscte)
