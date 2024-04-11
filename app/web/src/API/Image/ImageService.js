import { IMAGE_PATH } from "../Paths";

class ImageService {
  static async uploadImage(imgBinary) {
    const formData = new FormData();
    formData.append("file", imgBinary);

    const response = await fetch(
      `${ IMAGE_PATH }/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "accept": "application/json",
        },
      }
    );
    return response.json();
  }
}

export default ImageService;