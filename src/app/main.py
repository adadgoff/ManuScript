import asyncio

import uvicorn
from fastapi import FastAPI

from db.utils import test_connection, create_tables

app = FastAPI(
    title="ManuScriptCrossPlatform",
)


async def work_with_db():
    await test_connection()
    await create_tables()


if __name__ == "__main__":
    asyncio.run(work_with_db())
    uvicorn.run("main:app", reload=True, host="localhost", port=8000)
