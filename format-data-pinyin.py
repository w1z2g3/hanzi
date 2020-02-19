#!/usr/bin/env python3

import json
import pathlib

import pypinyin


def format_data():
    data = {}

    with pathlib.Path('old-data.json').open(encoding='utf-8') as f:
        old_data = json.load(f)

    for grade, words in old_data.items():
        data[grade] = []
        for word in words:
            word['pinyin'] = pypinyin.pinyin(word['item'])
            data[grade].append(word)

    data_json = json.dumps(data, indent=4, sort_keys=True, ensure_ascii=False)
    pathlib.Path(f'data.json').write_text(data_json, encoding='utf-8')


if __name__ == '__main__':
    format_data()
