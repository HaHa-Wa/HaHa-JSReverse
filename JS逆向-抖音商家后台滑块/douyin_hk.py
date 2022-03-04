import random
import math
import time
import json

import ddddocr
import requests
import execjs


def sigmoid(d, t, t1=1500):
    """
    :param d: 目标距离
    :param t: 运动时间
    :return: 目前位移距离
    """

    def g(t):
        return abs(1 / (1 + math.exp(-3.5 * t / t1)))

    return d * (g(t) / g(t1))


def make_raw_data(offset, tip_y, challenge_id, fp, cost=1500):
    print('make_raw_data:', offset, tip_y, challenge_id, fp)
    start_time = int(time.time() * 1000) - 2500
    print(start_time)
    start_point = {"x": 39, "y": 346, "time": start_time - 400}
    distance = 0
    drag_track = []
    slide_btn_track = []
    curY = start_point['y']
    cur = start_time
    end_time = start_time + cost
    while distance < offset:
        cur += random.randint(10, 20)
        mod = sigmoid
        x = int(mod(offset, cur - start_time, cost))
        if x > offset:
            x = offset
        distance = x
        drag_track.append({
            "x": x,
            "y": tip_y,
            "relative_time": cur - start_time
        })
        slide_btn_track.append(
            {
                'x': x + 21,
                'y': curY + 300,
                'time': cur
            }
        )
        curY += random.choice([0, 1, 0, 1, 0, 0])
    reply = drag_track
    models = {
        "x": start_point,
        "y": start_point,
        "z": [],
        "t": [],
        "m": slide_btn_track,
    }
    models2 = {
        "x": start_point,
        "y": start_point,
        "z": [],
        "t": [],
        # "m": [slide_btn_track[i] for i in range(len(slide_btn_track)) if i % 3 == 2]
    }
    slide_btn_track2 = [slide_btn_track[i] for i in range(len(slide_btn_track)) if i % 3 == 2]

    drag_track2 = [
        drag_track[i] for i in range(len(drag_track)) if i % 3 == 2
    ]

    reply2 = drag_track2
    log_params = {
        "aid": 4272,
        "did": "0",
        "iid": "0",
        "type": 2,
        "h5_sdk_version": "2.26.0",
        "platform": "pc",
        "os_name": "mac",
        "region": "cn",
        "fp": fp,
        "product_host": "fxg.jinritemai.com",
        "product_path": "/ffa/morder/order/list",
        "flag": 0,
        "key": "h5_action",
        "webdriver": "false",
        "drag_type": "btn",
        "challenge_code": 99999,
        "challenge_id": challenge_id,
        "mode": "slide",
        "moveArr": json.dumps(slide_btn_track),
        "models": json.dumps(models),
        "moveArr2": json.dumps(slide_btn_track2),
        "models2": json.dumps(models2),
        "time": end_time + 160
    }
    models["m"] = slide_btn_track
    models2["m"] = slide_btn_track2
    params = {
        'modified_img_width': 340,
        'id': challenge_id,
        'mode': 'slide',
        'reply': reply,
        'models': models,
        'log_params': json.dumps(log_params),
        'reply2': reply2,
        'models2': models2,
        "detRes": 520

    }
    return params


def discern_hk(url1, url2):
    """
    :param
    :return:
    {'target_y': 0, 'target': [189, 148, 299, 258]}
                        left_x, top_y, right_x, bottom_y
    """

    slide = ddddocr.DdddOcr(det=False, ocr=False)

    # with open(url1, 'rb') as f:
    #     target_bytes = f.read()

    target_bytes = requests.get(url1, headers=headers).content

    # with open(url2, 'rb') as f:
    #     background_bytes = f.read()
    background_bytes = requests.get(url2, headers=headers).content

    res = slide.slide_match(target_bytes, background_bytes, simple_target=True)
    return res


