
import json
import os
import time

from uiautomation import WindowControl, SetClipboardText
from flask import Flask, request, jsonify
from gevent.pywsgi import WSGIServer


class WeChatUiAutomation():
    def __init__(self):

        self.wechatWindow = WindowControl(
            searchDepth=1, Name="微信", ClassName='WeChatMainWndForPC')
        if not self.wechatWindow.Exists(2, 1):
            raise '微信窗口未打开'
        self.wechatWindow.SetActive()
        self.search = self.wechatWindow.EditControl(Name='搜索')
        self.inputText = self.wechatWindow.EditControl(name='输入')
        self.userPic = self.wechatWindow.ButtonControl(foundIndex=1)

    def search_info(self, idOrName):
        self.search.SendKeys('{Enter}')
        SetClipboardText(idOrName)
        time.sleep(0.5)
        self.search.Click()

        self.search.SendKeys('{Ctrl}v')
        self.search.SendKeys('{Enter}')

    def sendMessages(self, idOrName, messages):
        self.search_info(idOrName)
        for message in messages:
            SetClipboardText(str(message['text']))
            self.inputText.SendKeys('{Ctrl}v')
            self.inputText.SendKeys('{Enter}')
        return {
            'status': 200,
            'msg': True
        }

    def getUserInfo(self):
        self.inputText.SendKeys('{Enter}')
        self.userPic.Click()
        try:
            name = self.wechatWindow.EditControl(searchDepth=8, foundIndex=1).Name
            wxId = self.wechatWindow.EditControl(searchDepth=8, foundIndex=2).Name
        except LookupError:
            raise LookupError
        return name, wxId


app = Flask(__name__)
weChat = WeChatUiAutomation()

cfg_path = "config.json"
if os.path.isfile(cfg_path):
    with open(cfg_path) as f:
        config = json.load(f)
        app.config.update(config)
else:
    print("NO-CONFIG-FILE-FOUND")


@app.route("/")
def helloWord():
    return '<p>启动成功</p>'


@app.route("/exeStatus")
def exeStatus():
    status = True

    wx = WindowControl(searchDepth=1, Name="微信", ClassName='WeChatMainWndForPC')
    if not wx.Exists(2, 1):
        status = False

    return jsonify({
        'status': 200,
        'msg': status,

    })


@app.route('/status')
def getUserInfo():
    result = dict(logined=False, msg='未找到微信窗口或窗口被遮挡')
    try:
        NickName, Uin = weChat.getUserInfo()
        result = dict(
            logined=True,
            nickname=NickName,
            uin=Uin,
        )
    except:
        pass
    return jsonify(result)


@app.route("/sendMessages", methods=['POST'])
def sendMessages():
    data = request.get_json()
    idOrName = data['idOrName']
    messages = data['messages']
    ret = weChat.sendMessages(idOrName, messages)
    return jsonify(ret)


if __name__ == '__main__':
    server = WSGIServer(("0.0.0.0", app.config.get("PORT", 5000)), app)
    print("Server started")
    server.serve_forever()
