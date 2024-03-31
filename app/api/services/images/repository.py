from app.api.core.base_repository import BaseRepository
from app.api.services.images.model import ImageModel


class ImageRepository(BaseRepository):
    model = ImageModel
