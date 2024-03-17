# import functools
#
# from fastapi import Depends
#
# from app.api.auth.enums.user_access import UserAccess
# from app.api.auth.exceptions import UserAccessIncorrectTypeException, AccessDeniedException
# from app.api.auth.token_helper import get_current_user
# from app.api.users.models import UserModel
#
#
# class access_control:  # noqa
#     def __init__(self, accesses: tuple[UserAccess]):
#         if not all(isinstance(access, UserAccess) for access in accesses):
#             raise UserAccessIncorrectTypeException
#         self.accesses = accesses
#
#     def __call__(self, function):
#         @functools.wraps(function)
#         async def wrapper(*args, **kwargs):
#             await self.verify_user_access()
#             return await function(*args, **kwargs)
#
#         return wrapper
#
#     async def verify_user_access(self):
#         match self.permission:
#             case UserAccess.NOT_AUTHENTICATED:
#                 return await self.verify_not_authenticated()
#             case UserAccess.AUTHENTICATED:
#                 return await self.verify_authenticated()
#             case UserAccess.SELF:
#                 return await self.verify_self_user()
#             case UserAccess.STUDENT:
#                 return await self.verify_student()
#             case UserAccess.TEACHER:
#                 return await self.verify_teacher()
#             case _:
#                 raise AccessDeniedException
#
#     async def verify_not_authenticated(self, current_user: UserModel = Depends(get_current_user)):
#         pass
#
#     async def verify_authenticated(self):
#         pass
#
#     async def verify_self_user(self):
#         pass
#
#     async def verify_student(self):
#         pass
#
#     async def verify_teacher(self):
#         pass
