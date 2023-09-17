# 成贤计协知识库

这是由成贤计协学生创建并维护的知识库，旨在帮助大家学习计算机以及了解计协。

目前文档尚在完善中，内容不多，欢迎大家提出issues来帮助我们完善文档。

<!-- TODO -->
(待完善的文案)

你可以通过左边的导航栏来查看文档，也可以通过搜索来查找你想要的内容。

> 导航栏带有(README)字样的栏目下面有子栏目，点击右边的箭头可以展开子栏目

> 带有(README)字样的栏目本身也是一个页面哦

## 在github上查看

本项目托管在github上，你可以通过以下链接来查看本项目的源码：

[https://github.com/SEUCXCS/cxcsknowbase](https://github.com/SEUCXCS/cxcsknowbase)

你可以在github提出[issues](https://github.com/SEUCXCS/cxcsknowbase/issues)来向知识库中添加内容

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
Port 5173 is in use, trying another one...

  vitepress v1.0.0-rc.13

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

在本地浏览器访问`http://localhost:5174/`即可查看


## TODO

- [ ] 设定提交分享和资源的流程和规范
- [ ] C++入门推荐