#!/bin/bash

yarn docs:build

# 将./assests目录下的文件复制到./.vitepress/dist/assests下
cp -r ./assets ./.vitepress/dist

