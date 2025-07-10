# 🎵 Playlist Mixer

**A funcionalidade que faltava no Spotify**

Uma aplicação web que permite a criação automática e randomizada de playlists a partir de álbuns e playlists existentes, com controle granular sobre cada música através de pesos e parâmetros personalizáveis.

## 📋 Finalidade

O **Playlist Mixer** resolve o problema de criar playlists personalizadas de forma inteligente, permitindo que usuários:

- Combinem diferentes fontes musicais (álbuns e playlists)
- Controlem a probabilidade de cada música aparecer na playlist final
- Definam músicas obrigatórias que sempre devem estar presentes
- Controlem se músicas podem se repetir na playlist gerada
- Gerem playlists automáticas com base em critérios personalizados

## 🎯 Caso de Uso Principal

1. **Seleção**: O usuário escolhe duas fontes para geração da nova playlist
2. **Parametrização**: O usuário configura pesos e regras para cada música
3. **Geração**: A aplicação cria uma playlist randomizada respeitando os parâmetros
4. **Visualização**: O usuário visualiza a playlist gerada com estatísticas detalhadas

## ⚙️ Funcionalidades

### 🎛️ Parametrização Avançada
- **Peso (0.1 - 5.0)**: Controla a probabilidade da música aparecer
- **Obrigatório/Opcional**: Força a presença da música na playlist
- **Única/Repetida**: Permite ou impede repetições da mesma música

### 📊 Estatísticas
- Duração total da playlist
- Distribuição de músicas por fonte
- Contagem de músicas obrigatórias vs opcionais

### 🎲 Algoritmo Inteligente
- Seleção probabilística baseada em pesos
- Respeito às regras de obrigatoriedade
- Controle de repetições por música
- Embaralhamento final para variedade

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15.1.3** - Framework React com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário

## 📦 Estrutura do Projeto

\`\`\`
playlist-mixer/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página inicial
├── components/
│   ├── ui/                  # Componentes base (shadcn/ui)
│   ├── source-selector.tsx  # Seleção de fontes
│   ├── music-parametrizer.tsx # Configuração de parâmetros
│   └── playlist-generator.tsx # Geração de playlist
├── README.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
\`\`\`

## 🚀 Como Executar

Para executar o projeto localmente, siga os passos abaixo:

### Instalação

1. **Clone ou baixe o projeto**
   \`\`\`bash
   # Se usando git
   git clone https://github.com/gcarucce10/playlist-mixer.git
   cd playlist-mixer
   \`\`\`

2. **Instale as dependências**
   \`\`\`bash
   npm install --legacy-peer-deps
   # ou
   yarn install
   \`\`\`

3. **Execute o servidor de desenvolvimento**
   \`\`\`bash
   npm run dev
   # ou
   yarn dev
   \`\`\`

4. **Acesse a aplicação**
   - Abra seu navegador em: `http://localhost:3000`

## 🎵 Dados de Exemplo

A aplicação inclui 4 fontes musicais mockadas:

### Álbuns
- **Abbey Road** - The Beatles (5 músicas)
- **Dark Side of the Moon** - Pink Floyd (5 músicas)

### Playlists

- **Rock Classics** - Clássicos do rock (4 músicas)
- **Chill Vibes** - Músicas relaxantes (4 músicas)


## 📝 Requisitos Atendidos

✅ **Aplicação apenas frontend**  
✅ **Seleção de duas fontes**  
✅ **Parametrização com pesos**  
✅ **Sistema obrigatório/opcional**  
✅ **Controle única/repetida**  
✅ **Geração automática de playlist**  
✅ **Interface responsiva**  
✅ **Dados mockados como exemplo**  

