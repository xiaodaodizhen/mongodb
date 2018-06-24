## mongodb 基本操作（以管理员权限操作）

- mongod -dbpath "D:\zhufeng\mongo\mddata" -logpath "D:\zhufeng\mongo\mdlog.log" -logappend  -install -serviceName "mongodb"     添加服务
- mongod -config "D:\zhufeng\mongo\config.txt" -logappend  -install -serviceName "mongodb"  使用配置文件添加服务,(将配置项放到config.txt)
- sc delete mongodb   删除服务--mongodb 服务名称，在添加服务的时候serviceName定义的
- net start mongodb  命令启动服务--mongodb 服务名称，在添加服务的时候serviceName定义的
- net stop mongodb  命令停止服务  --mongodb 服务名称，在添加服务的时候serviceName定义的
- mongod --dbpath=./mddata 启动服务 （手动）
- mongod --dbpath=./mddata --auth  启动服务（手动-有权限限制）
- mongo 链接服务器（手动,------链接完成后才可以操作数据库）
- 备注：还有一种启动服务的方式---图三

- ？？？？？？？？？？？？？？？？？为什么不启动服务，直接启动数据库也可以呢？？？？？？

// 在链接数据库成功（执行mongo）后的当前数据库中执行
- use school // 切换到school
- load("./js/insert.js"); // 将insert.js的数据导入到数据库
- db.school.find()   // 查看数据库数据 
- db.school.find({name:'xx'});  // 如果有参数，是查询某一个数据
- db.school.drop()   // 清空数据库
- db.runCommand({distinct:"stentens",key"home"});// 查找数据表stentens的key的唯一值（去重，查找不重复的值）distinct：唯一


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

- show users 查看数据权限


## runCommand 常用命令
db.runCommand({buildInfo:1}); // 获取构建信息
db.runCommand({getLastError:"stendens"}); // 获取最近一次错误


## 固定集合---占用完后按插入顺序先后在重新覆盖
- 没有索引
- 速度快，不需要重新分配空间
- 适合日志储存

## 创建固定集合
- size: 集合空间大小（单位kb），  max:集合最大放多少个（文档）数据， capped：是否封顶设置上限
- db.createCollection("logs",{size:5,max:5,capped:true});

## 创建普通集合
- db.createCollection("logs"); // 与固定集合方法一样，只是参数不同

## 普通集合转为固定集合
- db.runCommant({converToCapped:"普通集合名称",size:5});


## GridFiles-mongofiles 工具（解决大文件上传，比如视频和高清图片,文件，可以将一个大文件分割成为多个较小的文档，这样的机制允许我们有效的保存大文件对象）
- myfiles 数据库名称  bigFile.txt 上传的文件
- mongofiles 包含链接服务的功能（不能在mongo 链接服务成功的情况下使用），上传完成后会自动断开链接
- mongofiles -d myfiles put bigFile.txt  // 将bigFile.txt 文件上传到myfiles数据库中
- mongofiles -d myfiles get bigFile.txt // 将bigFile.txt 文件从myfiles数据库中获取会来
- mongofiles -d myfiles list // 获取myfiles 数据表中存的文件
- mongofiles -d myfiles delete bigFile.txt // 删除数据


## 索引
- db.score.ensureIndex({key:1||-1 升降序,{name:"索引名字没设置则用默认",unique:ture ||false是否是唯一索引  , dorpDups:true||false 如果在设置唯一索引前，已经有索引值对应的值重复，设置本项为true,丢弃重复项，此属性危险慎用,background:true 是否在后台创建索引，不影响继续操作}});
- db.score.ensureIndex({age:1});    //创建索引 score数据表名字  字段为age  值为1 是升序
- db.score.getIndexes(); // 查看现有的索引

查看索引结果
[
  { -----------------------数据生成自带
    "v":2,
    "key":{
      "_id":1
    },
    "name":"_id_",
    "ns":"score.score"
  },
  {--------------------------自己创建
    "v":1,
    "key":{
      "age":1   ---------------------索引key  值为 1 升序  -1 降序
    },
    "name":"age_1", ----------------- 索引名字,默认，如果db.score.ensureIndex({age:1},{name:"ageIndex"});创建的时候，设定了name属性就使用设定的，没有定就用默认的
    "ns":"score.score"
  },

]


- db.score.dropIndex("age_1");   // 删除索引--------- age_1  是需要删除索引的名字，索引的name属性

#### 多键索引---基于一个数组创建索引，索引就是数组
db.moreData.insert({hobby:["A","B","C"]});
db.moreData.ensureIndex({hobby:1});
db.moreData.find({hobby:"A"},{hobby:1,_id:0}).explain(true);


#### 过期索引

 - 在一定的时间后会过期，过期后相应的数据会被删除，比如session  日志 缓存  临时文件
 - 1. 索引字段的值必须是Date对象，不能是其他类型比如时间戳
 - 2. 删除时间不精确，每60秒跑一次，删除也要时间，所以后误差

   db.logs.insert({time:new Date()});
   db.logs.ensureIndex({time:1},{expireAfterSeconds:10});// expireAfterSeconds 设置索引存在时常，即便是设置10秒，也是按60秒更新，因为他是每60秒更新一次，过期自动删除数据
   db.logs.find();


#### 全文索引
 - $text: 表示要进行全文检索
 - $search: 表示要查找的内容，默认全部匹配

 db.arts.insert({con:"i am girl"});
 db.arts.insert({con:"i am boy"});
 db.arts.insert({con:"i am girl boy"});
 db.arts.ensureIndex({con:"text"});// 告诉索引字段con，他的索引类型是 text文本
 db.arts.find({$text:{$search:"boy"}}); // 查找有boy关键字的文档数据

 db.arts.find({$text:{$search:"boy gril"}}); //  boy gril 是或的关系
 db.arts.find({$text:{$search:"\"boy\"\"gril\""}}); // boy gril 是 与的关系  （多个关键之用""包含，并且用转义符转义）
 db.arts.find({$text:{$search:"\"boy\"\"gril\"-wangwu"}});// -wangwu 是排除 ，并且包含-wangwu的双引号不需要转义符转义
 
 db.arts.find({$text:{$search:"boy -gril"}});//-girl 是排除

#### 二维索引---提供了强大的空间索引，可以查询出一定范围内的地理坐标
- db.map.ensureIndex({"gis":"2d"},{min"-1,max:201});
- db.map.find({"gis":{$near:[70,180]}}).limit(3); //查询点（70,180）最近的三个点
- db.map.find({"gis":{$within:{$box:[[50,50],[190,190]]}}}); // 查询以（50，50）和(90,90)为对角线的正方形的所有点

- db.map.find({"gis":{$within:{$center:[[50,50],60}}}); //查询出以圆心(50,50)，半径60的园中的点



#--------------------（运维相关知识--主从服务器--ms文件夹下）-------------------------------
