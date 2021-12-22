import pandas as pd
import numpy as np
from openpyxl import Workbook
import json


def processing_data(allDict, name='专利解析数据'):
    content_list = [['股票代码', '日期', '被引用次数']]
    for x in allDict.values():
        content_list.append([x['gpdm'], x['rq'], x['byycs']])

    wb = Workbook()  # 创建文件对象
    # grab the active worksheet
    ws = wb.active  # 获取第一个sheet
    for hh in content_list:
        ws.append(hh)  # 写入多个单元格
    file_name = name + '.xlsx'
    wb.save(file_name)


def readInfo():
    allDict = {}
    content = pd.read_excel('引用数据.xlsx', skiprows=0, dtype={"股票代码": str, '日期': str})
    # print(content)
    content = content.fillna(0)
    data = content[['股票代码', '日期', '被引用次数']]

    for x in data.itertuples():
        one_info = {
            "gpdm": x[1],
            "rq": x[2],
            'byycs': x[3],
        }
        print(x[3])
        if (str(x[1]) + str(x[2])) not in allDict.keys():
            allDict[str(x[1]) + str(x[2])] = one_info
        else:
            allDict[str(x[1]) + str(x[2])]['byycs'] += x[3]

    print(allDict)

    with open('ret.json', 'w')as f:
        json.dump(allDict, f, ensure_ascii=False )
    return allDict
allDict = readInfo()
processing_data(allDict)