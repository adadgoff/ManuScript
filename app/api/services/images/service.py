from app.api.core.base_service import BaseService
from app.api.services.images.repository import ImageRepository


class ImageService(BaseService):
    repository = ImageRepository
