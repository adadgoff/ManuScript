from app.api.db.async_engine import async_engine
from app.api.db.base import Base

from app.api.modules.classrooms.models import ClassroomModel                    # noqa
from app.api.modules.comments.models import CommentModel                        # noqa
from app.api.modules.lessons.models import LessonModel                          # noqa
from app.api.modules.modules.models import ModuleModel                          # noqa
from app.api.modules.notifications.models import NotificationModel              # noqa
from app.api.modules.steps.models import StepModel                              # noqa
from app.api.modules.students.models import StudentModel                        # noqa
from app.api.modules.teachers.models import TeacherModel                        # noqa
from app.api.modules.users_notifications.models import UserNotificationModel     # noqa
from app.api.modules.users_steps.models import UserStepModel                     # noqa

from app.api.services.images.models import ImageModel                           # noqa
from app.api.users.models import UserModel                                      # noqa


async def init_db():
    print(Base.metadata.tables)
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    print("Database was created (I hope).")