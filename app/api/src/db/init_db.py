from src.auth.helpers.hasher_helper import get_password_hash
from src.db.async_engine import async_engine
from src.db.async_session_factory import async_session_factory
from src.db.base import Base
from src.modules.classrooms.model import ClassroomModel  # noqa
from src.modules.comments.model import CommentModel  # noqa
from src.modules.lessons.model import LessonModel  # noqa
from src.modules.modules.model import ModuleModel  # noqa
from src.modules.notifications.model import NotificationModel  # noqa
from src.modules.steps.StepType import StepType
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
        userA = UserModel(email="teacher@mail.ru", username="teacher", password=get_password_hash("<PASSWORD>"))
        userK = UserModel(email="student@mail.ru", username="student", password=get_password_hash("<PASSWORD>"))
        userL = UserModel(email="student2@mail.ru", username="student2", password=get_password_hash("<PASSWORD>"))
        session.add_all([userK, userA, userL])

        classroomA = ClassroomModel(title="Математика", description="Класс 7А")
        classroomA.teachers = [userA]
        classroomA.students = [userK, userL]
        session.add_all([classroomA])

        ClassroomB = ClassroomModel(title="Русский язык", description="Класс 10Б")
        ClassroomB.teachers = [userA]
        ClassroomB.students = [userK, userL]
        session.add_all([ClassroomB])

        module1 = ModuleModel(title="Арифметика", description="7 класс. 1 четверть", order=1)
        module2 = ModuleModel(title="Геометрия", description="7 класс. 1 четверть", order=2)
        classroomA.modules = [module1, module2]
        session.add_all([module1, module2])

        module1_lesson1 = LessonModel(title="Сложение", order=1)
        module1_lesson2 = LessonModel(title="Вычитание", order=2)
        module1_lesson3 = LessonModel(title="Умножение", order=3)
        module1_lesson4 = LessonModel(title="Деление", order=4)
        module1.lessons.extend([module1_lesson1, module1_lesson2, module1_lesson3, module1_lesson4])
        session.add_all([module1_lesson1, module1_lesson2, module1_lesson3, module1_lesson4])

        module2_lesson1 = LessonModel(title="Квадраты", order=1)
        module2_lesson2 = LessonModel(title="Круги", order=2)
        module2.lessons.extend([module2_lesson1, module2_lesson2])
        session.add_all([module2_lesson1, module2_lesson2])

        m1l1_step1 = StepModel(type=StepType.INFO, text="Прочитайте теорию про сложение: <...>", answer=None, order=1)
        m1l1_step2 = StepModel(type=StepType.TASK, text="2 + 2 = ?", answer="4", order=2)
        m1l2_step1 = StepModel(type=StepType.INFO, text="Прочитайте теорию про вычитание: <...>", answer=None, order=1)
        m1l2_step2 = StepModel(type=StepType.TASK, text="2 - 2 = ?", answer="0", order=2)
        m1l3_step1 = StepModel(type=StepType.INFO, text="Прочитайте теорию про умножение: <...>", answer=None, order=1)
        m1l3_step2 = StepModel(type=StepType.TASK, text="2 * 2 = ?", answer="4", order=2)
        m1l4_step1 = StepModel(type=StepType.INFO, text="Прочитайте теорию про деление: <...>", answer=None, order=1)
        m1l4_step2 = StepModel(type=StepType.TASK, text="2 / 2 = ?", answer="1", order=2)
        module1_lesson1.steps = [m1l1_step1, m1l1_step2]
        module1_lesson2.steps = [m1l2_step1, m1l2_step2]
        module1_lesson3.steps = [m1l3_step1, m1l3_step2]
        module1_lesson4.steps = [m1l4_step1, m1l4_step2]
        session.add_all([m1l1_step1, m1l1_step2, m1l2_step1, m1l2_step2])

        m2l1_step1 = StepModel(type=StepType.INFO, text="Прочитайте теорию про квадраты: <...>", answer=None, order=1)
        m2l2_step1 = StepModel(type=StepType.INFO, text="Прочитайте теорию про круги: <...>", answer=None, order=1)
        module2_lesson1.steps = [m2l1_step1]
        module2_lesson2.steps = [m2l2_step1]
        session.add_all([m2l1_step1, m2l2_step1])

        ################################################################################################################

        classroomD = ClassroomModel(title="Учебный класс с максимальным по длине названием777",
                                    description="Учебный класс с максимальным по длине описанием ещё надо 50 символов так что пишу что придет вголову")

        classroomD.teachers = [userA]
        classroomD.students = [userK, userL]
        session.add_all([classroomD])

        moduleD1 = ModuleModel(title="Уже модуль сссс максимальным по длине названием777",
                               description="Модуль сссссссс максимальным по длине описанием ещё надо 50 символов так что пишу что придет вголову",
                               order=1)
        classroomD.modules = [moduleD1]
        session.add_all([moduleD1])

        moduleD1_lesson = LessonModel(title="Уже уроккк сссс максимальным по длине названием777", order=1)
        moduleD1.lessons = [moduleD1_lesson]
        session.add_all([moduleD1_lesson])

        await session.commit()
