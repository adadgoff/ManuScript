# ManuScript CrossPlatform
Система для автоматизации проверки рукописных работ

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
- [ ] Проверить удаление зависимых элементов;
- [ ] Подключить версионирование;
- [ ] Накатить тесты;
- [ ] Переименовать `datetime` с постфиксом `_at`;