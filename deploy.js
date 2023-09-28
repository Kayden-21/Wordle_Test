const fs = require('fs');
const path = require('path');

const devFolder = path.join(__dirname,'liveServerRapidDev');

const deployFilesEnum ={
  scripts: path.join(__dirname,'scripts'),
  styling: path.join(__dirname,'styling'),
  views: path.join(__dirname,'views'),
  images: path.join(__dirname,'images')

};
/**
 * 
 * @param {string} folderName 
 * @param {string[]} Files 
 */
function deployFiles(src,dist,Files){
  Files.forEach(file => {
    fs.copyFile(path.join(src,file),path.join(dist,file),(err) =>{
      if (err)
        console.log(err);
    });
  });
}

/**
 * discovers and sorts files from liveServerRapidDev
 * @param {Error} error 
 * @param {string[]} files 
 */
function dirReadCallBack(error, files){
  if (error){
    console.log(error);
    return;
  }
  const styles = files.filter(
    ( file)=>{
      return file.includes('.css');
    }
  );
  const scripts = files.filter(
    ( file)=>{
      return file.includes('.js');
    }
  );
  const views = files.filter(
    ( file)=>{
      return file.includes('.html');
    }
  );
  const resources = files.filter(
    ( file)=>{
      return file.includes('.svg');
    }
  );

  deployFiles(devFolder,deployFilesEnum.styling,styles);
  deployFiles(devFolder,deployFilesEnum.scripts,scripts);
  deployFiles(devFolder,deployFilesEnum.views,views);
  deployFiles(devFolder,deployFilesEnum.images,resources);
}

fs.readdir(devFolder, dirReadCallBack);