#!/usr/bin/env python3

import pathlib

import pypinyin


def format_data():
    shengzi = pathlib.Path('shengzi-500.txt').read_text(encoding='utf-8')
    for item in shengzi.split():
        result = pypinyin.pinyin(item)
        if len(result) == 1:
            print(result[0][0])
        elif len(result) > 1:
            print(' '.join([x[0] for x in result[:-1]]).strip())
        else:
           raise Exception(f'Unknow result: {result}')


if __name__ == '__main__':
    format_data()
