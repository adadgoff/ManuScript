# ManuScript CrossPlatform
Система для автоматизации проверки рукописных работ

# Структура проекта
```
https://github.com/zhanymkanov/fastapi-best-practices/issues/4
```
```
|-- docs                        # документы курсового проекта;
|-- src                         # исходный код проекта:
|   |-- app                     # 
|   |   |-- auth                # аутентификация/авторизация пользователей;
|   |   |-- core                # функции/классы, от которых зависят другие объекты;
|   |   |-- db                  # работа с базой данных (движок, создатель сессий);
|   |   |-- extensions          # расширения (метрики, логи, кэширование);
|   |   |-- modules             # бизнес-логика для приложения;
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


|   |-- .env                    #
|   |-- .gitignore              #
|   |-- docker-composer.yml     #
|   |-- Dockerfile              #
|   |-- LICENSE                 #
|   |-- notes.md                #
|   |-- README.md               #
```

# Пример `modules`
```
?   ??? modules
?   ?   ??? module_a
?   ?   ?   ??? routes.py
?   ?   ?   ??? services.py
?   ?   ?   ??? orm.py # the sqlalchemy classes
?   ?   ?   ??? models.py # "pure" modules (are also pydantic)
?   ?   ?   ??? schemas.py # the pydantic API schemas
?   ?   ?   ??? adapters.py
?   ?   ?   ??? builders.py
?   ?   ?   ??? interfaces.py
?   ?   ?   ??? repository.py
```