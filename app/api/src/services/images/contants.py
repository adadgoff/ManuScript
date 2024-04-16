import re

ALLOWED_EXTENSIONS = ["gif", "jpg", "jpeg", "png", ".svg", ".web", ".webp"]
DEFAULT_CHUNK_SIZE = 16 * 1024 * 1024  # 16 megabytes.
PATH = "../resources/static/images"
IMAGE_API_REGEX = re.compile(r'<img src="http://kaa77.keenetic.pro:8000/api/image/([^"]+)"')
