import ddddocr
import requests


def discern_hk(url1, url2):
    """
    :param
    :return:
    {'target_y': 0, 'target': [189, 148, 299, 258]}
                        left_x, top_y, right_x, bottom_y
    """
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
        "referer": "https://fxg.jinritemai.com/",
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://fxg.jinritemai.com',
        'accept': 'application/json, text/plain, */*'
    }
    # 初始化识别对象
    slide = ddddocr.DdddOcr(det=False, ocr=False)
    # 背景图片
    target_bytes = requests.get(url1, headers=headers).content
    # 缺口图片
    background_bytes = requests.get(url2, headers=headers).content

    res = slide.slide_match(target_bytes, background_bytes, simple_target=True)
    return res

url1 = 'https://p9-catpcha.byteimg.com/tos-cn-i-188rlo5p4y/506d20f3284443da8ff15b130ce88a7a~tplv-188rlo5p4y-2.jpeg'
url2 = 'https://p9-catpcha.byteimg.com/tos-cn-i-188rlo5p4y/cf2bf57460f046b3b8093b7ab51bf8a7~tplv-188rlo5p4y-1.png'
res = discern_hk(url1, url2)
print(res)
