from src.core.base_service import BaseService
from src.services.images.repository import ImageRepository


class ImageService(BaseService):
    repository = ImageRepository
