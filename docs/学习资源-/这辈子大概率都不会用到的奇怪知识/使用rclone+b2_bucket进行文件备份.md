---
author: 
- 孙博文@24软工
---

# 使用`Rclone`+`BackBlaze_Buckets`进行文件备份

## 简单介绍

`BackBlaze`是一家资深的 OSS 对象存储厂商，选择他的目的就几个：

- 价格便宜：初始 10G 空间完全免费，超出 10GB 后每 TB 只有 6 美刀/月，比较划算
- 国内直连：国内并没有屏蔽 B2 储存桶的链接，服务器可以直连
- Rclone 原生支持： `Rclone`原生支持了 B2 储存协议，同时 B2 本身也有 S3 的协议兼容
- 出口流量便宜：B2 的出口流量是每月 3 倍于储存容量，对于我的小容量备份完全够用了

注：本篇教程为个人情况，并结合自己看到的博客作为辅助。

## 开始使用`rclone`

### 创建储存桶

进入[B2-Buckets](https://secure.backblaze.com/b2_buckets.htm)创建新的储存桶

### 在B2创建`ApplicationKey`

进入[B2-Applications Keys](https://secure.backblaze.com/app_keys.htm)创建应用密钥

我们一般不使用`Master Application Key`来进行配置。该密钥拥有最高权限，可以任意访问账号下的每个储存桶。用于服务器环境下不够安全，所以我们单独创建`Applications Keys`

点击下方`Add a New Application Key`来创建新的应用密钥，并记录出现的KeyID和ApplicationID

### 命令行配置`rclone`

注：以下环境为`Debian`+`zsh`环境，相关命令可能有所不同

```
~   with root@localhost
> rclone config
Current remotes:

Name                 Type
====                 ====
b2_goldbro           b2

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> n  #已经存在一个配置，选择新建配置

Enter name for new remote.
name>       #输入配置名称

Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
 1 / 1Fichier
   \ (fichier)
 2 / Akamai NetStorage
   \ (netstorage)
 3 / Alias for an existing remote
   \ (alias)
 4 / Amazon Drive
   \ (amazon cloud drive)
 5 / Amazon S3 Compliant Storage Providers including AWS, Alibaba, Ceph, China Mobile, Cloudflare, ArvanCloud, Digital Ocean, Dreamhost, Huawei OBS, IBM COS, IDrive e2, IONOS Cloud, Lyve Cloud, Minio, Netease, RackCorp, Scaleway, SeaweedFS, StackPath, Storj, Tencent COS, Qiniu and Wasabi
   \ (s3)
 6 / Backblaze B2
   \ (b2)
 7 / Better checksums for other remotes
   \ (hasher)
 8 / Box
   \ (box)
 9 / Cache a remote
   \ (cache)
10 / Citrix Sharefile
   \ (sharefile)
11 / Combine several remotes into one
   \ (combine)
12 / Compress a remote
   \ (compress)
13 / Dropbox
   \ (dropbox)
14 / Encrypt/Decrypt a remote
   \ (crypt)
15 / Enterprise File Fabric
   \ (filefabric)
16 / FTP
   \ (ftp)
17 / Google Cloud Storage (this is not Google Drive)
   \ (google cloud storage)
18 / Google Drive
   \ (drive)
19 / Google Photos
   \ (google photos)
20 / HTTP
   \ (http)
21 / Hadoop distributed file system
   \ (hdfs)
22 / HiDrive
   \ (hidrive)
23 / In memory object storage system.
   \ (memory)
24 / Internet Archive
   \ (internetarchive)
25 / Jottacloud
   \ (jottacloud)
26 / Koofr, Digi Storage and other Koofr-compatible storage providers
   \ (koofr)
27 / Local Disk
   \ (local)
28 / Mail.ru Cloud
   \ (mailru)
29 / Microsoft Azure Blob Storage
   \ (azureblob)
30 / Microsoft OneDrive
   \ (onedrive)
31 / OpenDrive
   \ (opendrive)
32 / OpenStack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ (swift)
33 / Pcloud
   \ (pcloud)
34 / Put.io
   \ (putio)
35 / SMB / CIFS
   \ (smb)
36 / SSH/SFTP
   \ (sftp)
37 / Sia Decentralized Cloud
   \ (sia)
38 / Sugarsync
   \ (sugarsync)
39 / Transparently chunk/split large files
   \ (chunker)
40 / Union merges the contents of several upstream fs
   \ (union)
41 / Uptobox
   \ (uptobox)
42 / WebDAV
   \ (webdav)
43 / Yandex Disk
   \ (yandex)
44 / Zoho
   \ (zoho)
45 / premiumize.me
   \ (premiumizeme)
46 / seafile
   \ (seafile)
Storage> 6  #选择B2协议

Option account.
Account ID or Application Key ID.
Enter a value.
account>    #输入在BackBlaze建立的KeyID

Option key.
Application Key.
Enter a value.
key>    #输入在BackBlaze建立的ApplicationID

Option hard_delete.
Permanently delete files on remote removal, otherwise hide files.
Enter a boolean value (true or false). Press Enter for the default (false).
hard_delete> true   #是否打开硬删除功能，即在本地硬盘删除文件时，同步时将服务器上的文件同时删除

Edit advanced config?
y) Yes
n) No (default)
y/n> n  #是否编辑Advanced设置，默认选择不配置

Configuration complete.
Options:
- type: b2
- account: 
- key: 
- hard_delete: true
Keep this "test" remote?
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d> y    #保存配置

Current remotes:

Name                 Type
====                 ====
b2_goldbro           b2
test                 b2

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q    #退出配置命令
```

## `rclone`使用`sync`命令进行增量同步

先使用`rclone ls`检测配置是否正确
```
~   with root@localhost
> rclone ls b2_goldbro:Goldbro****** #B2储存桶名称为全局唯一，此处保护B2储存桶名称
      700 AliyunJP/flare/apps.yml
      ...
```

之后使用`rclone sync`进行增量同步
```
~   with root@localhost
> rclone sync /root/flare b2_goldbro:Goldbro******/AliyunJP/flare -P --transfers=12
Transferred:              0 B / 0 B, -, 0 B/s, ETA -
Checks:                 3 / 3, 100%
Elapsed time:         1.2s
```

`rclone sync`的示例如下
```
rclone sync [source]:[remote] -flags
```
对配置的详解如下：
- `[source]:[remote]`： `[source]`为本地目录；`[remote]`为`[config]:[bucket]/dict`
- `-P`：展示上传时的具体情况
- `--transfer=N`：设置上传线程数，默认数为 4

## 附：使用`systemd`创建定时服务进行定时同步

每次都输入命令行命令进行`sync`同步十分麻烦，并且也易忘记，所以我们选择编写`systemd`脚本来定时进行同步

`systemd`会默认读取`/etc/systemd/system`目录下的文件，我们的文件就放置在此目录下

先编写一个`.service`文件

```
[Unit]
Description = Sync Coding Folder to B2 Bucket

[Service]
Type = oneshot  
ExecStart = /usr/bin/rclone sync /root/coding b2_goldbro:Goldbro*****/TencentCloudSH/coding --transfers=12

[Install]
WantedBy = multi-user.target
```

以下是对文件的详解：
-   `Description`:  为服务文件的描述
-   `Type`：    为配置服务通知管理器服务启动完成的机制
-   `oneshot`： 请参考如下[网址](https://www.freedesktop.org/software/systemd/man/latest/systemd.service)中的`Type`下的`oneshot`
-   `ExecStart`：   为执行的命令或者脚本

之后我们创建一个同名的`.timer`文件

```
[Unit]
Description = Sync Coding Folder to B2 Buckets Timer

[Timer]
OnBootSec = 1min
OnUnitActiveSec = 12hours

[Install]
WantedBy = timers.target
```

以下是对文件的详解：
-   `OnBootSec`：   定义一个相对于机器启动时间的计时器
-   `OnUnitActiveSec`： 定义一个相对于计时器单元本身激活时刻的计时器

之后运行如下命令：

```
systemctl daemon-reload

systemctl start *****.timer    #    启动计时器
systemctl enable *****.timer    #   启用计时器

systemctl status *****.service  #   查看服务日志
systemctl status *****.timer    #   查看计时器日志
```

##  参考资料
-   [BackBlaze官网](https://www.backblaze.com/)
-   [Rclone-B2官方配置](https://rclone.org/b2/)
-   [Systemd-service解释](https://www.freedesktop.org/software/systemd/man/latest/systemd.service)
-   [Systemd-timer解释](https://www.freedesktop.org/software/systemd/man/latest/systemd.timer)