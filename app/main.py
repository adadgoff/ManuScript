import asyncio

import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.api.auth.router import router as router_auth
from app.api.db.test import init_db, input_example_data
from app.api.modules.classrooms.router import router as router_classrooms
from app.api.modules.steps.router import router as router_steps
from app.api.services.images.router import router as router_images
from app.api.users.router import router as router_users

app = FastAPI(title="ManuScriptCrossPlatform", root_path="/api", version="0.1.0")
# app = VersionedFastAPI(app, version_format="{major}", prefix_format="/api/v{major}")

app.include_router(router_auth)

app.include_router(router_classrooms)
app.include_router(router_steps)

app.include_router(router_images)
app.include_router(router_users)

app.mount(path="/resources/static", app=StaticFiles(directory="resources/static"), name="static")


async def work_with_db():
    await init_db()
    await input_example_data()


if __name__ == "__main__":
    # asyncio.run(work_with_db())
    uvicorn.run("main:app", reload=True, host="localhost", port=8000)
