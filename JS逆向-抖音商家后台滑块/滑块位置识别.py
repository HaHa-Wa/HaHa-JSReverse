import ddddocr

slide = ddddocr.DdddOcr(det=False, ocr=False)

with open('fu.png', 'rb') as f:
    target_bytes = f.read()

with open('zhu.jpeg', 'rb') as f:
    background_bytes = f.read()

res = slide.slide_match(target_bytes, background_bytes, simple_target=True)

print(res)