import os
import time
import requests
import base64
import hashlib
import ddddocr
import threading
from concurrent.futures import ThreadPoolExecutor

from apscheduler.schedulers.blocking import BlockingScheduler


def md5(str):
    m = hashlib.md5()
    m.update(str.encode("utf8"))
    return m.hexdigest()


def base64encode(str1):
    ret = base64.b64encode(str1.encode()).decode()
    return ret


def getVerify():
    print('正在获取验证码')
    verifyUrl = 'https://hk.sz.gov.cn:8118/user/getVerify'
    ret = session_info.get(verifyUrl, headers=headers)
    with open('ver.jpeg', 'wb') as f:
        f.write(ret.content)
    print('正在识别')
    ocr = ddddocr.DdddOcr()
    res = ocr.classification(ret.content)
    print(res)
    return res


def whilePost():
    pass


def submitReservation(hotel):
    url = 'https://hk.sz.gov.cn:8118/passInfo/submitReservation'
    while True:
        # pool_lock.acquire(blocking=True, timeout=1)
        # pool_lock.locked()
        data = {
            'checkinDate': hotel['date'],
            'checkCode': getVerify(),
            'houseType': 1,
            't': hotel['timespan'],
            's': hotel['sign']
        }
        ret = session_info.post(url, data=data, headers=headers).json()
        print(ret)
        if ret['status'] != 500:
            print('预约成功')
            # os._exit(0)
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
        ret = session_info.post(url, data=data, headers=headers).json()
        print(ret)
        if ret.get('status') != 500:
            break
        time.sleep(0.05)
    print('登录成功')


def gethotalInfo():
    hotalInfoUrl = 'https://hk.sz.gov.cn:8118/districtHousenumLog/getList'
    hotalInfoData = {
    }
    res = session_info.post(url=hotalInfoUrl, data=hotalInfoData, headers=headers).json()
    hotels = res['data']
    for hotel in hotels:
        if hotel['date'] == checkTime:
            print(hotel)
            return hotel


if __name__ == '__main__':
    account = 'H60289244'
    password = 'zxd5201314'
    checkTime = '2022-02-19'
    # pool = ThreadPoolExecutor(max_workers=2)
    # pool_lock = threading.Lock()
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
    }
    session_info = requests.Session()
    login()
    hotel = gethotalInfo()

    sched = BlockingScheduler()
    sched.add_job(submitReservation, trigger='cron', second=0, minute=0, hour=10, args=[hotel])
    sched.start()
    # for x in range(10):
    # checkCode = getVerify()
    # future1 = pool.submit(submitReservation, hotel)
    # future2 = pool.submit(submitReservation, hotel)
    # future3 = pool.submit(submitReservation, hotel)
    # future4 = pool.submit(submitReservation, hotel)
    # future5 = pool.submit(submitReservation, hotel)

    # submitReservation(hotel)
