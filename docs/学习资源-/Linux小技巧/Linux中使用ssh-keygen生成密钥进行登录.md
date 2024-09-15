---
author: 
- 孙博文@24软工
---

# Linux中使用`ssh_keygen`命令生成登录密钥

## 简述

- 我们一般使用 MobaXTerm 等 SSH 客户端来远程管理 Linux 服务器。但是，一般的密码方式登录，容易有密码被暴力破解的问题。所以，一般我们会将 SSH 的端口设置为默认的 22 以外的端口，或者禁用 root 账户登录。其实，有一个更好的办法来保证安全，那就是通过密钥方式登录。

- 密钥形式登录的原理是：利用密钥生成器制作一对密钥——一只公钥和一只私钥。将公钥添加到服务器的某个账户上，然后在客户端利用私钥即可完成认证并登录。这样一来，没有私钥，任何人都很难通过 SSH 暴力破解你的密码来远程登录到系统。此外，如果将公钥复制到其他账户甚至主机，利用私钥也可以登录。

- 下面来讲解如何在 Linux 服务器上制作密钥对，将公钥添加给账户，设置 SSH，最后通过客户端登录。

## 实操

### 1. 生成密钥对

首先登录你的服务器终端，并开始制作密钥对。

以下的演示基于`Bash`下，使用`zsh`或者其他Shell的请自行调整

```
root@localhost:~# ssh-keygen -t ed25519 -C "root@Goldbro233"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/root/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /root/.ssh/id_ed25519
Your public key has been saved in /root/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:x9ENfvHt/wtJp0IL7Y/1PMEu/b9ehI1aSOXuaP3EpsM root@Goldbro233
The key's randomart image is:
+--[ED25519 256]--+
|            . o  |
|           o = o.|
|          . + + o|
|         ..o + = |
|        S.oo..*.+|
|         .+ o*+=.|
|           ++*= B|
|           .=.EOo|
|           . .+B@|
+----[SHA256]-----+
```

这就是一个密钥对生成的全部过程，笔者会对其中的关键步骤进行解释。

- `ssh-keygen`： 为生成密钥对的主要命令，一般为Linux服务器内自带指令，无需额外安装。

- `-t`： 用于选择**加密算法**，可选的有`ed25519`，`rsa`等。主流目前使用的是`ed25519`和`rsa`。

- `-C`： 为生成的密钥对添加注释。

- `Enter passphrase (empty for no passphrase):`： 为私钥添加密码保护，如需输入两次必须一致。（注：此处不使用`password`是为了不与用户的`password`相混淆）。

### 2.移动密钥对

在生成完成密钥之后，我们需要将公钥移动至当前用户文件夹下的`.ssh`文件夹（注：此个文件夹为隐藏状态，使用`ls`命令看不到是正常的。你只需要使用`ls -a`就可以看到）

```
root@localhost:~# mv ~/.ssh/id_ed25519.pub ~/.ssh/authorized_keys
```

在移动完成以后，请为文件赋予正常的权限防止他人读取

```
root@localhost:~# chmod 600 ~/.ssh/authorized_keys
```

### 修改`sshd_config`文件并重启`ssh`服务

当你移动完公钥文件，并且已经将私钥文件下载至本地后，你就可以修改`sshd_config`文件了。

```
root@localhost:~# vim /etc/ssh/sshd_config
```

（注1:此处使用的是`vim`作为文本编辑器，你也可以选择自己习惯的文本编辑器。）

（注2:此处使用的是`root`作为演示，请在使用别的账号是注意权限问题并使用`sudo`进行提权。）

`sshd_config`文件一般会有如下重要选项:

```
PermitRootLogin yes ## root 用户能否通过 SSH 登录
RSAAuthentication yes ##第一代SSH通讯协议
PubkeyAuthentication yes  ##第二代SSH通讯协议
AuthorizedKeysFile .ssh/authorized_keys  ##公钥文件位置
PasswordAuthentication no ##禁用密码登录
```

笔者会对其中重要选项进行解释。

- `PermitRootLogin`： 是否允许`root`用户进行登录。允许请将后面修改为`yes`。

- `RSAAuthentication`： 第一代SSH通讯协议。现在基本不使用。

- `PubkeyAuthentication`： 第二代SSH通讯协议。目前默认使用。请将后面修改为`yes`。

- `AuthorizedKeysFile`： 保存公钥的位置。请确认是否为我们刚才保存公钥的位置。如在`.ssh/authorized_keys`。

- `PasswordAuthentication`： 是否启用密码登录。如需关闭请改为`no`。**请在最后测试完成流程确认无误时修改此项！**

当你修改完`sshd_config`文件后，请使用`systemctl`命令重启`ssh`服务。

```
root@localhost:~# systemctl restart ssh
```
（注2:此处使用的是`root`作为演示，请在使用别的账号是注意权限问题并使用`sudo`进行提权。）

此时你就可以关闭此个终端，并使用你顺手的ssh客户端加载上你的私钥文件进行测试了。

## 参考资料

- [网道/WangDoc.com - SSH 密钥登录](https://wangdoc.com/ssh/key#ssh-keygen%E5%91%BD%E4%BB%A4%E7%94%9F%E6%88%90%E5%AF%86%E9%92%A5)
- [Runoob - 设置 SSH 通过密钥登录](https://www.runoob.com/w3cnote/set-ssh-login-key.html)
