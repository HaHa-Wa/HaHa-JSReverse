# 本代码基于python3.6.1测试通过

import base64
from Crypto.Cipher import AES
from io import StringIO
import gzip

'''
采用AES对称加密算法
'''


# str不是16的倍数那就补足为16的倍数
def add_to_16(value):
    while len(value) % 16 != 0:
        value += '\0'
    return str.encode(value)  # 返回bytes


# 加密方法
def encrypt_oracle():
    # 秘钥
    key = 'jiayanmiyao'
    # 待加密文本
    text = '{"t0":1646727709164,"tp":3,"ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36","rf":"","hl":"000000000001010","sc":{"w":2560,"h":1440},"ihs":1,"platform":1}'
    # 初始化加密器
    aes = AES.new('bN3%cH2$H1@*jCo$'.encode('utf-8'), AES.MODE_CBC, 'gl3-w^dN)3#h6E1%'.encode('utf-8'))
    text = add_to_16(text)
    print(text)
    bytes_com = gzip.compress(str(text).encode("utf-8"))
    # base64_data = base64.b64encode(bytes_com)
    # back = str(base64_data.decode())
    print('back:',bytes_com, '\n')
    # 先进行aes加密
    # 用base64转成字符串形式
    encrypted_text = base64.encodebytes(text)  # 执行加密并转码返回bytes  # str(encoding=utf-8)
    print('encrypted_text:',encrypted_text)
    # #gzip压缩
    en_gzip = gzip.compress(encrypted_text)
    print(en_gzip)
    #base64编码
    en_base64 = base64.b64encode(en_gzip)
    encrypt_aes = aes.encrypt(en_base64)
    print(encrypt_aes)
    return en_base64


# 解密方法
def decrypt_oralce(text):
    # 秘钥
    key = 'jiayanmiyao'
    # 密文
   # base64解码
    de_base64 = base64.b64decode(text)
   # gzip解压
    de_gzip = gzip.decompress(de_base64)

    text = str(de_gzip, encoding="utf-8")
    # 初始化加密器
    aes = AES.new('bN3%cH2$H1@*jCo$'.encode('utf-8'), AES.MODE_CBC, 'gl3-w^dN)3#h6E1%'.encode('utf-8'))
    # 优先逆向解密base64成bytes
    base64_decrypted = base64.decodebytes(text.encode(encoding='utf-8'))
    # 执行解密密并转码返回str
    decrypted_text = str(aes.decrypt(base64_decrypted), encoding='utf-8').replace('\0', '')
    return decrypted_text


if __name__ == '__main__':
    en_result = encrypt_oracle()
    print(en_result)
    # de_result = decrypt_oralce(en_result)
    # print(de_result)