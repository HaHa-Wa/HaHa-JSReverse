import requests
from hyper.contrib import HTTP20Adapter

headers = {':authority': 'match.yuanrenxue.com',
           ':method': 'GET',
           ':path': '/api/match/17',
           ':scheme': 'https',
           'accept': 'application/json, text/javascript, */*; q=0.01',
           'accept-encoding': 'gzip, deflate, br',
           'accept-language': 'zh-CN,zh;q=0.9',
           'Sec-Fetch-Mode':'no-cache',
           'Sec-Fetch-Site':'none',
           'Sec-Fetch-User':'?1',
           'Upgrade-Insecure-Requests':'1',
           'cookie': 'sessionid=7x25qogue9tr4hcnl58lkis2i59pi5n9',
           'referer': 'https://match.yuanrenxue.com/match/17',
           'user-agent': 'yuanrenxue.project'
           }

sessions = requests.session()
ret = 0
for page in range(1,6):
    url = "https://match.yuanrenxue.com/api/match/17?page="+str(page)
    print(url)
    sessions.mount('https://match.yuanrenxue.com', HTTP20Adapter())
    headers[':path'] = '/api/match/17?page='+str(page)
    response = sessions.get(url=url, headers=headers).json()['data']
    print(response)
    for numa in response:
        ret += int(numa['value'])
print(ret)