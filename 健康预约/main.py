import time

import requests
import base64
import hashlib
import ddddocr


def md5(str):
    m = hashlib.md5()
    m.update(str.encode("utf8"))
    print(m.hexdigest())
    return m.hexdigest()


def base64encode(str1):
    ret = base64.b64encode(str1.encode()).decode()
    return ret


def getVerify():
    verifyUrl = 'https://hk.sz.gov.cn:8118/user/getVerify'
    ret = session_info.get(verifyUrl)
    with open('ver.jpeg', 'wb') as f:
        f.write(ret.content)
    ocr = ddddocr.DdddOcr()
    res = ocr.classification(ret.content)
    print(res)
    return res

def whilePost():
    while True:
        data = {
            "certType": 4,
            "verifyCode": getVerify(),
            "certNo": certNo,
            "pwd": pwd
        }
        ret = session_info.post(url, data=data).json()
        print(ret)
        if ret.get('status') != 500:
            break
        time.sleep(0.05)

def login():
    account = 'H60289244'
    password = 'zxd5201314'
    certNo = base64encode(account)
    pwd = base64encode((md5(password)))
    url = 'https://hk.sz.gov.cn:8118/user/login'




def gethotalInfo():
    hotalInfoUrl = 'https://hk.sz.gov.cn:8118/districtHousenumLog/getList'
    hotalInfoData = {
    }
    res = session_info.post(url=hotalInfoUrl, data=hotalInfoData).json()
    hotels = res['data']
    print(hotels)
    for hotel in hotels:
        print(hotel)
        if hotel['data'] == checkTime:
            print(hotel)


if __name__ == '__main__':
    checkTime = '2022-02-15'

    session_info = requests.Session()
    headers = {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
        'Cookie': 'isolateLocale=zh-CN; isolate-web-session-id=62266044-86ce-4ab5-90a0-2e1139b14c95'
    }
    login()

    gethotalInfo()
