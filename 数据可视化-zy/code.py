# 1、使用 plot 和 fill 实现一个函数 ellipse(a, b, center=(0, 0), color='b', num=100, fill=False, edge=True, alpha=1.0)，功能为
# 在直角坐标系中绘制一个椭圆。（
# 1) 椭圆方程为：𝑥2 𝑎2 + 𝑦2 𝑏2 = 1，其中 a, b 均大于 0
# 2) a, b：对应方程中的 a、b，根据 a 和 b 的数量关系判断长轴的方向（水平或竖直）
# 3) center：array-like，椭圆的中心坐标
# 4) color：str，圆的线条和图形填充色
# 5) num：int, 用于描圆的点的个数
# 6) fill：bool, 是否填充椭圆
# 7) edge：bool，仅在设置 fill 参数时有用，设置是否为椭圆描边，颜色与 color 相同
# 8) alpha：scalar，透明度
# 9) 测试要求：使用子图划分绘制不低于三个图，考虑 a<b，a=b, a>b，三种情况，且至少有一个子图的中心不是原点。

import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Ellipse

def ellipse(a, b, center=(0, 0), color='b', num=100, fill=True, edge=True, alpha=1.0):
    # print(center[0]-a/2, center[0]+a/2)

    x = np.linspace(start=center[0]-a/2, stop=center[0]+a/2, num=num)
    y = np.zeros(shape=num)
    # print(y)
    for i in range(0,num):
        y[i] = round((1- a/2*a/2*x[i]*x[i])/((b/2)*(b/2))**0.5,8)
    fig = plt.figure()
    ax = fig.add_subplot(111)
    ax.plot(x, y, '.')
    ax.plot(x, -y, '.')
    plt.axis('scaled')
    plt.show()

ellipse(8,16)