---
outhor: 
- 21软工郑钤元
---
# 成贤计协知识库

这是由成贤计协学生创建并维护的知识库，旨在帮助大家学习计算机以及了解计协。‘

本知识库的内容包括但不限于：
- 成贤计协介绍
- 学长学姐的学习经验分享
- 比赛介绍
- 计算机学习资料


:::info
目前文档尚在完善中，内容不多，部分页面可能会在后面的版本中大改，可以多来看看哦。
:::

<!-- TODO:待完善的文案 -->

:::tip
- 你可以通过左边的导航栏来查看文档，也可以通过搜索来查找你想要的内容。
- 导航栏带有(README)字样的栏目下面有子栏目，点击右边的箭头可以展开子栏目
- 带有(README)字样的栏目本身也是一个页面哦
:::


## 在github上查看

本项目托管在github上，你也可以通过以下链接来查看本项目的源码：

[https://github.com/SEUCXCS/cxcsknowbase](https://github.com/SEUCXCS/cxcsknowbase)

你可以在github提出[issues](https://github.com/SEUCXCS/cxcsknowbase/issues)或者[pull request](https://github.com/SEUCXCS/cxcsknowbase/pulls)来向知识库中添加内容

## 本地部署

本项目采用[vitepress](https://vitepress.vuejs.org/)构建，除了在网页端查看本知识库，你还可以在你的电脑上部署本项目（如果有需要的话）并在本地查看，方便编写文档。

环境需求：
- nodejs 18.0以上
- git 2.0以上


```shell
# 本地部署
git clone https://github.com/SEUCXCS/cxcsknowbase
cd cxcsknowbase
npm i
npm run docs:dev
```

出现如下信息即为成功：

```shell
  vitepress v1.0.0-rc.13

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

在本地浏览器访问`http://localhost:5174/`即可查看


## issue & pull request

如果你想要向本知识库中添加内容，可以通过github的[issues](https://github.com/SEUCXCS/cxcsknowbase/issues)或者[pull request](https://github.com/SEUCXCS/cxcsknowbase/pulls)功能来实现

### issue

提交issue时，请尽量按照以下格式提交：

```markdown
# issue类型+简要描述

## 问题描述

## 解决方案
```

issue类型：
- `👈 勘误`：如果你发现本知识库中的内容有错误，可以提交勘误issue，我们会尽快修正
- `📚 新内容`：如果你有想要添加的内容，可以提交新内容issue，我们会尽快添加
- `🚩 其他`：如果你有其他问题，也可以提交issue，我们会尽快回复

如果目标文件夹下的README.md文件中有issue的额外说明，可以参考额外说明中的格式提交issue

### pull request

github pull request使用方法可以参考[Github pull request详细教程（提交代码到他人仓库）](https://blog.csdn.net/CY2333333/article/details/113731490)

pull request的类型
- `👈 勘误`：勘误本知识库中错误的内容
- `📚 添加文章`：向本知识库添加新的文章
- `📖 修改文章`：修改本知识库中已有的文章
- `🛠️ 优化知识库`：优化本知识库的结构或者修改本知识库的配置
- `🚩 其他`：其他类型的pull request

<!-- 👈👉🎉✨🎈🔧💡📚📖📗📘📙📓📒📃📜📄📑📰📕✒️✏️🖍️🛠️⚒️📌📍🚨🚩⭐⚡❌✅⚠️💲 -->
提交规范待完善
<!-- TODO -->