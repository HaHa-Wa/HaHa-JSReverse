import ddddocr
import time
begin=time.time()
ocr = ddddocr.DdddOcr()

with open('yzm.jpeg', 'rb') as f:

    img_bytes = f.read()

res = ocr.classification(img_bytes)
finish=time.time()
print("结果：")
print(res)
print("用时：%s 秒" % str(finish-begin))

