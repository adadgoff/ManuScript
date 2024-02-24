# Заметки по бэкенд части проекта

## Надо выполнить
- [ ] Использовать вместо requirements -> poetry;
- [ ] Разобраться с длинами строк (VARCHAR, TEXT, STRING);
- [ ] Разобраться с правильным использованием ForeignKey
- [ ] Посмотреть SQLModel, чтобы не писать schemas.py
  
## Почти выполненные
- [x] **Добавить возможность вводить верные ответы "Преподавателей". Это в Steps надо добавить поле Answer для заданий.** [Это делается через фронт, в БД просто меняется ответ]

## Выполненные

- [x] **Еще можно сделать комментарии и уведомления к курсу, но это так - дополнительно.**
- [x] **Заменить Steps.StepContentType на выбор из двух (текст / задание);**
- [x] **Использовать UserId для безопасности + возможности смены пароля;**

# Заметки по коду

`results.mappings().all()`

# Использованные команды

`pip install "fastapi[all]"`\
`pip install sqlalchemy`\
`pip install alembic`\
`pip install asyncpg`\
`pip install "pydantic-settings"`\
`pip install passlib python-jose`\
`pip install bcrypt`

`pip freeze > requirements.txt`\
`pip install -r requirements.txt`

`alembic init migrations`\
`alembic revision --autogenerate -m "Initial migration"`\
`alembic upgrade head`\
`alembic downgrade -1`

# Генерация секретного ключа

```
from secrets import token_bytes
from base64 import b64encode

print(b64encode(token_bytes(32)).decode())
```
