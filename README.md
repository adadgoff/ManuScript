# ManuScriptCrossPlatform

# —труктура проекта
```
ѕодробное описание структуры проекта можно найти здесь:
https://github.com/zhanymkanov/fastapi-best-practices/issues/4

ѕолезные годные советы:
https://github.com/zhanymkanov/fastapi-best-practices?tab=readme-ov-file#1-project-structure-consistent--predictable
```
```
|-- docs                        # документы курсового проекта;
|-- app                         # исходный код проекта:
|   |-- api                     # api-часть:
|   |   |-- auth                # аутентификаци€/авторизаци€ пользователей;
|   |   |   |-- 
|   |   |-- core                # функции/классы, от которых завис€т другие объекты;
|   |   |   |-- base_repository # базовый класс-репозиторий, позвол€ющий работать с базой данных; 
|   |   |-- db                  # работа с базой данных (движок, создатель сессий);
|   |   |-- extensions          # расширени€ (метрики, логи, кэширование);
|   |   |-- modules             # бизнес-логика дл€ приложени€;
|   |   |   |-- many_to_many    # вспомогательные модели дл€ св€зи многие ко многим;
|   |   |-- requirements        #
|   |   |-- services            # внешние сервисы;
|   |   |   |-- ml              #
|   |   |   |-- images          #
|   |   |-- users               # сервис, работающий с пользовател€ми.
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

# ѕример `modules`
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
