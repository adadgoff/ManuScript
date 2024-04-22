# Заметки по бэкенд части проекта

## Виртуальное окружение

```
python -m venv venv
.\venv\Scripts\activate
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

# Возможные улучшения кода

- [ ] `Role` -> `get_student / get_teacher` -> `constraint email / role`
- [ ] `.mappings()` -> `.scalars()`

- [ ] Декомпозировать `main` в `app` и `routers`;
- [ ] Закинуть всю внутрянку `router` в `Service`;