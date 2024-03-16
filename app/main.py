import asyncio

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.db.test import init_db
from app.api.services.images.router import router as router_images

app = FastAPI(title="ManuScriptCrossPlatform")

app.mount(path="/resources/static", app=StaticFiles(directory="resources/static"), name="static")

app.include_router(router_images)


async def work_with_db():
    # await test_connection()
    await init_db()


if __name__ == "__main__":
    asyncio.run(work_with_db())
    # uvicorn.run("main:app", reload=True, host="localhost", port=8000)
