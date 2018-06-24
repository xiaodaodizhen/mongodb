
## ms 文件目录
- master 主服务器
- master.conf  主服务器配置
- master.bat 主服务器批处理文件(作用：双击此文件，就相当于在命令行中执行此文件中的内容，里面可以包含大量的命令，可以理解为批量执行)
- slave 从服务器
- slave.conf 从服务器配置
- slave.bat 从服务器的批处理文件

//----master.conf 文件内容 ：真正的文件中不能有分号，不能有注释
dbpath=D:\zhufeng\mongo\ms\slave
port=1002
slave = true    // 代表是从服务器
source=127.0.0.1:1001  // 从服务器的数据来源（主服务器的端口）

//----slave.conf 文件内容
dbpath=D:\zhufeng\mongo\ms\master
port=1001
master = true     // true代表是主服务器


- rs.slaveOk();  // 在从服务器读取数据时。必须执行此命令告诉服务器要读取数据，否则会报错“not master and salveOK=false”

- 主从服务器其他设置项
  - only 从服务器，指定复制某个数据库默认是复制全部数据
  - slavedelay 从服务器，设置主数据库同步数据的延迟时间（秒）
  - fastsync 从服务器，以主数据库的节点快照为节点启动从数据库
  - autoresync 从服务器，如果不同步则中心同步数据库 
  - oplogSize 主服务器，谁知oplog的大小，（主服务器擦欧总记录储存到local的oplog中）



## 副本集--- 具体参考珠峰文档
  #### 流程
    - 1.一台活跃的服务器和至少两个的备份服务器
    - 2.当活跃服务器出现故障，这时集群根据权重算法推出心的活跃服务器器
    - 3.当原来的服务器故障恢复后又变成了备用服务器