# https://blog.csdn.net/weixin_30819085/article/details/98844077
import numpy as np
import matplotlib.pyplot as plt

z = -np.linspace(9,15,100)
x = np.linspace(-26,26,1000)
x, z = np.meshgrid(x, z)
Z = -np.exp(-0.05*z) + 4 * (z+10)**2
X = x**2
print(type(X+Z))

# 绘制轮廓线
plt.contour(x, z, (X+Z), [0])

# 限制横轴 纵轴大小
plt.xlim([-1.5,1.5])
plt.ylim([-11.5,-8.5])
plt.show()