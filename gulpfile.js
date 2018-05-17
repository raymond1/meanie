var gulp = require('gulp')
const cheerio = require('cheerio')

var fs = require('fs')
const path = require('path')
const angular_directory = 'atest'
const dist_directory = angular_directory + '/dist'

const indexFilePath = path.join(dist_directory, 'index.html');

const execSync = require('child_process').execSync;
gulp.task('build', function(){
  if (!fs.existsSync(indexFilePath)){
    console.log('Index file not detected. Initiating ng build.')
    //if the file does not exist, run ng build
    execSync('ng build', {'cwd': angular_directory})
  }else{
    console.log('Index file detected')
  }

  //If the index.html file is found, extract the tag and put it into the angular_script_tags.txt file
  fs.readFile(indexFilePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
      var beginning = data.indexOf('<app-root></app-root>') + '<app-root></app-root>'.length
      var end = data.indexOf('</body>')
      var angularString = data.substring(beginning, end).trim()
      console.log('received data: ' + angularString);

      fs.writeFile("angular_script_tags.txt", angularString, function(err){
        if (!err){
          return gulp.src(dist_directory + '/*.js').pipe(gulp.dest('./public'))
        }
      })
    } else {
      console.log(err);
    }
  });
});

