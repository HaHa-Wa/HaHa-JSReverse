import re
import time
import json
import requests
# import socket
# import socks


def get_id():
    headers = {
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'navigationStartTime': '1642677776998',
        'Protocol-Version': '5',
        'Run-Mode': 'FULL',
        'Screen-Height': '1600',
        'Channel-Type': 'MOBILE_WEB',
        'Time-Zone': '480',
        'Device-OS': 'Mac',
        'Application-Version': '7.0.0.4-1',
        'sec-ch-ua-mobile': '?0',
        'Screen-Width': '2560',
        'sec-ch-ua-platform': '"macOS"',
        'Request-Timestamp': str(int(round(time.time() * 1000))),
        'Longitude': '',
        'Content-Type': 'application/json;charset=UTF-8',
        'Application-Key': '196de13c-e946-4531-98f6-2719ec8405ce',
        'Accept': 'text/plain, */*; q=0.01',
        'Tenant-Id': 'microsoft',
        'Device-OS-Version': 'OS X 10_15_',
        'Browser': 'Chrome',
        'Browser-Version': '97.0.4692.71',
        'Jma-Module-Version': '7',
        'Time-Stamp': '1642677776998',
        'J-User-Id': 'cd29a16d891a-048b550051205816-05f1',
        'X-Requested-With': 'XMLHttpRequest',
        # 'Latitude': '',
        # 'Locale': 'zh-CN',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'Jma-Version': '7.0.0.39',
        'Space-Id': 'null',
        'Security-Token': 'undefined',
        # 'Imei': '1642645060975Chrome97.0.4692.71MacOS X 10_15_',
        'Environment-Name': 'Prod',
        'Origin': 'https://microsoft.gointeract.io',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://microsoft.gointeract.io',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }

    params = (
        ('interaction', '1461173234028-3884f8602eccbe259104553afa8415434b4581-05d1'),
        ('accountId', 'microsoft'),
        ('loadFrom', 'CDN'),
        ('appkey', '196de13c-e946-4531-98f6-2719ec8405ce'),
        ('Language', 'English'),
        ('name', 'pana'),
        ('CountryCode', 'en-US'),
        ('Click To Call Caller Id', ' 17142064889'),
        ('startedFromSmsToken', '3jUenpr'),
        ('dnis', '26'),
        ('token', '0Yr8Nd'),
    )

    data = '"1461173234028-3884f8602eccbe259104553afa8415434b4581-05d1"'

    response = requests.post(
        'https://microsoft.gointeract.io/interact/version/2/account/microsoft/interaction/1461173234028-3884f8602eccbe259104553afa8415434b4581-05d1',
        headers=headers, params=params, data=data)
    return response.headers['Object-Instance-Id'], response.headers['User-Id']


def get_one():
    headers = {
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'navigationStartTime': '1642686600021',
        'Protocol-Version': '5',
        'Run-Mode': 'FULL',
        'Screen-Height': '1600',
        'Channel-Type': 'MOBILE_WEB',
        'Time-Zone': '480',
        'Device-OS': 'Mac',
        'Application-Version': '7.0.0.4-1',
        'Screen-Width': '2560',
        'Environment-Name': 'Prod',
        'sec-ch-ua-platform': '"macOS"',
        'Object-Step-Id': 'null',
        'Request-Timestamp': '1642657802166',
        'Longitude': '',
        'Content-Type': 'application/json;charset=UTF-8',
        'Application-Key': '196de13c-e946-4531-98f6-2719ec8405ce',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Tenant-Id': 'microsoft',
        'Device-OS-Version': 'OS X 10_15_',
        'User-Id': UserId,
        'Browser': 'Chrome',
        'Browser-Version': '97.0.4692.71',
        'Jma-Module-Version': '7',
        'Time-Stamp': '1642686600021',
        'J-User-Id': 'cd29a16d891a-048b550051205816-05f1',
        'X-Requested-With': 'XMLHttpRequest',
        'Latitude': '',
        'Locale': 'zh-CN',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'Jma-Version': '7.0.0.39',
        'Space-Id': 'null',
        'Security-Token': 'undefined',
        'Imei': '1642645060975Chrome97.0.4692.71MacOS X 10_15_',
        'Object-Instance-Id': code_id,
        'Origin': 'https://microsoft.gointeract.io',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://microsoft.gointeract.io',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }

    data = '{"navigationType":"CURRENT"}'

    response = requests.post(
        'https://microsoft.gointeract.io/interact/version/2/account/microsoft/interaction/1461173234028-3884f8602eccbe259104553afa8415434b4581-05d1/' + code_id + '/navigation',
        headers=headers, data=data)


def get_two():
    headers = {
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'navigationStartTime': '1642684324551',
        'Protocol-Version': '5',
        'Run-Mode': 'FULL',
        'Screen-Height': '1600',
        'Channel-Type': 'MOBILE_WEB',
        'Time-Zone': '480',
        'Device-OS': 'Mac',
        'Application-Version': '7.0.0.4-1',
        'Screen-Width': '2560',
        'Environment-Name': 'Prod',
        'sec-ch-ua-platform': '"macOS"',
        'Object-Step-Id': '1521568557471-365520f048c9eb0b352277ba5bf116243659b8e-71ba',
        'Request-Timestamp': '1642655529202',
        'Longitude': '',
        'Content-Type': 'application/json;charset=UTF-8',
        'Application-Key': '196de13c-e946-4531-98f6-2719ec8405ce',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Tenant-Id': 'microsoft',
        'Device-OS-Version': 'OS X 10_15_',
        'User-Id': UserId,
        'Browser': 'Chrome',
        'Browser-Version': '97.0.4692.71',
        'Jma-Module-Version': '7',
        'Time-Stamp': '1642684324551',
        'J-User-Id': 'cd29a16d891a-048b550051205816-05f1',
        'X-Requested-With': 'XMLHttpRequest',
        'Latitude': '',
        'Locale': 'zh-CN',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'Jma-Version': '7.0.0.39',
        'Space-Id': 'null',
        'Security-Token': 'undefined',
        'Imei': '1642645060975Chrome97.0.4692.71MacOS X 10_15_',
        'Object-Instance-Id': code_id,
        'Origin': 'https://microsoft.gointeract.io',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://microsoft.gointeract.io',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }

    data = {"navigationType": "NEXT", "param": [
        {"paramName": "1461173234025-3129f8602eccbe259104553afa8415434b4581-02de",
         "paramValue": "1461173234023-2568f8602eccbe259104553afa8415434b458-10ad"}],
            "variables": {"External Session Id": code_id, "Navigation Current Page": "67DigitQuestion",
                          "Customer ID": "cd29a16d891a-048b550051205816-05f1"}}

    response = requests.post(url=data_url, headers=headers, data=json.dumps(data))


def get_ret(code):
    if '-' in code:
        codeList = code.split('-')
    elif ' ' in code:
        codeList = code.split(' ')
    else:
        codeList = re.findall(r'\w{7}', code)

    # print(codeList)
    param = [
        {"paramName": "1461173234025-3148f8602eccbe259104553afa8415434b4581-02f1", "paramValue": "2127995"},
        {"paramName": "1461173234025-3156f8602eccbe259104553afa8415434b4581-02f9", "paramValue": "5379915"},
        {"paramName": "1461173234025-3153f8602eccbe259104553afa8415434b4581-02f6", "paramValue": "7970175"},
        {"paramName": "1461173234025-3150f8602eccbe259104553afa8415434b4581-02f3", "paramValue": "0048473"},
        {"paramName": "1461173234025-3158f8602eccbe259104553afa8415434b4581-02fb", "paramValue": "8009705"},
        {"paramName": "1461173234025-3157f8602eccbe259104553afa8415434b4581-02fa", "paramValue": "8465615"},
        {"paramName": "1461173234025-3155f8602eccbe259104553afa8415434b4581-02f8", "paramValue": "0398922"},
        {"paramName": "1461173234025-3152f8602eccbe259104553afa8415434b4581-02f5", "paramValue": "7084305"},
        {"paramName": "1461173234025-3151f8602eccbe259104553afa8415434b4581-02f4", "paramValue": "2840884"},
        {"paramName": "1461173234025-3154f8602eccbe259104553afa8415434b4581-02f7",
         "paramValue": code.replace('-', '').replace(' ', '')},
        {"paramName": "1461173234025-3149f8602eccbe259104553afa8415434b4581-02f2", "paramValue": "Submit"}]
    for i, x in enumerate(codeList):
        param[i]['paramValue'] = x
    # 3722991-2052134-9590361-2415700-1571141-1419854-7743790-7144130-2498563
    # 372299120521349590361241570015711411419854774379071441302498563
    headers = {
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'navigationStartTime': '1642687895419',
        'Protocol-Version': '5',
        'Run-Mode': 'FULL',
        'Screen-Height': '1600',
        'Channel-Type': 'MOBILE_WEB',
        'Time-Zone': '480',
        'Device-OS': 'Mac',
        'Application-Version': '7.0.0.4-1',
        'Screen-Width': '2560',
        'Environment-Name': 'Prod',
        'sec-ch-ua-platform': '"macOS"',
        'Object-Step-Id': '1461173234025-3145f8602eccbe259104553afa8415434b4581-02ee',
        'Request-Timestamp': '1642659132995',
        'Longitude': '',
        'Content-Type': 'application/json;charset=UTF-8',
        'Application-Key': '196de13c-e946-4531-98f6-2719ec8405ce',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Tenant-Id': 'microsoft',
        'Device-OS-Version': 'OS X 10_15_',
        'User-Id': UserId,
        'Browser': 'Chrome',
        'Browser-Version': '97.0.4692.71',
        'Jma-Module-Version': '7',
        'Time-Stamp': '1642687895419',
        'J-User-Id': 'cd29a16d891a-048b550051205816-05f1',
        'X-Requested-With': 'XMLHttpRequest',
        'Latitude': '',
        'Locale': 'zh-CN',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'Jma-Version': '7.0.0.39',
        'Space-Id': 'null',
        'Security-Token': 'undefined',
        'Imei': '1642645060975Chrome97.0.4692.71MacOS X 10_15_',
        'Object-Instance-Id': code_id,
        'Origin': 'https://microsoft.gointeract.io',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://microsoft.gointeract.io',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }

    data = {"navigationType": "NEXT", "param": param,
            "variables": {"External Session Id": code_id, "Navigation Current Page": "productKeyForm",
                          "Customer ID": "cd29a16d891a-048b550051205816-05f1"}}
    response = requests.post(
        'https://microsoft.gointeract.io/interact/version/2/account/microsoft/interaction/60898ce735877e652665c1ed/' + code_id + '/navigation',
        headers=headers, data=json.dumps(data))


def get_code():
    headers = {
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'Content-Type': 'application/json;charset=UTF-8',
        'Application-Key': '196de13c-e946-4531-98f6-2719ec8405ce',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'Tenant-Id': 'microsoft',
        'Environment-Name': 'Prod',
        'sec-ch-ua-platform': '"macOS"',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://microsoft.gointeract.io',
        'Accept-Language': 'zh-CN,zh;q=0.9',
    }
    response = requests.get('https://microsoft.gointeract.io/interact/interactionvar/' + code_id + '/chConfirmationNum',
                            headers=headers)
    print(response.text)


if __name__ == '__main__':
    # socks.set_default_proxy(socks.SOCKS5, "localhost", 8888)
    # socket.socket = socks.socksocket
    while True:
        code = input('输入序列码:')
        # code = '212799553799157970175004847380097058465615039892270843052840884'
        code_id, UserId = get_id()
        data_url = 'https://microsoft.gointeract.io/interact/version/2/account/microsoft/interaction/60898ce735877e652665c1ed/' + code_id + '/navigation'
        get_one()
        get_two()
        get_ret(code)
        get_code()
