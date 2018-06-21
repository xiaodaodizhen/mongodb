## mongodb 基本操作（以管理员权限操作）

- mongod -dbpath "D:\zhufeng\mongo\mddata" -logpath "D:\zhufeng\mongo\mdlog.log"       -logappend  -install -serviceName "mongodb"     添加服务
- mongod -config "D:\zhufeng\mongo\config.txt" -logappend  -install -serviceName "mongodb"  使用配置文件添加服务,(将配置项放到config.txt)
- sc delete mongodb   删除服务--mongodb 服务名称，在添加服务的时候serviceName定义的
- net start mongodb  命令启动服务--mongodb 服务名称，在添加服务的时候serviceName定义的
- net stop mongodb  命令停止服务  --mongodb 服务名称，在添加服务的时候serviceName定义的
- mongod --dbpath=./mddata 启动服务 （手动）
- mongo 链接服务器（手动,------链接完成后才可以操作数据库）
- 备注：还有一种启动服务的方式---图三

- ？？？？？？？？？？？？？？？？？为什么不启动服务，直接启动数据库也可以呢？？？？？？

// 在链接数据库成功（执行mongo）后的当前数据库中执行
- use school // 切换到school
- load("./js/insert.js"); // 将insert.js的数据导入到数据库
- db.school.find()   // 查看数据库数据


// 在断开 数据库后(执行Ctrl+C) 执行 ，使用mongoexport  mongoimport工具
 - d ：数据库名
 - c ：collection名
 - o ：输出的文件名
 - mongoexport -d school -c school -o school.bak school.bak  // 导出school数据库的school集合（是个文件）,这是支持json 不兼容二进制
 - mongoimport -d school -c school school.bak // 导入数据        



- mongodump -d school -o school.dmp   // 导出整个数据库（结果是个文件夹，包含每个数据集合），二进制格式，没有兼容性问题
- mongorestore -d school school.dmp/school   // school.dmp/school导入到school数据库中


##   锁住数据库
- 进入数据库  mongo
- use admin // 必须在本数据库下才能执行锁住/解锁命令
- db.runCommand({fsync:1,lock:1}); //锁住
- db.fsyncUnlock();// 解锁

## 给数据库添加角色
- 进入数据库  mongo
- db.createUser({user:'xgqx',pwd:"123",roles:[{db:'school',role:'read'}]});
  user:用户名
  password:密码
  reles:权限数组
       db:本权限针对哪个数据库
       role:对本数据库所拥有的权限