var gulp = require('gulp')
const cheerio = require('cheerio')

var fs = require('fs')
const path = require('path')
const filePath = path.join('dist', 'index.test');

const execSync = require('child_process').execSync;
gulp.task('build', function(){
  if (!fs.existsSync(filePath)){
    console.log('File not detected. Initiating ng build.')
    //if the file does not exist, run ng build
    execSync('ng build')
  }else{
    console.log('file detected')
  }

  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
      var beginning = data.indexOf('<body>') + 6
      var end = data.indexOf('</body>')
      var angularString = data.substring(beginning, end)
      console.log('received data: ' + angularString);

      fs.writeFile("angular_script_tags.txt", angularString, function(err){
      })

    } else {
      console.log(err);
    }
  });
});

