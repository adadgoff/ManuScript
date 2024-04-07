# Заметки по бэкенд части проекта

## Правила программистского клуба

1. Использовать `snake_case`; все названия БД тоже; только классы в Python CamelCase
2. Все комментарии, запросы, ответы, исключения в коде на английском языке;
3. Названия классов в единственном числе, несмотря на название папок и файлов во множественном числе;
4. В роутерах (контроллерах) и схемах названия связаны с запросами, а в сервисах и репозиториях названия связаны
   с `CRUD`;
5. Схемы лучше объявлять явно, без наследования и даже с дублированием кода. Читабельность и масштабируемость такого кода сильно улучшается;
6. Не упоминать о программистском клубе...

## Виртуальное окружение

```
python -m venv venv
.\venv\Scripts\activate
```

# Заметки по коду

`results.mappings().all()`

# Использованные команды

```
pip install "fastapi[all]"
pip install sqlalchemy
pip install alembic
pip install asyncpg`
pip install "pydantic-settings"
pip install passlib python-jose
pip install bcrypt

pip freeze > requirements.txt
pip install -r requirements.txt

pip install easyocr

alembic init migrations
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
alembic downgrade -1
```

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
DB_NAME=ManuScriptDB
DB_USER=postgres
DB_PASS=postgres

ACCESS_TOKEN_EXPIRE_DAYS=30
ALGORITHM=HS256
SECRET_KEY=e9Tm9zvNIUeNvF71i5faISdxA9t25HXPSPy36wK702E=
```

# ManuScript CrossPlatform
Система для автоматизации проверки рукописных работ

# Docker
```
docker-compose up -d
```

# Заметки
```
Разные люди по-разному обозначают вещи.
У меня: 
- не ORM, а model;
- не response_model, а schema;
```

# Пример контроллера
```
@router.get(
    path="/{user_uuid}",
    response_model=SUserInfo,  # default response pydantic model.
    status_code=status.HTTP_200_OK,  # default status code.
    summary="Get user information.",
    description="Get user information by uuid. If user with user_uuid does not exist, raise UserNotFoundException.",
    tags=["Student"],
    responses={
        status.HTTP_200_OK: {
            "model": SUserInfo,
            "description": "User found.",
        },
        UserNotFoundException.status_code: {
            "model": None,
            "description": UserNotFoundException.detail,
        }
    }
)
```

# Задачи
- [ ] Проверить удаление зависимых элементов;
- [ ] Подключить версионирование;
- [ ] Накатить тесты;
- [ ] Переименовать `datetime` с постфиксом `_at`;
- [ ] Пересмотреть работу "абстрактного" BaseService. Возможно, убрать?
- [ ] Пересмотреть работу access и прав, может быть, сделать декоратор?
- [ ] Не могу в ручках использовать поля у объекта Depends().
- [ ] что лучше schema или просто `"/id"`?
- [ ] В чем разница между `.mappings()` и `.scalars()`?
- [ ] Можно ли как-то упростить работу репозиториев и сервисов?
- [ ] Декомпозировать `main` в `app` и `routers`;
