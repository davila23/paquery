/*
 * grunt-dist
 * 
 *
 * Copyright (c) 2015 jaywcjlove
 * Licensed under the MIT license.
 */
'use strict';


var fs = require('fs');
var clc = require('cli-color');
var UglifyJS = require("uglify-js");
var root = __dirname + '/'

require('shelljs/make');

//路径切换到项目根目录
// root = exec('pwd').output.replace(/\s+$/,'/')

//压缩
function compress(file,file_nim,file_gz){
    // var zlib = require('zlib')
    // var gzip = zlib.createGzip();
    // var fs = require('fs');
    // var inp = fs.createReadStream('dist/JSLite.js');
    // var out = fs.createWriteStream('build/JSLite.js.gz');

    // inp.pipe(gzip).pipe(out);
}


function build(tofile,path){
    var dist,url = fileext(path)
    // 生成dist
    mkdir('-p', tofile);

    root = process.cwd()+'/';
    //在dist中生成原生文件
    dist = cat(path).replace(/\n{3,}/g, "\n\n");
    dist.to(tofile + '/' + url);
    report_size(tofile + '/' + url);

    // 文件压缩代码压缩
    // 使用插件 [UglifyJS 2](https://github.com/mishoo/UglifyJS2)
    //在dist中生成 map 和 min 文件
    var result = UglifyJS.minify([root+tofile + '/' + url],{
        outSourceMap: fileext('map',path),
        sourceRoot:'http://jslite.io'
    });

    result.code.to(tofile + '/' + fileext('min',path));
    report_size(tofile + '/' + fileext('min',path));
    result.map.to(tofile + '/' + fileext('map',path));
    report_size(tofile + '/' + fileext('map',path));

    // compress(tofile + '/' + url,tofile + '/' + fileext('min',path),tofile + '/' + fileext('gz',path))
}

module.exports = function(grunt) {
  
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('dist', 'The best Grunt plugin ever.', function() {
        var files = this.filesSrc;
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            // Concat specified files.
            var src = f.src.filter(function(filepath) {
                // console.log("filepath:2:",grunt.file.exists(filepath));
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                build(f.dest,filepath)
                // dist.to(f.dest);
                // console.log("filepath:3:",filepath,f.dest);
                // Read file source.
                // return grunt.file.read(filepath);
            }).join(grunt.util.normalizelf(options.separator))


            // console.log("message:2",src);
            // console.log("message:3",grunt.util.normalizelf(options.separator));

            // // Handle options.
            // src += options.punctuation;

            // // Write the destination file.
            // grunt.file.write(f.dest, src);

            // // Print a success message.
            // grunt.log.writeln('File "' + f.dest + '" created.');
        });
    });

};


//返回文件名字 + 后缀
function fileext(type,path){
    if(!path) path = type,type = false;

    var file_arr = path.match(/([^:\\/]*?)(?:\.([^ :\\/.]*))$/)
    var fileext = file_arr[2];
    var name = file_arr[1];
    var new_name = ''

    switch(type){
        case "min":new_name = name + '.min.' + fileext;break;
        case "map": new_name = name + '.min.map';break;
        case "gz": new_name = name + '.min.gz';break;
        default: new_name = file_arr[0];
    }
    return new_name;
}


//换算
function format_number(size, precision) {
    var decimal, factor;
    if (precision == null) precision = 1;
    factor = Math.pow(10, precision);
    decimal = Math.round(size * factor) % factor;
    return parseInt(size) + "." + decimal;
};

//统计文件字节数
function fsize(file) {
    return fs.statSync(file).size;
};

//输出大小
function report_size(file) {
    return echo(" › " + clc.xterm(161)(file)  + ": " + (format_number(fsize(file) / 1024)) + " KiB");
};