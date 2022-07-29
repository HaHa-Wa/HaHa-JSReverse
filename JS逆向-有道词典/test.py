import requests
import execjs
import hashlib


def get_salt(info):
    # def get_m_info(page):
    with open('youdao.js', "r") as f:
        prob_js = f.read()
    docjs = execjs.compile(prob_js)
    ret = docjs.call('youdao', info)
    return ret


def main():
    url = "https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
        "Cookie": "OUTFOX_SEARCH_USER_ID=-1554138040@10.169.0.84; JSESSIONID=aaapW9aLopu_9fyHTpkJx; OUTFOX_SEARCH_USER_ID_NCOO=1493641069.5893097; ___rl__test__cookies=1618814880882",
        "Referer": "https://fanyi.youdao.com/"
    }
    salt_dict = get_salt(word)
    md5 = hashlib.md5()
    md5.update(salt_dict.get('sign').encode())
    sign = md5.hexdigest()
    print(salt_dict)
    data = {
        "i": word,
        "from": "AUTO",
        "to": "AUTO",
        "smartresult": "dict",
        "client": "fanyideskweb",
        'salt': salt_dict.get('salt'),
        'sign': sign,
        'lts': salt_dict.get('ts'),
        'bv': 'b286f0a34340b928819a6f64492585e8',
        'doctype': 'json',
        'version': '2.1',
        'keyfrom': 'fanyi.web',
        'action': 'FY_BY_REALTlME'
    }

    response = requests.post(url, headers=headers, data=data)
    print(response.json())


if __name__ == '__main__':
    word = '早上好'
    main()
