import base64
import gzip
import base64
import json

from Crypto.Cipher import AES
from Crypto.Util.Padding import pad


class Encrypt:
    def __init__(self, key, iv):
        self.key = key.encode('utf-8')
        self.iv = iv.encode('utf-8')

    # @staticmethod
    def pkcs7padding(self, text):
        """
        明文使用PKCS7填充
        """
        bs = 16
        length = len(text)
        bytes_length = len(text.encode('utf-8'))
        padding_size = length if (bytes_length == length) else bytes_length
        padding = bs - padding_size % bs
        padding_text = chr(padding) * padding
        self.coding = chr(padding)
        return text + padding_text

    def aes_encrypt(self, content):
        """
        AES加密
        """
        cipher = AES.new(self.key, AES.MODE_CBC, self.iv)
        # 处理明文 填充字符
        content_padding = self.pkcs7padding(content)
        # 加密
        encrypt_bytes = cipher.encrypt(content_padding.encode('utf-8'))
        # 重新编码
        result = str(base64.b64encode(encrypt_bytes), encoding='utf-8')
        return result

    def aes_decrypt(self, content):
        """
        AES解密
        """

        cipher = AES.new(self.key, AES.MODE_CBC, self.iv)
        content = base64.b64decode(content)
        text = cipher.decrypt(content).decode('utf-8'
                                              )
        print(text)
        return text.rstrip(self.coding)


if __name__ == '__main__':
    iv = 'gl3-w^dN)3#h6E1%'
    key = 'bN3%cH2$H1@*jCo$'
    s = '{"t0":1646725742619,"tp":3,"ua":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36","rf":"","hl":"000000000001010","sc":{"w":2560,"h":1440},"ihs":1,"platform":1}'
    # ss = base64.b64encode(s.encode())
    # print(ss)
    # t = gzip.compress(ss)
    a = Encrypt(key=key, iv=iv)
    # print(str(t)[2:-1])
    # e = a.aes_encrypt(
    #     str(t)
    # )
    e = 'ivkOUHSEo1DzCHKiiGc/R1qyGal/XwewdgR5Ph0+2Gzuugb7D317MTUbiJ1gY9pXH7rL78rbSVR5ghL6dacb39mDKgH0eH+Ump4Tb43gWezj8iSTyrmx6HNAnJRAZAQa4TqZsqFXsAua8I+uKKW/15/0alotlVQH7IiWlPBZ6WLUV6xoiZyZsHn0FVnF3P/AY3DGvho5pVyMF/YJSIB5hT8e+ZF0u13R3WojniUrlq0GXdKduFjqK45bppGCeDWcEBdMbfW7jEt97NgVauJqHICprCXsIkCumoBu4DkbDy3AxT3PPTV60YkDMWomTD57Nl5TaKR/Dv7cuDtYzhhJY2OFK4CEF47Fpy2jD2SOLHWQ18k6DrWrZ1OpUzL7ofNyIX211NBzBAUICtadHxmcYw=='
    # d = a.aes_decrypt(e)
    aes = AES.new('bN3%cH2$H1@*jCo$'.encode('utf-8'), AES.MODE_CBC, 'gl3-w^dN)3#h6E1%'.encode('utf-8'))
    aes_de = AES.new('bN3%cH2$H1@*jCo$'.encode('utf-8'), AES.MODE_CBC, 'gl3-w^dN)3#h6E1%'.encode('utf-8'))
    print('e.encode:', e.encode())
    print('base64.b64decode(e.encode()):',base64.b64decode(e.encode()))
    dec = aes.decrypt(base64.b64decode(e.encode()))
    print('dec:',dec)

    print('dec:',dec.decode())
    print(base64.b64encode(aes_de.encrypt(dec)))
    array_list = []
    for i in dec.decode():
        try:
            array_list.append(ord(i))
        except:
            print(i)
    print('array_list:',array_list)
    print('bytearray(array_list[:2]):',bytearray(array_list[:-2]))
    print(bytearray(array_list[:-2]))
    g_zip = gzip.decompress(bytearray(array_list[:-2]))
    print(g_zip.decode())
    print('gzip.decompress(bytearray(array_list[:-2])):', g_zip)
    print(base64.b64encode(g_zip))
    s_arry = [ord(i) for i in g_zip.decode()]
    print(s_arry)
    com_zip = gzip.compress(bytearray(s_arry))
    print(com_zip)
    print(base64.encodebytes(com_zip))

    #
    # print('g_zip-com:',str(base64.b64encode(com_zip), encoding='utf-8'))
    # print(gzip.decompress(com_zip).decode())
    # print(com_zip)