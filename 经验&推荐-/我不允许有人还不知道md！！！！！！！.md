# 都2202年了还有人不知道md？

## md是什么？
**md可以是一种文件格式，文件后缀名为**`**.md**`**所以其文件称为md文件**（类似`.word`的word文档），md文件常用来写文档（项目文档，规划，笔记等等）。

md主要的2个部分：

1. md语法
2. md软件

md的本质上就是带有一些语法文本，一些支持md语法的软件，能将文本渲染成特定的格式。

常见的支持md语法的软件：

1. Typore（md亲妈，最推荐的编辑器，找破解版比较麻烦）
2. Vsocde
3. 语雀文档（**本文就是使用md语法写的**，我会把本文源码放在下面）
4. 腾讯文档
5. 喵滴（手机端查看md文件软件）
6. …………
<a name="RArVR"></a>
## 实操
我非常建议你打开一个支持md语法的编辑器（比如vscode），新建一个文件，跟着下面一起做。比如下面这样<br />
![[image.png]](https://cdn.nlark.com/yuque/0/2022/png/29682405/1670948583733-b95948d4-86f8-460b-a933-21be09b14778.png#averageHue=%232b2a29&clientId=u0a7129f5-eb07-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=737&id=ub50dbb0f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1014&originWidth=1919&originalType=binary&ratio=1&rotation=0&showTitle=false&size=446362&status=done&style=none&taskId=uf15cf304-3af5-4578-9e86-d5d3b832c6f&title=&width=1395.6363636363637)
<br />左边是源码，可以编辑，右边是试试渲染的展示界面，不可编辑

当我们需要输入一个名为“一级标题”的标题时，我们输入
```markdown
# 一级标题
```
编辑器上就会显示一个大的，标题的字体
<a name="A3p1a"></a>
# 一级标题
如果需要二级标题，则
```markdown
## 这是二级标题
```
<a name="ivX9n"></a>
## 这是二级标题
这个标题作为一个二级标题，字体会比一级标题小一些

除此之外，还有一些语法，比如
```markdown
*一段斜体文本*

**一段加粗文本**

**无序列表：**
- list1
- list2
- list3

一条分界线

---

**有序列表：**
1. list1
2. list2
3. list3

一段代码
```Python
print("hello world")
```
```
上面的文本会显示成下面的样子<br />_一段斜体文本_<br />**一段加粗文本**<br />**无序列表：**

- list1
- list2
- list3

一条分界线

---

**有序列表：**

1. list1
2. list2
3. list3

一段代码
```python
print("hello world")
```


md支持很多种字体格式，包括但不限于：**粗体**，_斜体_，下标，上标，高亮，列表，分割线，标题，代码块，行内代码，表格，~~删除线~~…………<br />同时md支持部分html+css语法（比较麻烦一般不用）以及Latex数学公式表达（比较麻烦一般不用）<br />详情请参考这篇~~我随便找的~~文章：<br />[https://blog.csdn.net/weixin_47587864/article/details/108456264](https://blog.csdn.net/weixin_47587864/article/details/108456264)


## md优点：
md文件和word类似，但和word相比**更轻量**，**更好控制格式**，**更简洁美观**（搭配Typore使用简直不要太爽，界面比word简介多了），以及拥有一个很好的方式**存放代码**方式（word那个B玩意儿你10行代码上去能给你报11个语法错误，非常不美观），所以在程序员群体中被广泛地使用（你去github上看看就知道了）

你可以：<br />用md来写你的C++笔记、日记、项目文档……

md完完全全改变了我的生活（尤其计算机方面），我很感激当时向我推荐这个东西的人（虽然我已经忘了他是谁了），并且希望把这个好东西推荐给你们