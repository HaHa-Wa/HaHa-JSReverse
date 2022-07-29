import json
import time
import requests


def get_anti_content():
    url = 'http://127.0.0.1:5000/ppd_anticontent'
    response = requests.get(url).json()
    anti = response['response']['anti']
    print(len(anti))
    return anti

# print(len(get_anti_content()))

url = "https://mms.pinduoduo.com/mangkhut/mms/recentOrderList"
now_time = int(time.time())
payload = {
    'afterSaleType': 1,
    'groupEndTime': 1657596989,
    'groupStartTime': 1649820989,
    'orderType': 1,
    'pageNumber': 1,
    'pageSize': 20,
    'remarkStatus': -1,
    'sortType': 10,
    'urgeShippingStatus': -1
}
headers = {
    'authority': 'mms.pinduoduo.com',
    'cache-control': 'max-age=0',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
    'anti-content': get_anti_content(),
    'content-type': 'application/json',
    'etag': 'Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
    'sec-ch-ua-platform': '"macOS"',
    'accept': '*/*',
    'origin': 'https://mms.pinduoduo.com',
    'referer': 'https://mms.pinduoduo.com/orders/list',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cookie': '********',
}

response = requests.post(url, headers=headers, data=json.dumps(payload))

print(response.text)
