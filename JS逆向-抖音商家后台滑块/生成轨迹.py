import random
import math
import time
import json


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
    start_time = int(time.time() * 100) - 2500
    print(start_time)
    start_point = {"x": 39, "y": 489, "time": start_time - 463}
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
                'x': x + 51,
                'y': curY + 300,
                'time': cur}
        )
        curY += random.choice([0, 1, 0, 1, 0, 0])
    reply = drag_track
    models = {
        "x": start_point,
        "y": start_point,
        "z": [],
        "t": [],
        # "m": slide_btn_track,
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
    print("moveArr:")
    print(len(slide_btn_track))
    print("moveArr2:")
    print(len(slide_btn_track2))
    print("reply1:")
    print(len(drag_track))
    print("reply2:")
    print(len(drag_track2))
    log_params = {
        'aid': 6383,
        'challenge_code': 3058,
        'challenge_id': challenge_id,
        'did': '0',
        'drag_type': "btn",
        'flag': 0,
        'fp': fp,
        'h5_sdk_version': "2.22.2",
        'iid': '0',
        'key': "h5_action",
        'mode': "slide",
        'moveArr': json.dumps(slide_btn_track),
        'models': json.dumps(models),
        'moveArr2': json.dumps(slide_btn_track2),
        'models2': json.dumps(models2),
        'os_name': "mac",
        'platform': "pc",
        'product_host': "www.douyin.com",
        'product_path': "/",
        'region': "cn",
        'time': end_time + 160,  # 提交时间
        'type': 2,
        'webdriver': "false"}
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
        'models2': models2
    }
    # params = json.dumps(params)
    return params


rawdata = make_raw_data(159, 46, "f35ef6de81111b5c068d48be2e67a2dfff9b714c",
                        "verify_2202177b6b6d1fd0402979f79696e118",
                        1500)
print(rawdata)
