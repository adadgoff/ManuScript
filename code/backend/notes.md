# Заметки по бэкенд части проекта
- [ ] Использовать вместо requirements -> poetry;
- [ ] Разобраться с длинами строк (VARCHAR, TEXT, STRING);
- [ ] Заменить Steps.StepContentType на выбор из двух (текст / задание);

# Использованные команды
`pip install "fastapi[all]"`\
`pip install sqlalchemy`\
`pip install alembic`\
`pip install asyncpg`\
`pip install "pydantic-settings"`

`pip freeze > requirements.txt`\
`pip install -r requirements.txt`

`alembic init migrations`\
`alembic revision --autogenerate -m "Initial migration"`\
`alembic upgrade head`\
`alembic downgrade -1`

# Возможные текущие проблемы
- [ ] Ошибки с ForeignKey