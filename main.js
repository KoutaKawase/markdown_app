"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var program = require("commander");
var fs = require("fs");
var md2html_1 = require("./md2html");
//gfmオプションを定義
program.option("--gfm", "GFMを有効にする");
//引数を受け取りパース
program.parse(process.argv);
//目標ファイルパス取得
var filePath = program.args[0];
//オブジェクトのマージ構文(spread)　かぶったら上書きされる
var clipOptions = __assign({ gfm: false }, program.opts());
fs.readFile(filePath, { encoding: "utf8" }, function (err, file) {
    if (err) {
        console.error(err.message);
        process.exit(1);
        return;
    }
    var html = md2html_1.md2html(file, clipOptions);
    console.log(html);
});
