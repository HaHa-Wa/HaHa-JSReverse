import base64

from Crypto.Cipher import AES


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
        return text.rstrip(self.coding)


if __name__ == '__main__':
    iv = 'gl3-w^dN)3#h6E1%'
    key = 'bN3%cH2$H1@*jCo$'
    a = Encrypt(key=key, iv=iv)
    e = a.aes_encrypt(
        '\x1F\x8B\b\x00\x00\x00\x00\x00\x00\x03EOM\x8BÂ0\x10ý+Ã\x9C\x14B\x9AØ6ÙfO\x8B\x07wÑâAAo\x92-)\tFSÚ\x88 øßw\x0E\vÎ\x1CÞ\x07<æÍ\x13³@#U¥´lD)\x9B\x0FÁ0\x0FhJ\x867\x8B\x06Ûô\b1Ú¢æ\x02f­íÂ5§É\x7FÂÏ5»\bdÀv\x07G\x90â$ë\x93\x9EÃ×0Dwp¿ë\x90\x8BºÔ¼T0[\x7FïÛ\r\x83\x18Î\x0EV®;§9,ý\x98.®h4\x17¼RÍ\x82k\t;ÛÛ1ü§\x90áØÓ}B\x1F\tÅ{$-ÙS\x87æ\x89w4\x8BZQiOoT\x95x1\f~"Îp\x886÷i¼\x90xý\x01µp\x8B%è\x00\x00\x00')
    # d = a.aes_decrypt(e)
    print("加密:", e)
    # print("解密:", d)
