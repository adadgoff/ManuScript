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

# Структура проекта
```
Подробное описание структуры проекта можно найти здесь:
https://github.com/zhanymkanov/fastapi-best-practices/issues/4

Полезные годные советы:
https://github.com/zhanymkanov/fastapi-best-practices?tab=readme-ov-file#1-project-structure-consistent--predictable
```
```
|-- docs                        # документы курсового проекта;
|-- app                         # исходный код проекта:
|   |-- api                     # api-часть:
|   |   |-- auth                # аутентификация/авторизация пользователей;
|   |   |   |-- 
|   |   |-- core                # функции/классы, от которых зависят другие объекты;
|   |   |   |-- base_repository # базовый класс-репозиторий, позволяющий работать с базой данных; 
|   |   |-- db                  # работа с базой данных (движок, создатель сессий);
|   |   |-- extensions          # расширения (метрики, логи, кэширование);
|   |   |-- modules             # бизнес-логика для приложения;
|   |   |   |-- many_to_many    # вспомогательные модели для связи многие ко многим;
|   |   |-- requirements        #
|   |   |-- services            # внешние сервисы;
|   |   |   |-- ml              #
|   |   |   |-- images          #
|   |   |-- users               # сервис, работающий с пользователями.
|   |   |   |-- schemas         # отображение из базы данных;
|   |   |   |-- models          # представление в базе данных;
|   |   |-- utils               #
|   |   |-- config.py           #
|   |   |-- main.py             #
|   |-- resources               #
|   |   |-- static              #
|   |-- scripts                 #
|   |-- tests                   #
|-- .env                    #
|-- .gitignore              #
|-- docker-composer.yml     #
|-- Dockerfile              #
|-- LICENSE                 #
|-- notes.md                #
|-- README.md               #
```

# Пример `modules`
```
|   |-- modules
|   |   |-- module_a
|   |   |   |-- routes.py
|   |   |   |-- services.py
|   |   |   |-- orm.py # the sqlalchemy classes
|   |   |   |-- models.py # "pure" modules (are also pydantic)
|   |   |   |-- schemas.py # the pydantic API schemas
|   |   |   |-- adapters.py
|   |   |   |-- builders.py
|   |   |   |-- interfaces.py
|   |   |   |-- repository.py
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
- [ ] Работать с `dto`'шками;
- [ ] Проверить удаление зависимых элементов;
- [ ] Подключить версионирование;
- [ ] Накатить тесты;
- [ ] Переименовать `datetime` с постфиксом `_at`;
