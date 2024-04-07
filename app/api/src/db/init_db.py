from src.auth.helpers.hasher_helper import get_password_hash
from src.db.async_engine import async_engine
from src.db.async_session_factory import async_session_factory
from src.db.base import Base

from src.modules.classrooms.model import ClassroomModel  # noqa
from src.modules.comments.model import CommentModel  # noqa
from src.modules.enums.StepType import StepType
from src.modules.lessons.model import LessonModel  # noqa
from src.modules.modules.model import ModuleModel  # noqa
from src.modules.notifications.model import NotificationModel  # noqa
from src.modules.steps.model import StepModel  # noqa
from src.modules.students.model import StudentModel  # noqa
from src.modules.teachers.model import TeacherModel  # noqa
from src.modules.users_notifications.model import UserNotificationModel  # noqa
from src.modules.users_steps.model import UserStepModel  # noqa
from src.services.images.model import ImageModel  # noqa
from src.users.model import UserModel  # noqa


async def init_db():
    print(Base.metadata.tables)
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


# TODO: remove on prod.
async def input_example_data():
    async with async_session_factory() as session:
        userK = UserModel(email="kdadgoff@mail.ru", username="KOKOS", password=get_password_hash("<PASSWORD>"))
        userA = UserModel(email="adadgoff@mail.ru", username="PRO100", password=get_password_hash("<PASSWORD>"))
        userL = UserModel(email="ldadgoff@mail.ru", username="LizO4kA", password=get_password_hash("<PASSWORD>"))
        session.add_all([userK, userA, userL])

        classroomA = ClassroomModel(title="Art classroom", description="REAL GOOD")
        classroomA.teachers = [userA]
        classroomA.students = [userK, userL]
        session.add_all([classroomA])

        ClassroomB = ClassroomModel(title="Art classroom 2", description="Second good classroom")
        ClassroomB.teachers = [userA]
        ClassroomB.students = [userK, userL]
        session.add_all([ClassroomB])

        module1 = ModuleModel(title="Module1", description="Отдыхаем", order=1)
        module2 = ModuleModel(title="Module2", description="Ничего не делаем", order=2)
        classroomA.modules = [module1, module2]
        session.add_all([module1, module2])

        module1_lesson1 = LessonModel(title="Поспать", order=1)
        module1_lesson2 = LessonModel(title="Отдохнуть", order=2)
        module1.lessons.append(module1_lesson1)
        module1.lessons.append(module1_lesson2)
        session.add_all([module1_lesson1, module1_lesson2])

        module2_lesson1 = LessonModel(title="2-1", order=1)
        module2_lesson2 = LessonModel(title="2-2", order=2)
        module2.lessons.append(module2_lesson1)
        module2.lessons.append(module2_lesson2)
        session.add_all([module2_lesson1, module2_lesson2])

        m1l1_step1 = StepModel(type=StepType.INFO, text="Поиграть", answer=None, order=1)
        m1l1_step2 = StepModel(type=StepType.TASK, text="2+2", answer="4", order=2)
        m1l2_step1 = StepModel(type=StepType.INFO, text="m1l2_step1", answer=None, order=1)
        m1l2_step2 = StepModel(type=StepType.INFO, text="m1l2_step2", answer=None, order=2)
        module1_lesson1.steps = [m1l1_step1, m1l1_step2]
        module1_lesson2.steps = [m1l2_step1, m1l2_step2]
        session.add_all([m1l1_step1, m1l1_step2, m1l2_step1, m1l2_step2])

        m2l1_step1 = StepModel(type=StepType.INFO, text="m2l1_step1", answer=None, order=1)
        m2l1_step2 = StepModel(type=StepType.INFO, text="m2l1_step2", answer=None, order=2)
        m2l2_step1 = StepModel(type=StepType.INFO, text="m2l2_step1", answer=None, order=1)
        m2l2_step2 = StepModel(type=StepType.INFO, text="m2l2_step2", answer=None, order=2)
        module2_lesson1.steps = [m2l1_step1, m2l1_step2]
        module2_lesson2.steps = [m2l2_step1, m2l2_step2]
        session.add_all([m2l1_step1, m2l1_step2, m2l2_step1, m2l2_step2])
        await session.commit()
