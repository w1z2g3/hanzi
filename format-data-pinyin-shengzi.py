#!/usr/bin/env python3

import pathlib

import pypinyin


def format_data():
    with pathlib.Path('shengzi.txt').open(encoding='utf-8') as f:
        for item in f:
            result = pypinyin.pinyin(item)
            if len(result) == 2:
                print(result[0][0])
            elif len(result) > 2:
                print(' '.join([x[0] for x in result[:-1]]).strip())
            else:
               raise Exception(f'Unknow result: {result}')


if __name__ == '__main__':
    format_data()
