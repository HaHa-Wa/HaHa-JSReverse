import requests

url = 'https://sd-pingback.cn-beijing.log.aliyuncs.com/logstores/sd-pingback/track?APIVersion=0.6.0&qbGuid=undefined&v=19052215&messageType=event&category=all&action=fetchMore&actionLabel=all&actionValue=3&requestId=86c180a1-49b6-4695-bfa2-f67d275f7723&stayTime=226003&x-app-version=&x-channel=qq_web&x-connection=wifi&x-device-brand=&x-device-id=QnuWjqdvuUgdBdLBo9ElyLBVfCEoKhna&x-device-model=&x-device-system=iOS_qq_web&x-device-version=&x-location=%25u4E0A%25u6D77%25u5E02&x-position=31.224348955%2C121.4767528'

ret = requests.get(url).text
print(ret)