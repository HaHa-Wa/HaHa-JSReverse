import cv2.cv2


def identify_gap(bg, tp, out):
    '''
    bg: 背景图片
    tp: 缺口图片
    out:输出图片
    '''
    # 读取背景图片和缺口图片
    bg_img = cv2.imread(bg)  # 背景图片
    tp_img = cv2.imread(tp)  # 缺口图片

    # 识别图片边缘
    bg_edge = cv2.Canny(bg_img, 100, 200)
    tp_edge = cv2.Canny(tp_img, 100, 200)

    # cv2.imwrite(bg_edge, 'b1.png')  # 保存在本地
    # cv2.imwrite(tp_edge, 'q1.png')  # 保存在本地

    # 转换图片格式
    bg_pic = cv2.cvtColor(bg_edge, cv2.COLOR_GRAY2RGB)
    tp_pic = cv2.cvtColor(tp_edge, cv2.COLOR_GRAY2RGB)
    # print(type(bg_pic))
    from PIL import Image
    im = Image.fromarray(bg_pic)
    im.save("your_file.jpeg")
    # cv2.imwrite(bg_pic, 'b1.png')  # 保存在本地
    # cv2.imwrite(tp_pic, 'q1.png')  # 保存在本地
    # 缺口匹配
    res = cv2.matchTemplate(bg_pic, tp_pic, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)  # 寻找最优匹配

    # 绘制方框
    th, tw = tp_pic.shape[:2]
    print(th, tw)
    tl = max_loc  # 左上角点的坐标
    br = (tl[0] + tw, tl[1] + th)  # 右下角点的坐标
    cv2.rectangle(bg_img, (tl[0]-7, tl[1]), br, (0, 0, 255), 1)  # 绘制矩形
    cv2.imwrite(out, bg_img)  # 保存在本地

    # 返回缺口的X坐标
    return tl[0]


x = identify_gap('b.jpeg', 'que.jpeg', 'haha.png')
print(x)
