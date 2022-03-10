import gzip
import base64
import json
import time

import ddddocr
import execjs
import requests
from Crypto.Cipher import AES


class Encrypt:
    def __init__(self):
        self.key = 'bN3%cH2$H1@*jCo$'.encode('utf-8')
        self.iv = 'gl3-w^dN)3#h6E1%'.encode('utf-8')

    # @staticmethod
    def pkcs7padding(self, text):
        """
        明文使用PKCS7填充
        """
        bs = 16
        length = len(text)
        bytes_length = len(text.encode('utf-8'))
        padding_size = length if (bytes_length == length) else bytes_length
        padding = bs - padding_size % bs
        padding_text = chr(padding) * padding
        self.coding = chr(padding)
        return text + padding_text

    def aes_encrypt(self, content):
        """
        AES加密
        """
        cipher = AES.new(self.key, AES.MODE_CBC, self.iv)
        # 处理明文 填充字符
        content_padding = self.pkcs7padding(content)
        # 加密
        encrypt_bytes = cipher.encrypt(content_padding.encode('utf-8'))
        # 重新编码
        result = str(base64.b64encode(encrypt_bytes), encoding='utf-8')
        return result

    def aes_decrypt(self, content):
        """
        AES解密
        """

        cipher = AES.new(self.key, AES.MODE_CBC, self.iv)
        content = base64.b64decode(content)
        text = cipher.decrypt(content).decode('utf-8'
                                              )
        # print(text)
        return text.rstrip(self.coding)


def decode_captcha():
    aes = AES.new('bN3%cH2$H1@*jCo$'.encode('utf-8'), AES.MODE_CBC, 'gl3-w^dN)3#h6E1%'.encode('utf-8'))
    aes_de = AES.new('bN3%cH2$H1@*jCo$'.encode('utf-8'), AES.MODE_CBC, 'gl3-w^dN)3#h6E1%'.encode('utf-8'))
    # print('e.encode:', e.encode())
    # print('base64.b64decode(e.encode()):', base64.b64decode(e.encode()))
    dec = aes.decrypt(base64.b64decode(e.encode()))
    # print(base64.b64encode(aes_de.encrypt(dec)))
    array_list = []
    for i in dec.decode():
        try:
            array_list.append(ord(i))
        except:
            print(i)
    # print('array_list:', array_list)
    # print('bytearray(array_list[:2]):', bytearray(array_list[:-2]))
    # print(bytearray(array_list[:-2]))
    g_zip = gzip.decompress(bytearray(array_list[:-2]))
    # print(g_zip.decode())


def captcha_collect():
    a = Encrypt()
    s = {
        "t0": time.time(), "tp": 3,
         "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
         "rf": "",
         "hl": "000000000001010",
         "sc": {"w": 2560, "h": 1440},
         "ihs": 1, "platform": 1
         }
    ss = base64.b64encode(json.dumps(s).encode())
    t = gzip.compress(ss)
    # print(t)
    # print(str(t)[2:-1])
    captcha_t = a.aes_encrypt(str(t)[2:-1])
    # print(captcha_t)
    return captcha_t


def get_anti_content():
    url = 'http://127.0.0.1:16060/anti-content'
    response = requests.get(url).json()
    return response['data']


