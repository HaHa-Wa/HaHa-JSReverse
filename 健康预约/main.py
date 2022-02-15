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
    pass


def submitReservation(hotel):
    url = 'https://hk.sz.gov.cn:8118/passInfo/submitReservation'
    while True:
        data = {
            'checkinDate': hotel['date'],
            'checkCode': getVerify(),
            'houseType': 1,
            't': hotel['timespan'],
            's': hotel['sign']
        }
        ret = session_info.post(url, data=data).json()
        print(ret)
        if ret['status'] != 500:
            print('预约成功')
            break


def login():

    certNo = base64encode(account)
    pwd = base64encode((md5(password)))
    url = 'https://hk.sz.gov.cn:8118/user/login'
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
    print('登录成功')


def gethotalInfo():
    hotalInfoUrl = 'https://hk.sz.gov.cn:8118/districtHousenumLog/getList'
    hotalInfoData = {
    }
    res = session_info.post(url=hotalInfoUrl, data=hotalInfoData).json()
    hotels = res['data']
    print(hotels)
    for hotel in hotels:
        print(hotel)
        if hotel['date'] == checkTime:
            print(hotel)
            return hotel


if __name__ == '__main__':
    account = 'H60289244'
    password = 'zxd5201314'
    checkTime = '2022-02-15'
    session_info = requests.Session()
    login()
    hotel = gethotalInfo()
    submitReservation(hotel)
