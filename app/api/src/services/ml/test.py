import easyocr


def text_recognition(file_path):
    reader = easyocr.Reader(["ru", "en"])
    result = reader.readtext(file_path, detail=0, paragraph=True)
    # result = reader.readtext(file_path)
    return result


def main():
    file_path = r"C:\Users\superart\Desktop\qq.jpg"
    print(text_recognition(file_path))


if __name__ == "__main__":
    main()

from shiftlab_ocr.doc2text.reader import Reader

reader = Reader()
result = reader.doc2text(r"C:\Users\superart\Desktop\qq.jpg")

print(result[0])
