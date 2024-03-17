# ManuScript CrossPlatform
������� ��� ������������� �������� ���������� �����

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

# �������
```
������ ���� ��-������� ���������� ����.
� ����: 
- �� ORM, � model;
- �� response_model, � schema;
```

# ������ �����������
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

# ������
- [ ] ��������� �������� ��������� ���������;
- [ ] ���������� ���������������;
- [ ] �������� �����;
- [ ] ������������� `datetime` � ���������� `_at`;