const fs = require('fs');
const compressing = require('compressing');

//get css
let css = "";
try {
    css = fs.readFileSync('./dist/main.css', 'utf8');
} catch (err) {
    console.error(err);
    process.exit()
}
//get js
let js = "";
try {
    js = fs.readFileSync('./dist/main.js', 'utf8');
} catch (err) {
    console.error(err);
    process.exit()
}
//get html
let html = "";
try {
    html = fs.readFileSync('./public/index.html', 'utf8');
} catch (err) {
    console.error(err);
    process.exit()
}
//remove main.js script tag
html = html.replace('<script src="main.js"></script>','');
//find placeholder index
let styleTagIndex = html.indexOf("<!--inject_main_style-->");
//write html file beginning
try {
    fs.writeFileSync('./dist/bundle.html', html.substring(0, styleTagIndex));
} catch (err) {
    console.error(err);
    process.exit()
}
//write css
try {
    fs.appendFileSync('./dist/bundle.html', "<style>");
    fs.appendFileSync('./dist/bundle.html', css);
    fs.appendFileSync('./dist/bundle.html', "</style>");
} catch (err) {
    console.error(err);
    process.exit()
}
//find js index
let jsTagIndex = html.indexOf("<!--inject_main_script-->");
//write middle part
try {
    fs.appendFileSync('./dist/bundle.html', html.substring(styleTagIndex, jsTagIndex));
} catch (err) {
    console.error(err);
    process.exit()
}
//write js
try {
    fs.appendFileSync('./dist/bundle.html', "<script>");
    fs.appendFileSync('./dist/bundle.html', js);
    fs.appendFileSync('./dist/bundle.html', "</script>");
} catch (err) {
    console.error(err);
    process.exit()
}
//ending
try {
    fs.appendFileSync('./dist/bundle.html', html.substring(jsTagIndex));
} catch (err) {
    console.error(err);
    process.exit()
}
//gzip
compressing.gzip.compressFile('./dist/bundle.html', './dist/bundle.html.gz')
.then( success => {
    console.log("Compressed successfully!");
})
.catch( err => {
    console.error(err);
});
