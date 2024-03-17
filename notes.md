# Заметки по бэкенд части проекта

## Правила программистского клуба
1. Использовать `snake_case`; все названия БД тоже; только классы в Python CamelCase
2. Все комментарии, запросы, ответы, исключения в коде на английском языке;
3. Названия классов в единственном числе, несмотря на название папок и файлов во множественном числе;
4. Не упоминать о программистском клубе...

## Виртуальное окружение
```
python -m venv venv
.\venv\Scripts\activate
```

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

# .env
```
DB_HOST=localhost
# TODO: change in prod.
DB_PORT=5433
DB_USER=postgres
DB_PASS=postgres
DB_NAME=ManuScriptDB
```