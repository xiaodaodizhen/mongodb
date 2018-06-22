
// var db = connect("score");
var scores = [];
for (var i = 0; i < 100000; i++) {
  scores.push({ name: `xg${i}`, age: i });
}

db.score.insert(scores);