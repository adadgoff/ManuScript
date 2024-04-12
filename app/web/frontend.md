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
bootstrap                                   # Стили.
npm install --save @tinymce/tinymce-react   # Текстовый редактор.
axios                                   # HTTP-запросы.
```

# Задачи

- [ ] Переделать `Error` и `About`;
- [ ] Разобраться с `{ replace: true }`;
- [ ] Сделать `default_classroom_icon.png`;

- [ ] `Login`/`Register` с `<Form.Control.Feedback/>`
- [ ] Dialog/modal окна для подтвеждения действий;
- [ ] Надпись: "В классе нет модулей";
- [ ] Надпись: "В модуле нет уроков";
- [ ] Надпись: "В уроке нет шагов";
- [ ] Смотреть ответы учениково;
- [ ] Добавлять учеников;
- [ ] Закрыть доступ к незалогиненным пользователям к содержанию;
- [ ] Сделать страницу `about`;
- [ ] Сделать страницу `author` для знакомства с автором;
- [ ] Сделать страницу `help` если что-то сломалось можно мне написать типа;
- [ ] Разобраться с контекстом с `updatedClassroom` и `setUpdatedClassroom`;
- [ ] Сделать `Accordion` для `Module`;
- [ ] Modal: Вы уверены, что хотите отменить изменения?