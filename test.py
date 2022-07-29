import time

import requests
import json

url = "https://mola-gateway.ganjutech.com/namespaces/pdd-mms/methods/get-order-detail/"

payload = json.dumps({
  "orderSn": "220624-131439082921133",
  "isDecode": False
})
headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wIjp7ImlkIjoiMjI3NDQ4MTI2IiwidGl0bGUiOiLnvo7lpb3otKnljZYiLCJuaWNrbmFtZSI6Iue-juWlvei0qeWNliIsInNpdGUiOiJwaW5kdW9kdW8iLCJuYW1lc3BhY2UiOiJwZGQtbW1zIiwicmVsYXRlZCI6W119LCJzdWJVc2VyIjp7ImlkIjoiMTE3MjgzNjAwIiwibmlja25hbWUiOiJsZXlhbjp0b25neXVhbiJ9LCJpYXQiOjE2NTg5NzQxODcsImlzcyI6ImdhdGV3YXkifQ.OPCVJC3q3QPCFyGEyTFb7v9gd6agf0shQZVg-mDaaRs',  'Content-Type': 'application/json',
  'Cookie': 'SERVERID=e390f3ae035b6a0c5ac1313e11840f85|1658904762|1658736285'
}
num = 1
while True:
    print('第%s次调用'%str(num))
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)
    num += 1
    time.sleep(3)

