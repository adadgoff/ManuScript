import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.auth.router import router as router_auth
from app.api.db.init_db import init_db, input_example_data
from app.api.modules.classrooms.router import router as router_classrooms
from app.api.modules.lessons.router import router as router_lessons
from app.api.modules.modules.router import router as router_modules
from app.api.modules.steps.router import router as router_steps
from app.api.services.images.router import router as router_images
from app.api.users.router import router as router_users

app = FastAPI(title="ManuScriptCrossPlatform", root_path="/api", version="0.1.0")
# app = VersionedFastAPI(app, version_format="{major}", prefix_format="/api/v{major}")

################################################

app.include_router(router_auth)

app.include_router(router_classrooms)
app.include_router(router_lessons)
app.include_router(router_modules)
app.include_router(router_steps)

app.include_router(router_images)
app.include_router(router_users)

################################################

app.mount(path="/resources/static", app=StaticFiles(directory="resources/static"), name="static")

origins = [
    "http://localhost:3000",
    "http://kaa77.keenetic.pro:3000/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers",
                   "Access-Control-Allow-Origin", "Authorization"],
)


async def work_with_db():
    await init_db()
    await input_example_data()


if __name__ == "__main__":
    # asyncio.run(work_with_db())  # бывает проблема с асинхронностью, если создавать одновременно БД.
    uvicorn.run("main:app", reload=False, host="localhost", port=8000)
