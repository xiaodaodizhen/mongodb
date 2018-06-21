var db = connect("school");
var school = [];
for (var i = 0; i < 10; i++) {

  school.push({ name: `xg${i}`, age: i });
}

db.school.insert(school);