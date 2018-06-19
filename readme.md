## mongodb 基本操作（以管理员权限操作）

- mongod -dbpath "D:\zhufeng\mongo\mddata" -logpath "D:\zhufeng\mongo\mdlog.log" -logappend  -install -serviceName "mongodb"     添加服务
- sc delete mongodb   删除服务--mongodb 服务名称，在添加服务的时候serviceName定义的
- net start mongodb  命令启动服务--mongodb 服务名称，在添加服务的时候serviceName定义的
- net stop mongodb  命令停止服务  --mongodb 服务名称，在添加服务的时候serviceName定义的
- mongod --dbpath=./mddata 启动服务 （手动）
- mongo 链接服务器（手动）
- 备注：还有一种启动服务的方式---图三
 