def getReceiveInfo(cookie):
    url = "https://fxg.jinritemai.com/api/order/receiveinfo?come_from=pc&aid=4272&order_id=4900430738392747220&appid=1&__token=b0d820e193376e26a4b3df76d3e6cf79&_bid=ffa_order&_lid=334782550460&msToken=H2DcORyRshF80pdXiJ0PnWXVVmU-OG8l_94wUbYjzN5LQ2l9uVQA8Zfwl8_LwiNfvHcZwKeHkPik3JmabMygT_fiJ42R7iA7GLGZAooo7vij3JKX-BJ3MTXjSWxbbT23&X-Bogus=DFSzsdVu-j0ANaZ6S57CQ37TlqtU&_signature=_02B4Z6wo00001zwmhZgAAIDAqPDelYQlERM8IoEAAK0goMk6JK5hz.KTDpcE9Epotdp0FdP3skW0Me68a9UYUKQVHeMN3-pYDtvlnaQozA2vjEnPNu0uVk5mg4lGsbyzmUqfllnSvR-6-isL0d"

    payload = {}
    headers = {
        'authority': 'fxg.jinritemai.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'accept': 'application/json, text/plain, */*',
        'sec-ch-ua-mobile': '?0',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://fxg.jinritemai.com/ffa/morder/order/list',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cookie': cookie
    }

    response = requests.request("GET", url, headers=headers, data=payload).json()['data']

    print(response['verify_params']['decision_conf'])
    return response['verify_params']['decision_conf']


def getverificationCodeimg(fp, detail):
    url = "https://verify.snssdk.com/captcha/get?lang=zh&app_name=&h5_sdk_version=2.26.0&sdk_version=3.3.5&iid=0&did=0&device_id=0&ch=web_text&aid=4272&os_type=2&mode=&tmp={0}&platform=pc&webdriver=false&fp={1}&type=verify&detail={2}&subtype=slide&challenge_code=3058&os_name=mac&h5_check_version=3.3.5".format(
        time.time(), fp, detail)

    payload = {}
    headers = {
        'authority': 'verify.snssdk.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'accept': 'application/json, text/plain, */*',
        'sec-ch-ua-mobile': '?0',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'sec-ch-ua-platform': '"macOS"',
        'origin': 'https://fxg.jinritemai.com',
        'sec-fetch-site': 'cross-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://fxg.jinritemai.com/',
        'accept-language': 'zh-CN,zh;q=0.9'
    }

    response = requests.request("GET", url, headers=headers, data=payload).json()['data']

    img_id = response['id']
    questionImgList = response['question']
    url1 = questionImgList['url1']
    url2 = questionImgList['url2']
    tip_y = questionImgList['tip_y']
    print(questionImgList)
    return img_id, url1, url2, tip_y


def encode_params(rawdata):
    with open('douyin_hk.js', 'r', encoding='UTF-8') as f:
        js_code = f.read()
    context = execjs.compile(js_code)
    result = context.call("encode_track", rawdata)  # 参数一为函数名，参数二和三为函数的参数
    return result


def post_verify(captchaBody, fp, detail):
    url = "https://verify.snssdk.com/captcha/verify?lang=zh&app_name=&h5_sdk_version=2.26.0&sdk_version=3.3.5&iid=0&did=0&device_id=0&ch=web_text&aid=4272&os_type=2&mode=slide&tmp={2}&platform=pc&webdriver=false&fp={0}&type=verify&detail={1}&subtype=slide&challenge_code=99999&os_name=mac&h5_check_version=3.3.5&xx-tt-dd=qJI7ttpVdGKKbSBvYqmaf0aPo".format(
        fp, detail, time.time())
    payload = json.dumps({"captchaBody": captchaBody})
    headers = {
        'authority': 'verify.snssdk.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
        'accept': 'application/json, text/plain, */*',
        'content-type': 'application/json;charset=UTF-8',
        'sec-ch-ua-mobile': '?0',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
        'sec-ch-ua-platform': '"macOS"',
        'origin': 'https://fxg.jinritemai.com',
        'sec-fetch-site': 'cross-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://fxg.jinritemai.com/',
        'accept-language': 'zh-CN,zh;q=0.9',
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)


