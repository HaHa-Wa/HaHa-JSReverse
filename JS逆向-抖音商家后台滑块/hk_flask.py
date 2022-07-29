import random
import math
import time
import json
import ddddocr
import requests
import execjs
from flask import Flask, request, jsonify
from flask_cors import CORS

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
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
        "referer": "https://fxg.jinritemai.com/",
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://fxg.jinritemai.com',
        'accept': 'application/json, text/plain, */*'
    }

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
    url = "https://fxg.jinritemai.com/api/order/receiveinfo"
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
    return response.json()


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
    response = post_verify(captchaBody, fp_detial['fp'], detail=fp_detial['detail'])
    return response


app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/getDiscern', methods=['POST'])
def getDiscern():
    cookie = request.form['cookie']
    # data = request.get_json()
    # print(data)
    # cookie = data['cookie']

    res = verify_hk(cookie)
    print(res)
    return jsonify({
        "status": 200,
        'response':res
    })


if __name__ == '__main__':
    app.run()