import json
import time
import requests

def get_anti_content():
    url = 'http://202203.xyz:18080/anti-content'
    response = requests.get(url).json()
    return response['data']


print(len(get_anti_content()))


url = "https://mms.pinduoduo.com/mangkhut/mms/recentOrderList"
now_time = int(time.time())
payload = {
    "orderType": 1,
    "afterSaleType": 1,
    "remarkStatus": -1,
    "urgeShippingStatus": -1,
    "groupStartTime": now_time,
    "groupEndTime": now_time,
    "pageNumber": 1,
    "pageSize": 20,
    "sortType": 10
   }
headers = {
    'authority': 'mms.pinduoduo.com',
    'cache-control': 'max-age=0',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
    'anti-content': '0apWfqlF0iTaF99x7-yyi62DBfhyv95AjCrEyP4PVssUPpp-Fzd8VnDrcHHcwkav9e6_YN4IbMYM3Ggq7i52judFYWiiJcoW2cpKp4ca4A0ERmZlncbWKKweqSFe_duxrMV6Ynv5b4PslgaYw1rcii6cAEQWIciK4VMlVjXyxwlej7dqrthL1k1DTtf1Wtm33Im0OhqcaqEqWk4AQQ6FsPTD_40K1ToxGnvElc9xZ2EwBrKDVvOAXvgL1xdb12_fNqw1ZZwyvBxyrDrzNW9ZUn47OpCxpEwMPIeg7pkggTzygxKqI0oUdy_GHk7_kuJZxB8_q3JXqFQFO5RLJF0Zvi5sSvWWG871d503p_3RdC35oLR5EMvR5dt5g4UT64PTG7qi73UxhoSrtf1_Ka-Nrl956BGTI-7JLwTL7MxoGJR9rGWCuZuU4zIG',
    'content-type': 'application/json',
    'etag': 'J0kGf2HFGJivq3jp0kBK0uXS74mry91A',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
    'sec-ch-ua-platform': '"Windows"',
    'accept': '*/*',
    'origin': 'https://mms.pinduoduo.com',
    'referer': 'https://mms.pinduoduo.com/orders/list',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cookie': '_crr=Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF; _f77=092d5cf6-50cc-4d34-8d85-bc5406c3252d; _a42=842e5409-0810-4d4c-a37d-c0dbe6db1641; _dvv=6bmRLy7UPQ9TqkYZAsvEgfAQ5Pb57QLA; rcsk=6bmRLy7UPQ9TqkYZAsvEgfAQ5Pb57QLA; rcgk=Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF; rckk=Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF; ru1k=092d5cf6-50cc-4d34-8d85-bc5406c3252d; ru2k=842e5409-0810-4d4c-a37d-c0dbe6db1641; _bee=Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF; api_uid=CkpADmIE8nmmqwBdrrfSAg==; _nano_fp=XpEYn0TbXpXJl0dqnT_QaU3pgomnK~QSG93WUygq; webp=true; mms_b84d1838=3414,120,321,3397,3434,3254,1202,1203,1204,1205,3417; PASS_ID=1-FX7z2XJnluHNcXCHtPEVlzZIiOaWrfpgZi30X47qAI9bBfTyE7MQUT1fVA8CfgA7o1LL1BZE3WRf5s7WYRbj8Q_133783190_106476843; x-visit-time=1646966587231; JSESSIONID=9BCDF666BFB5B436C3FA5D47674E56EC',
}

response = requests.post(url, headers=headers, data=json.dumps(payload))

print(response.text)
