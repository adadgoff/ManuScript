from src.core.base_repository import BaseRepository
from src.services.images.model import ImageModel


class ImageRepository(BaseRepository):
    model = ImageModel
