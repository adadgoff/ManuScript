import asyncio
import os

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from auth.router import router as router_auth
from db.init_db import init_db, input_example_data
from modules.classrooms.router import router as router_classroom
from modules.lessons.router import router as router_lesson
from modules.modules.router import router as router_module
from modules.steps.router import router as router_step
from modules.users_steps.router import router as router_user_step
from services.images.router import router as router_image
from services.invites.router import router as router_invite
from users.router import router as router_user

app = FastAPI(title="ManuScriptCrossPlatform", root_path="/api", version="0.1.0")
# app = VersionedFastAPI(app, version_format="{major}", prefix_format="/api/v{major}")

################################################

app.include_router(router_auth)
app.include_router(router_user)

app.include_router(router_classroom)
app.include_router(router_module)
app.include_router(router_lesson)
app.include_router(router_step)
app.include_router(router_user_step)

app.include_router(router_image)
app.include_router(router_invite)

################################################

app.mount(path="/static", app=StaticFiles(directory="../resources/static"), name="static")

origins = [
    "http://localhost:3000",
    "http://kaa77.keenetic.pro:3000",
    "http://localhost:8000",
    "http://kaa77.keenetic.pro:8000",
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
    folder_path = "../resources/static/images/"
    files = os.listdir(folder_path)
    for file in files:
        file_path = os.path.join(folder_path, file)
        os.remove(file_path)

    await init_db()
    await input_example_data()


if __name__ == "__main__":
    # asyncio.run(work_with_db())  # Asynchrony can be a problem if you create a database at the same time.
    uvicorn.run("main:app", reload=False, host="0.0.0.0", port=8000)
