import requests
import json


def get_anti_content():
  url = 'http://127.0.0.1:16060/anti-content'
  response = requests.get(url).json()
  return response['data']

url = "https://mms.pinduoduo.com/mangkhut/mms/recentOrderList"

payload = json.dumps({
  "orderType": 1,
  "afterSaleType": 1,
  "remarkStatus": -1,
  "urgeShippingStatus": -1,
  "groupStartTime": 1638588484,
  "groupEndTime": 1646364484,
  "pageNumber": 1,
  "pageSize": 20,
  "sortType": 10
})
headers = {
  'authority': 'mms.pinduoduo.com',
  'pragma': 'no-cache',
  'cache-control': 'no-cache',
  'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
  'anti-content': '0apWfqndGjlaF991Sgxm7da0hEzpdSFrFHGmezE5gZ9g_lZ1B7w-Qk9Z-roRMQbBEpwyduViT7mC9y7fiAg0IbMfcAa3CODoZ8-ds0zbPlUGJKNYpteS56gWT1-gQ-QPVCy2gm5NvM_KU2PONGZaACfxzeAhimRyHzqDhVBfmpgB5SpFFkXSfIdE9JURbtp0FhkhaqzNWb5LE1vgPEhIF9Xv0hCsAXdJs-9ax07T4bTKaEzx454h1TZOiMKg8_KK-WZpK0kkvou8jXT2UXBzOqD5_fKp2Q2BpP1xn4Kv55FBh5rEYmfC-ODje6nEE_cF_luMx0rmzTiicq2G5W4w3JS7Hi-LoeVlE-CA1jNw7RAxnyais5dOT_nmOnMJcpncVWnMkxCNWOMUp5Q33uRFKYrimS3ReoqHIYp-CH39rm8CecmU4vIA',
  'content-type': 'application/json',
  'sec-ch-ua-mobile': '?0',
  'etag': 'Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
  'sec-ch-ua-platform': '"macOS"',
  'accept': '*/*',
  'origin': 'https://mms.pinduoduo.com',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'referer': 'https://mms.pinduoduo.com/orders/list',
  'accept-language': 'zh-CN,zh;q=0.9',
  'cookie': '_crr=Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF; _f77=092d5cf6-50cc-4d34-8d85-bc5406c3252d; _a42=842e5409-0810-4d4c-a37d-c0dbe6db1641; _dvv=6bmRLy7UPQ9TqkYZAsvEgfAQ5Pb57QLA; rcsk=6bmRLy7UPQ9TqkYZAsvEgfAQ5Pb57QLA; rcgk=Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF; rckk=Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF; ru1k=092d5cf6-50cc-4d34-8d85-bc5406c3252d; ru2k=842e5409-0810-4d4c-a37d-c0dbe6db1641; _bee=Bkx33h1ghjulMLs8vSQT9hrX7QlkVTLF; api_uid=CkpADmIE8nmmqwBdrrfSAg==; _nano_fp=XpEYn0TbXpXJl0dqnT_QaU3pgomnK~QSG93WUygq; webp=true; mms_b84d1838=3414,120,321,3397,3434,3254,1202,1203,1204,1205,3417; PASS_ID=1-uExgBkazrNe0F7ITWcOuSYQpjLvvolw4Mng6Ki1Ve/sVMYFPLrbpTBo2JQA95X5HCnk6f78lY6Bkby7csQ3rGQ_133783190_106476843; x-visit-time=1646896199166; JSESSIONID=3315E343930C3FAABF68EFB02C61592D'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
