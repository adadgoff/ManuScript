import uvicorn

from fastapi import FastAPI

from app.Classes.router import router as router_classes
from app.Users.router import router as router_users

app = FastAPI()
app.include_router(router_classes)
app.include_router(router_users)

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
