/**
 * 只取年龄大于1
 * 按地域分组
 * 计算每组人年龄的总和
 */
var db = connect("school");
db.runCommand({
    group: {
        ns: "students",// 集合名称
        key: { province: 1 },//分组的键
        query: {
            age: { $gt: 1 }
        },
        initial: { total: 0 },//初始值
        $reduce: function (doc, initial) {
            initial += doc.age;// doc 是指数据表中的每条符合条件的数据
        }

    }
});