def verify_hk(cookie):
    # 获取图片标记
    fp_detial = json.loads(getReceiveInfo(cookie))
    # 获取图片链接
    img_id, url1, url2, tip_y = getverificationCodeimg(fp_detial['fp'], fp_detial['detail'])
    # 识别图片缺口
    discern_res = discern_hk(url1, url2)['target']
    print(discern_res)
    # 图片大小 554 html展示大小为340  所以除以1.6
    # 生成滑块轨迹
    rawdata = make_raw_data(discern_res[0] // 1.6, tip_y, img_id, fp_detial['fp'], 1500)
    print(rawdata)
    # 加密滑块轨迹
    captchaBody = encode_params(rawdata)
    # 提交参数 实现验证
    post_verify(captchaBody, fp_detial['fp'], detail=fp_detial['detail'])

if __name__ == '__main__':
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
        "referer": "https://fxg.jinritemai.com/",
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://fxg.jinritemai.com',
        'accept': 'application/json, text/plain, */*'
    }

    cookie = 'passport_csrf_token_default=655cdd082546156cb2fff335244c177a; passport_csrf_token=655cdd082546156cb2fff335244c177a; Hm_lvt_b6520b076191ab4b36812da4c90f7a5e=1644897534,1645602239; _tea_utm_cache_4031=undefined; uidpasaddaehruigqreajf=0; MONITOR_WEB_ID=67dbd567-5889-4c28-9bdf-94a5ffaa6763; x-jupiter-uuid=16462059113691674; n_mh=9-mIeuD4wZnlYrrOvfzG3MuT6aQmCUtmr8FxV8Kl8xY; need_choose_shop=0; gf_part_152785=1; _tea_utm_cache_2018=undefined; s_v_web_id=verify_8bf9642ce76699838d3607dd2d5d5b95; _tea=TEA-8cbe2feb-d6a1-5a16-557b-38d25739fd71; fxg_guest_session=eyJhbGciOiJIUzI1NiIsInR5cCI6InR5cCJ9.eyJndWVzdF9pZCI6IkNnc0lBUkR6SEJnQklBRW9BUkkrQ2p3QUVoNTg0TUI4dk5lZzRWalVqRHJtTjJCSlBKbG9WMC9BcGxqZHc4UVZBWG1CTHc4bDIzTkM5THFOTk1pSWZWNWtacGU3MEVEYzRPS2l0c29hQUE9PSIsImlhdCI6MTY0NjI3NTA1NCwibmJmIjoxNjQ2Mjc1MDU0LCJleHAiOjE2NDc1NzEwNTR9.27f1565015b0cbf3e0d063eb6b0e30b1763e84fb67e64ef2a5a634e236aa91a2; ttwid=1%7C0VoVn_kMi6uTPKOk3kJp7CwiOyk6Kk597H3R0YGkm6c%7C1646275065%7C8cae0e4a9dca1513d4b3c0bc152f587c2b6191ffc74332b2717ca705301a523d; sso_uid_tt=b04afea38daa63e751e759af58af8381; sso_uid_tt_ss=b04afea38daa63e751e759af58af8381; toutiao_sso_user=08db3b5086b3ab12c695fde0eb4596ed; toutiao_sso_user_ss=08db3b5086b3ab12c695fde0eb4596ed; sid_ucp_sso_v1=1.0.0-KGM2NDMyMGIxZWE2ZmQxZWZmNWU0MmQwNjViMTE5NTFkYmM0N2MyZTQKHwjegJD90o28BxD904CRBhiwISAMMKf5y4YGOAFA6wcaAmxmIiAwOGRiM2I1MDg2YjNhYjEyYzY5NWZkZTBlYjQ1OTZlZA; ssid_ucp_sso_v1=1.0.0-KGM2NDMyMGIxZWE2ZmQxZWZmNWU0MmQwNjViMTE5NTFkYmM0N2MyZTQKHwjegJD90o28BxD904CRBhiwISAMMKf5y4YGOAFA6wcaAmxmIiAwOGRiM2I1MDg2YjNhYjEyYzY5NWZkZTBlYjQ1OTZlZA; odin_tt=66e90418d6eb7ff8711bd661d561abda18fd01650bc9ad2c997880f1e4a60d70650ab34240fb4274f3ef5e1b6325cbf5d42746aeb97bbe3312653c819a170063; ucas_sso_c0_ss=CkEKBTEuMC4wEI6Ij8TfvYqQYhjmJiCH59Dv44y8ByiwITDegJD90o28B0D_04CRBkj_h72TBlCOvNa2qaCr6WBYbxIUU-pn4ShO6IkcxUv59CX2sXYuYcw; ucas_sso_c0=CkEKBTEuMC4wEI6Ij8TfvYqQYhjmJiCH59Dv44y8ByiwITDegJD90o28B0D_04CRBkj_h72TBlCOvNa2qaCr6WBYbxIUU-pn4ShO6IkcxUv59CX2sXYuYcw; ucas_c0_ss=CkEKBTEuMC4wEKeIgcy_voqQYhjmJiCH59Dv44y8ByiwITDegJD90o28B0D_04CRBkj_h72TBlCOvNa2qaCr6WBYbxIUSNxF38HZ7T2LHdc0YPpqDew355E; sid_guard=c5c524156213ee0b35b26169c0129e8b%7C1646275071%7C5184000%7CMon%2C+02-May-2022+02%3A37%3A51+GMT; uid_tt=2dab8c8b64b78000636249b03a421ef4; uid_tt_ss=2dab8c8b64b78000636249b03a421ef4; sid_tt=c5c524156213ee0b35b26169c0129e8b; sessionid=c5c524156213ee0b35b26169c0129e8b; sessionid_ss=c5c524156213ee0b35b26169c0129e8b; sid_ucp_v1=1.0.0-KDllZDJlYWIyNjIzNDJiOTQzOTc4ZmZkMjc3ZGExN2Y0MzJjNzY4MDEKFwjegJD90o28BxD_04CRBhiwITgBQOsHGgJobCIgYzVjNTI0MTU2MjEzZWUwYjM1YjI2MTY5YzAxMjllOGI; ssid_ucp_v1=1.0.0-KDllZDJlYWIyNjIzNDJiOTQzOTc4ZmZkMjc3ZGExN2Y0MzJjNzY4MDEKFwjegJD90o28BxD_04CRBhiwITgBQOsHGgJobCIgYzVjNTI0MTU2MjEzZWUwYjM1YjI2MTY5YzAxMjllOGI; ucas_c0=CkEKBTEuMC4wEKeIgcy_voqQYhjmJiCH59Dv44y8ByiwITDegJD90o28B0D_04CRBkj_h72TBlCOvNa2qaCr6WBYbxIUSNxF38HZ7T2LHdc0YPpqDew355E; PHPSESSID=e1c9cbf3bd796f93fc9a40cd8fba9bd0; PHPSESSID_SS=e1c9cbf3bd796f93fc9a40cd8fba9bd0; login_info=%7B%22for_im_reply%22%3A%22e1c9cbf3bd796f93fc9a40cd8fba9bd0%22%7D; Hm_lpvt_b6520b076191ab4b36812da4c90f7a5e=1646275075; msToken=6pfXEKqg7Gd23QIhGqV6P0lZBZ4VVYuhXI2BTV-UMb4BTuGpqo1X-3aAqSGDDPzg68Vky2j1ndSe5MZgHVD6o7-ExHBJbppkAlGsdjoHLtIogOX45delLJs=; gftoken=YzVjNTI0MTU2MnwxNjQ2Mjc1MDg0MTV8fDAGBgYGBgY; tt_scid=fuHhMKu8C387-9DCG7vFtVPda6B3jzhc8I3BVIvajPTdR91AIOHLoNS6FlqdquWq63e8'
    verify_hk(cookie)