Projeto IESB - Plataforma de Cursos 📚
Um aplicativo móvel desenvolvido em React Native com Expo, focado em ser uma plataforma para visualização e busca de cursos. O projeto utiliza Firebase para gerenciar a autenticação de usuários e o banco de dados de cursos em tempo real, com uma interface rica em animações e funcionalidades modernas.

📋 Índice
Funcionalidades
Tecnologias e Principais Dependências
Estrutura do Projeto
Pré-requisitos
Como Rodar o Projeto
Autor
✨ Funcionalidades
🔐 Autenticação Completa: Sistema de Login e Cadastro de usuários integrado com Firebase Authentication.
▶️ Navegação Inteligente:
Uso de Stack Navigation para o fluxo principal de telas.
Uso de Drawer Navigation para um menu lateral de fácil acesso.
Rotas protegidas que separam o conteúdo visível para usuários logados e não logados.
📚 Gestão de Cursos: Listagem, filtragem por categorias e visualização detalhada de cursos.
👤 Perfil de Usuário: Tela dedicada para informações do usuário.
🖼️ Upload de Imagem: Permite ao usuário escolher uma imagem da galeria (expo-image-picker), provavelmente para customização do perfil.
✨ Animações e Efeitos Visuais: Uso de bibliotecas como react-native-animatable e lottie-react para uma interface mais fluida e agradável.
📱 Suporte Multiplataforma: Scripts configurados para rodar em Android, iOS e Web.
💻 Tecnologias e Principais Dependências
Este projeto foi construído com as seguintes tecnologias e bibliotecas:

Core:

React Native v0.79.2: Framework principal para o desenvolvimento.
Expo SDK ~53: Plataforma para facilitar o desenvolvimento, build e deploy.
Firebase v11.8.1: Backend como serviço para autenticação e banco de dados.
Navegação:

React Navigation (@react-navigation/*): Ecossistema completo para o gerenciamento de rotas, incluindo native-stack e drawer.
UI e Animação:

React Native Reanimated: Biblioteca poderosa para animações fluidas.
React Native Animatable: Animações declarativas e fáceis de usar.
Lottie: Renderização de animações do After Effects.
Expo Linear Gradient: Criação de gradientes para o background.
Expo Vector Icons: Pacote de ícones amplamente utilizado.
Utilitários:

Async Storage: Armazenamento local e persistente no dispositivo (ex: para salvar o token da sessão).
Expo Image Picker: Acesso à galeria e câmera do dispositivo.
📂 Estrutura do Projeto
O código-fonte está organizado na pasta src/, seguindo uma arquitetura clara e modular:

/src
├── /components     # Componentes reutilizáveis (Ex: Cards, Cabeçalhos)
├── /hooks          # Hooks customizados (Ex: useAuth, useCursos)
├── /navigation     # Configuração das rotas e navegação do app
├── /screens        # Telas principais do aplicativo
├── /services       # Lógica de negócio e comunicação com APIs (Firebase)
└── firebaseConfig.js # Arquivo de configuração do Firebase
⚙️ Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:

Node.js (versão LTS recomendada)
NPM ou Yarn
O aplicativo Expo Go no seu celular (Android ou iOS) para testar o projeto.
▶️ Como Rodar o Projeto
Clone o repositório:

Bash

git clone <URL_DO_SEU_REPOSITORIO>
Acesse a pasta do projeto:

Bash

cd projeto-iesb
Instale as dependências:

Bash

npm install
Configure o Firebase:

Crie o arquivo src/firebaseConfig.js (se não existir).
Insira as suas credenciais do Firebase, que podem ser encontradas no console do seu projeto na plataforma Firebase.
<!-- end list -->

JavaScript

// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
5.  Execute o projeto:

  * Para iniciar o Metro Bundler e testar no celular com o app **Expo Go**:
    ```bash
    npm start
    ```
  * Para tentar abrir diretamente no emulador Android:
    ```bash
    npm run android
    ```
  * Para tentar abrir diretamente no simulador iOS (apenas em macOS):
    ```bash
    npm run ios
    ```
  * Para rodar a versão web:
    ```bash
    npm run web
    ```

 Criado por Rodrigo Araujo 

 Matricula: 2324291028