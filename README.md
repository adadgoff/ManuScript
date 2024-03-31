# ManuScriptCrossPlatform

# ��������� �������
```
��������� �������� ��������� ������� ����� ����� �����:
https://github.com/zhanymkanov/fastapi-best-practices/issues/4

�������� ������ ������:
https://github.com/zhanymkanov/fastapi-best-practices?tab=readme-ov-file#1-project-structure-consistent--predictable
```
```
|-- docs                        # ��������� ��������� �������;
|-- app                         # �������� ��� �������:
|   |-- api                     # api-�����:
|   |   |-- auth                # ��������������/����������� �������������;
|   |   |   |-- 
|   |   |-- core                # �������/������, �� ������� ������� ������ �������;
|   |   |   |-- base_repository # ������� �����-�����������, ����������� �������� � ����� ������; 
|   |   |-- db                  # ������ � ����� ������ (������, ��������� ������);
|   |   |-- extensions          # ���������� (�������, ����, �����������);
|   |   |-- modules             # ������-������ ��� ����������;
|   |   |   |-- many_to_many    # ��������������� ������ ��� ����� ������ �� ������;
|   |   |-- requirements        #
|   |   |-- services            # ������� �������;
|   |   |   |-- ml              #
|   |   |   |-- images          #
|   |   |-- users               # ������, ���������� � ��������������.
|   |   |   |-- schemas         # ����������� �� ���� ������;
|   |   |   |-- models          # ������������� � ���� ������;
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

# ������ `modules`
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
