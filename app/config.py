from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASS: str
    DB_NAME: str

    ACCESS_TOKEN_EXPIRE_DAYS: int
    ALGORITHM: str
    SECRET_KEY: str

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    @property
    def DATABASE_POOL_SIZE(self) -> int:
        return 5

    @property
    def DATABASE_MAX_OVERFLOW(self) -> int:
        return 10

    model_config = SettingsConfigDict(env_file="../.env")


settings = Settings()
