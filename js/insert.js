var db = connect("school");
var school = [];
for (var i = 0; i < 10; i++) {

  school.push({ name: `xg${i}`, age: i });
}

db.school.insert(school);// db.school是数据表名字，将本school数组插入到db.school的数据表中