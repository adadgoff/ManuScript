# Структура проекта

```
|-- public - статичные файлы;

|-- src - код react/frontend
|   |-- API
|   |-- context
|   |-- hooks
|   |-- pages
|   |-- router
|   |-- styles
|   |-- utils
|   |-- 

```

# Создание проекта

```
npx create-react-app client
npm start
```

# Установка необходимых библиотек

```
npm install react-router-dom            # Маршруты.
npm i i18next react-i18next --save      # Многоязычность.
bootstrap
```

# Задачи
- [ ] Переделать `Error` и `About`;
- [ ] Декомпозировать `Login.jsx` и `Register.jsx`;
- [ ] Сделать `ClassroomList.jsx` где параметры: `isTeacher/isStudent` + `название title для страницы`