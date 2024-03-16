# ManuScript CrossPlatform
������� ��� ������������� �������� ���������� �����

# ��������� �������
```
https://github.com/zhanymkanov/fastapi-best-practices/issues/4
```
```
|-- docs                        # ��������� ��������� �������;
|-- src                         # �������� ��� �������:
|   |-- app                     # 
|   |   |-- auth                # ��������������/����������� �������������;
|   |   |-- core                # �������/������, �� ������� ������� ������ �������;
|   |   |-- db                  # ������ � ����� ������ (������, ��������� ������);
|   |   |-- extensions          # ���������� (�������, ����, �����������);
|   |   |-- modules             # ������-������ ��� ����������;
|   |   |-- requirements        #
|   |   |-- services            # ������� �������;
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

# ������ `modules`
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