def get_auth():
    url = 'https://mms.pinduoduo.com/janus/api/auth'
    headers = {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "anti-content": "0apAfa5e-wCEfoUuPMFfil0DuPXc8-hXtRJfmjCcPh8thnDPPQMTMkCVdfB_dF2HezRW-bcHvb2eFbtkpJT3_7MbRIMbtuMbcUqLnfHO82SgsM9L_sMkBeVEzVSk-o9fXaXGdyY0myXq4oXqTjX59YHq9Pk64tzNfcBfye-vVExvspJbFuFbcTU3Kh1B_VSR4E-eRkvb2uMz4OJbKzUbZC92wprCadZs9onJCynJrYyswoG4Mf_oylph0nGNgjnqWzXqwTYh0y4W6yYs6PxHyXv8slpHiXyseoqZhfqdidOqWdXNgqXGP8Yq9YvCVQpgSHxSDSkn4Pt74Qq0gt_PCSZh6PXdCIqTcP0gYln4NGqmilr3ot08_jnoYXIYoHLZsEbTwy8lld7KkTzsAcMKfEUecEHU60lGM2YxWvYOm5Gq_YHuYSKtUSGuUx8Ov8KHEjaQhWvrZX9qAl66xdxQrEi",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "etag": "Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF",
        "pragma": "no-cache",
        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
    }
    data = {
        "username": "客服1号位为您服务",
        "password": "bCv0H1hw+upmVZDnJkeHyj99lF34tLOSeoeV0J5DqC2sJwKDsrHyrtSiOY7nMOqINm4HgJNvpKXaecMsq5OTFxC9+DC6aOr+uFulxf5QTuVuikWGLt7oVnHVhbYi2G1I0OT2ILOP04BOgDpfn6nNfYigvQOOTpWOx8t0Zq907PM=",
        "passwordEncrypt": 'true', "verificationCode": "", "mobileVerifyCode": "", "sign": "",
        "touchevent": {
            "mobileInputEditStartTime": time.time(),
            "mobileInputEditFinishTime": time.time(),
            "mobileInputKeyboardEvent": "0|0|0|",
            "passwordInputEditStartTime": time.time(),
            "passwordInputEditFinishTime": time.time(),
            "passwordInputKeyboardEvent": "0|0|0|809-8-98",
            "captureInputEditStartTime": "",
            "captureInputEditFinishTime": "",
            "captureInputKeyboardEvent": "",
            "loginButtonTouchPoint": "2920,-71",
            "loginButtonClickTime": time.time()
        },
        "fingerprint": {
            "innerHeight": 610, "innerWidth": 2560, "devicePixelRatio": 1, "availHeight": 1440,
            "availWidth": 2560, "height": 1440, "width": 2560, "colorDepth": 24,
            "locationHref": "https://mms.pinduoduo.com/login/", "clientWidth": 2545, "clientHeight": 883,
            "offsetWidth": 2545, "offsetHeight": 883, "scrollWidth": 3301, "scrollHeight": 883,
            "navigator": {
                "appCodeName": "Mozilla", "appName": "Netscape", "hardwareConcurrency": 8,
                "language": "zh-CN", "cookieEnabled": 'true', "platform": "MacIntel",
                "doNotTrack": 'null',
                "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
                "vendor": "Google Inc.", "product": "Gecko", "productSub": "20030107",
                "mimeTypes": "f5a1111231f589322da33fb59b56946b4043e092",
                "plugins": "387b918f593d4d8d6bfa647c07e108afbd7a6223"},
            "referer": "https://mms.pinduoduo.com/orders/detail?type=4399&sn=220216-179332719430230",
            "timezoneOffset": -480}, "riskSign": "0ead0a81d287f7c4e26fec8b873632fb",
        "timestamp": time.time(),
        "crawlerInfo": get_anti_content()
    }

    ret = requests.post(url, headers=headers, data=json.dumps(data)).json()
    # print(ret)
    # print(ret.get('result'))
    return ret.get('result')


def get_img_info():
    url = 'https://apiv2.pinduoduo.net/api/phantom/obtain_captcha'
    headers = {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json;charset=UTF-8",
        "pragma": "no-cache",
        "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
    }
    data = {
        "anti_content": get_anti_content(),
        "verify_auth_token": verifyAuthToken,
        "captcha_collect": captcha_collect()
    }
    ret = requests.post(url, headers=headers, data=json.dumps(data)).json()
    return ret['pictures']


def decode_img(rawdata):
    with open('img_decode.js', 'r', encoding='UTF-8') as f:
        js_code = f.read()
    context = execjs.compile(js_code)
    result = context.call("decode", rawdata)  # 参数一为函数名，参数二和三为函数的参数
    return result


def verify_img(res):
    url = 'https://apiv2.pinduoduo.net/api/phantom/user_verify'
    headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json;charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  }
    data = {
        "verify_code": res,
        "captcha_collect": captcha_collect(),
        "verify_auth_token": verifyAuthToken,
        "anti_content": get_anti_content()
    }
    print(data)
    ret = requests.post(url, headers=headers, data=json.dumps(data))
    print(ret.text)


if __name__ == '__main__':
    verifyAuthToken = get_auth()['verifyAuthToken']
    pictures = get_img_info()
    bg1_base64 = decode_img(pictures[0])
    bg2_base64 = decode_img(pictures[1])
    bg1 = base64.b64decode(bg1_base64.replace('data:image/png;base64,', ''))
    bg2 = base64.b64decode(bg2_base64.replace('data:image/png;base64,', ''))
    with open('bg1.png', 'wb') as f:
        f.write(bg1)
    with open('bg2.png', 'wb') as f:
        f.write(bg2)
    slide = ddddocr.DdddOcr(det=False, ocr=False)
    res = slide.slide_match(bg1, bg2, simple_target=True)['target'][0]
    res_num = round(res * 0.85, 2)
    print(res_num)
    verify_img(str(res_num))
