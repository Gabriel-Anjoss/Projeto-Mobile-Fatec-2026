# 🔴 AuthPokemon

Projeto mobile de autenticação com listagem de Pokémons, desenvolvido com **React Native + Expo Router**. Criado como projeto escolar para praticar autenticação, navegação e componentização multiplataforma.

---

## 📱 Telas

| Tela | Descrição |
|---|---|
| **Login** | Formulário com e-mail e senha, validação de campos e alertas de feedback |
| **Pokédex** | Lista de Pokémons com card estilizado por tipo, header e logout |

---

## 🚀 Como rodar

**Pré-requisitos:** Node.js 18+, Expo CLI

```bash
# Instalar dependências
npm install

# Rodar no Expo Go
npx expo start

# Rodar no Android
npx expo run:android

# Rodar no iOS
npx expo run:ios

# Rodar na Web
npx expo start --web
```

---

## 🗂️ Estrutura do projeto

```
AuthPokemon/
├── app/
│   ├── _layout.tsx          # Layout raiz com AuthProvider
│   ├── index.tsx            # Tela de login
│   └── pokemons.tsx         # Tela da Pokédex
│
├── components/
│   ├── alert/
│   │   ├── types.ts         # Interface AlertProps
│   │   ├── index.ts         # Seletor de plataforma
│   │   ├── index.web.tsx    # Alert para Web (Modal animado)
│   │   ├── index.android.tsx# Alert para Android (nativo)
│   │   └── index.ios.tsx    # Alert para iOS (nativo)
│   ├── Button/
│   │   └── index.tsx        # Botão reutilizável com variantes
│   ├── Input/
│   │   └── index.tsx        # Campo de texto com toggle de senha
│   └── PokemonCard/
│       └── index.tsx        # Card com cor dinâmica por tipo
│
├── context/
│   └── AuthContext.tsx      # Contexto de autenticação global
│
└── mocks/
    └── pokemons.ts          # Lista estática de Pokémons
```

---

## 🧩 Componentes

### `<Button />`

```tsx
<Button
  title="Entrar"
  onPress={handleLogin}
  variant="primary"     // "primary" | "danger"
  isLoading={false}     // mostra ActivityIndicator
  style={{ width: 120}} // sobrescreve estilo
/>
```

### `<Input />`

```tsx
<Input
  placeholder="E-mail"
  value={email}
  onChangeText={setEmail}
  secureTextEntry        // ativa botão mostrar/ocultar senha
/>
```

### `<Alert />`

Seleciona automaticamente a implementação certa por plataforma.

```tsx
<Alert
  title="Erro de login"
  message="Credenciais inválidas."
  type="error"           // "success" | "error" | "warning" | "info"
  visible={alertVisible}
  onClose={() => setAlertVisible(false)}
/>
```

### `<PokemonCard />`

```tsx
<PokemonCard
  nome="Pikachu"
  tipo="Elétrico"
  imagem={require('../assets/pikachu.gif')}
/>
```

---

## 🔐 Autenticação

Gerenciada pelo `AuthContext` com `AsyncStorage` para persistência de sessão.

```tsx
const { isLogged, login, logout, loading } = useAuth();
```

| Prop | Tipo | Descrição |
|---|---|---|
| `isLogged` | `boolean` | Se há usuário autenticado |
| `loading` | `boolean` | Carregando sessão salva |
| `login()` | `Promise<void>` | Salva sessão no AsyncStorage |
| `logout()` | `Promise<void>` | Remove sessão do AsyncStorage |

---

## 🎨 Tipos de Pokémon e cores

| Tipo | Cor |
|---|---|
| Elétrico | Amarelo `#FFD600` |
| Fogo | Laranja `#FF6B35` |
| Água | Azul `#4FC3F7` |
| Planta | Verde `#66BB6A` |
| Fantasma | Roxo `#AB47BC` |
| Normal | Cinza `#A8A8A8` |

---

## 📦 Principais dependências

| Pacote | Versão |
|---|---|
| `expo` | ~54.0.33 |
| `react-native` | 0.81.5 |
| `expo-router` | ~6.0.23 |
| `@react-native-async-storage/async-storage` | 2.2.0 |
| `react-native-reanimated` | ~4.1.1 |
| `nativewind` | ^4.2.3 |

---

## 🏫 Projeto escolar

Desenvolvido para praticar os conceitos de:

- Autenticação com Context API e AsyncStorage
- Navegação com Expo Router (file-based routing)
- Componentização e reutilização de código
- Alertas multiplataforma (Web / Android / iOS)
- Estilização com StyleSheet e tema escuro