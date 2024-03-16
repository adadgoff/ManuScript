# ManuScript CrossPlatform
Система для автоматизации проверки рукописных работ

# Структура проекта
```
Подробное описание структуры проекта можно найти здесь:
https://github.com/zhanymkanov/fastapi-best-practices/issues/4
```
```
|-- docs                        # документы курсового проекта;
|-- app                         # исходный код проекта:
|   |-- api                     # api-часть:
|   |   |-- auth                # аутентификация/авторизация пользователей;
|   |   |-- core                # функции/классы, от которых зависят другие объекты;
|   |   |-- db                  # работа с базой данных (движок, создатель сессий);
|   |   |-- extensions          # расширения (метрики, логи, кэширование);
|   |   |-- modules             # бизнес-логика для приложения;
|   |   |   |-- many_to_many    # вспомогательные модели для связи многие ко многим;
|   |   |-- requirements        #
|   |   |-- services            # внешние сервисы;
|   |   |   |-- ml              #
|   |   |   |-- images          #
|   |   |-- users               #
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

# Задачи
- [ ] Проверить удаление зависимых элементов.