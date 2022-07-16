const fs = require('fs');
const compressing = require('compressing');

//get css
let css = "";
try {
    css = fs.readFileSync('../dist/main.css', 'utf8');
} catch (err) {
    console.error(err);
    process.exit()
}
//get js
let js = "";
try {
    js = fs.readFileSync('../dist/main.js', 'utf8');
} catch (err) {
    console.error(err);
    process.exit()
}
//get html
let html = "";
try {
    html = fs.readFileSync('../public/index.html', 'utf8');
} catch (err) {
    console.error(err);
    process.exit()
}
//remove main.js script tag
html = html.replace('<script src="main.js"></script>','');
//replace placeholders in html with js, css
html = html.replace('<!--$inject_main_style-->', `<style>${css}</style>`);
html = html.replace('<!--$inject_main_script-->', `<script>${js}</script>`);
try {
    fs.writeFileSync('../dist/bundle.html', html);
} catch (err) {
    console.error(err);
    process.exit()
}
//gzip that s***
compressing.gzip.compressFile('../dist/bundle.html', '../dist/bundle.html.gz')
.then( success => {
    console.log("Compressed successfully!");
})
.catch( err => {
    console.error(err);
});
