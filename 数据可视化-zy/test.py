# x= 0
# a = 8
# b = 4
# # y = round(((1 - a * a * x * x) / (b * b)) ** 0.5, 8)
# y = (1 - a * a * x * x) / (b * b)
# print(y)
import numpy as np
import matplotlib.pyplot as plt

z = -np.linspace(9,15,100)
x = np.linspace(-26,26,100)

x, z = np.meshgrid(x, z)
print(x,z)
Z = -np.exp(-0.05*z) + 4 * (z+10)**2
X = x**2


plt.contour(x, z, (X+Z), [0])
plt.xlim([-1.5,1.5])
plt.ylim([-11.5,-8.5])
plt.show()