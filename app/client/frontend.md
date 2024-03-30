# Заметки по фронтенд части проекта

# Структура проекта

```
assets - картинки по умолчанию
components - компоненты
lib - утилиты
locales - языки
screens - 
services - сервисы (контексты, найстройки)
```

## Установка и запуск react-native приложения

```
npx create-expo-app AwesomeProject

npm install -g expo-cli
npx expo start
```

## Установка необходимых библиотек

```
npm install -g yarn
yarn add styled-components

npm i --save-dev @types/react

npm install axios
npm install @react-navigation/native
npm install @react-navigation/native-stack

npx expo install react-native-screens react-native-safe-area-context
npx expo install expo-secure-store
```

## Мультиязычность

```
npm install i18next --save
```

## APK (Android Package Kit)

```
npm install -g eas-cli
eas build -p android --profile preview
```

### IPA (iOS App Store Package)

```

```
