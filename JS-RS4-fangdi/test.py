# -*- coding: utf-8 -*-
"""
@Time ： 2022/12/19 5:52 下午
@Auth ： HaHa-Wa
@File ：test.py
@IDE ：PyCharm
"""
import re
import execjs
import requests

headers = {
    'Host': 'www.fangdi.com.cn',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Referer': 'http://www.fangdi.com.cn/new_house/new_house_detail.html?project_id=d7d3e455bdfb1f0b',
    'Accept-Language': 'zh-CN,zh;q=0.9',
}

response = requests.get('http://www.fangdi.com.cn/new_house/new_house_detail.html?project_id=d7d3e455bdfb1f0b',
                        headers=headers)
print(response.status_code)
# if response.status_code == 200:
print(response.text)
res_headers = response.headers
S_cookie = res_headers['Set-Cookie'].split(';')[0]
# print(S_cookie)

content = re.findall(r'meta content="(.*?)"', response.text)[0]
fiee_func = '(function' + re.findall(r'r="m">\(function(.*?)</script>', response.text)[0]
js_href = "http://www.fangdi.com.cn" + re.findall(r'59-1" src="(.*?)" r=', response.text)[0]
ts_text = requests.get(js_href, headers=headers).text
eval_text = '''
(function f() {
    var eval_js = ""

    window = {
        $_ts: {},
        eval: function (data) {
            eval_js = data
        }
    }
    location = {
        "ancestorOrigins": {},
        "href": "http://www.fangdi.com.cn/new_house/new_house_detail.html?project_id=d7d3e455bdfb1f0b",
        "origin": "http://www.fangdi.com.cn",
        "protocol": "http:",
        "host": "www.fangdi.com.cn",
        "hostname": "www.fangdi.com.cn",
        "port": "",
        "pathname": "/new_house/new_house_detail.html",
        "search": "?project_id=d7d3e455bdfb1f0b",
        "hash": ""
    }
    document = {
        "scripts": ["script", "script"]
    }
    window.document = document
    %s
    %s
    //console.log(Object.keys(window.$_ts))
    //console.log(window.$_ts)
    // console.log(eval_js)
    return {'$_ts': window.$_ts, 'eval_js': eval_js}
})()
''' % (ts_text, fiee_func)
# print(eval_text)
ret = execjs.eval(eval_text)
# print(ret['$_ts'])

ts = ret['$_ts']
eval_js = ret['eval_js']
base_index = [
    '_$Ki',
    '_$im',
    '_$dv',
    '_$cC',
    '_$_O',
    '_$I$',
    '_$Jz',
    '_$xS',
    '_$Br',
    '_$jO',
    '_$Hb',
    '_$Pf',
    '_$fW',
    '_$oX',
    '_$9Y',
    '_$Vy',
    '_$9h',
    '_$mI',
    '_$I7',
    '_$7t'
]
ts_v4_variable = re.findall(r'\[29\]\]\(\[(.*?)\]\)', eval_js)[0].split(',')
# print(ts_v4_variable)
ts_variable_name = ts_v4_variable[0].split('.')[0].replace('_$', '')
# ts_variable_name = 'bq'
# print(ts_variable_name)
ts_20_function = re.findall(r'(_\$%s\._\$\S{2}=_\$\S{2};)' % ts_variable_name, eval_js)

ts_v4_variable_index = []
for t4V in ts_v4_variable:
    t4v_value = ts[t4V.split('.')[1]]
    # print(t4V.split('.')[1], t4v_value)
    for t in ts_20_function:
        if t4v_value in t:
            ts_v4_variable_index.append(ts_20_function.index(t))
# print(ts_v4_variable_index)
# [19, 15, 0, 2]
# index_list = []
# haha = {
#     '15': 181,
#     '2': 102,
#     '0': 103,
#     '19': 127
# }
# for index in ts_v4_variable_index:
#     index_list.append(haha[str(index)])
# print(index_list)
# _$bq._$eV, _$bq._$wg, _$bq._$_X, _$bq._$DI
cookie_js = '''

(function get_rs_cookie() {
    var eval_js = ""
    content = "%s"
    window = {
        $_ts: %s,
    }
    ''' % (content, str(ts) )
with open('base_two.js', 'r')as f:
    base_js = f.read()
cookie_js += base_js
# print(cookie_js)
ts_key = list(ts.keys())
cookie_js = cookie_js.replace("[_$bq._$eV]", "['%s']" % base_index[ts_v4_variable_index[0]])
cookie_js = cookie_js.replace("[_$bq._$wg]", "['%s']" % base_index[ts_v4_variable_index[1]])
cookie_js = cookie_js.replace("[_$bq._$_X]", "['%s']" % base_index[ts_v4_variable_index[2]])
cookie_js = cookie_js.replace("[_$bq._$DI]", "['%s']" % base_index[ts_v4_variable_index[3]])
print(ts_key)
cookie_js = cookie_js.replace('_$bq._$Ny', '_$bq.%s' % ts_key[2])
cookie_js = cookie_js.replace('_$bq._$Dg', '_$bq.%s' % ts_key[3])
cookie_js = cookie_js.replace('_$bq._$H7', '_$bq.%s' % ts_key[4])
cookie_js = cookie_js.replace('_$bq._$AC', '_$bq.%s' % ts_key[15])
cookie_js = cookie_js.replace('_$bq._$2K', '_$bq.%s' % ts_key[16])
cookie_js = cookie_js.replace('_$bq._$05', '_$bq.%s' % ts_key[17])
cookie_js = cookie_js.replace('_$bq._$s3', '_$bq.%s' % ts_key[19])

# print(ret)
with open('new.js', 'w')as f:
    f.write(cookie_js)
ret = execjs.eval(cookie_js)

cookies = {
    'www.fangdi.com_http_ic': 'www.fangdi.com.cn_80_RS',
    'FSSBBIl1UgzbN7N80S': S_cookie,
    'FSSBBIl1UgzbN7N80T': ret,
}
response = requests.get('http://www.fangdi.com.cn/new_house/new_house_detail.html?project_id=d7d3e455bdfb1f0b',
                        headers=headers, cookies=cookies)
print(response.status_code)
