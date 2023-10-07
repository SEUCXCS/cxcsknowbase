---
author: 
- 21软工郑钤元
---
# （案例）关于Visual Studio 中“scanf”输入报错的解决方法
> 本文件为一个案例，目的是用一个简单的案例帮助你了解一篇问题解决要怎么写

## 问题详述

在使用visualstudio code使用scanf是报错，如图

（代码，此处略）

报错提示：
![img](https://camo.githubusercontent.com/5c0ad71f026858a1fc8cf38dd4220997c7ca2ee02c61a7dfa9d4373c4dd1b0c0/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f66386165326561303534316534653961396530316637373533336232353062632e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f643346354c58706c626d686c61512c736861646f775f35302c746578745f51314e455469424155473976636b6431655441782c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

## 解决方案

根据报错信息，使用scanf_s代替scanf就可以正常运行。

因为Visualstudio认为scanf不够安全，于是禁用了该函数，而使用scanf_s代替之

## 感谢帮助

CSDN: [https://blog.csdn.net/PoorGuy01/article/details/122501426](https://blog.csdn.net/PoorGuy01/article/details/122501426)