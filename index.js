global.fetch = require('node-fetch');
const GetSheetDone = require('get-sheet-done-3');
const fs = require('fs');
const rimraf = require('rimraf');
const BASE_FOLDER = '/Users/Roger/Desktop/G-Drive Assignments/';
const TO_GRADE_FOLDER = '1ToGrade/';
const NOT_FOUND_FOLDER = 'NotFound/';

let $found = 0;
let $notFound = 0;

GetSheetDone.labeledCols('1EdWFjYptRKArAVp9KUmiF16-KjMsF25ueCPmXcSjziI')
  .then((data) => {
    let entries = data.data;
    const srcFolder = BASE_FOLDER + TO_GRADE_FOLDER;
    let fileNames = fs.readdirSync(srcFolder);
    fileNames.forEach(fname => {
      let found = false;
      fname = fname.replace("/","");
      let srcFile = srcFolder+fname;
      entries.forEach(entry => {
        if (fname.indexOf(entry.code) >= 0) {
          // Code is found - copy file to destination folder
          found = true;
          let dstFolder = BASE_FOLDER+entry.destination;
          if (!fs.existsSync(dstFolder)) {
            fs.mkdirSync(dstFolder);
          }
          let dstFile = dstFolder+'/'+fname;
          fs.copyFileSync(srcFile, dstFile);
          console.log('Copied '+fname+' to '+dstFolder);
        }
      })
      if (found) {
        $found++;
        rimraf.sync(srcFile);
      } else {
        console.log('File '+fname+' not filed');
        $notFound++;
        // let dstFolder = BASE_FOLDER+NOT_FOUND_FOLDER;
        // if (!fs.existsSync(dstFolder)) {
        //   fs.mkdirSync(dstFolder);
        // }
        // let dstFile = dstFolder+'/'+fname;
        // fs.copyFileSync(srcFile, dstFile);
        // rimraf.sync(srcFile);
      }
    })
    console.log('--------------------------------------------------------');
    console.log('Files found: '+$found);
    console.log('Files not found: '+$notFound);
  }).catch(err => {
    console.log('Error');
    console.error(err);
});
