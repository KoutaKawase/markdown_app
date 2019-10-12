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
var child_process_1 = require("child_process");
var OUTPUT_DIR = __dirname + "/output/";
var getFilePath = function (argPath) {
    // ./ で始まっていれば含まないパスを返す
    if (argPath.startsWith("./")) {
        return argPath.slice(2);
    }
    return argPath;
};
var checkValidOptions = function () {
    var options = process.argv;
    return options.every(function (value) {
        //最初の--を消す
        value = value.slice(2);
        //有効なオプションになかったらfalse
        availableOptions.hasOwnProperty(value);
    });
};
var previwInChrome = function (hasChromeOption, outputDir, prefix) {
    if (outputDir === void 0) { outputDir = OUTPUT_DIR; }
    if (hasChromeOption) {
        var chromeCommand = "/usr/bin/google-chrome " + outputDir + prefix + ".html";
        child_process_1.exec(chromeCommand, function (err, stdout, stderr) {
            if (err)
                throw new Error;
            return;
        });
    }
    return;
};
var outputHtmlFile = function (outputDir, prefix, html) {
    if (outputDir === void 0) { outputDir = OUTPUT_DIR; }
    fs.writeFile(outputDir + prefix + ".html", html, function (err) {
        if (err)
            throw err;
        console.log("SAVED SUCCESSFULLY!");
    });
};
//使用可能なオプションとその説明のリスト オプションを追加したかったらここに書く
var availableOptions = {
    gfm: "GFMを有効にする",
    chrome: "生成したHTMLを自動プレビュー"
};
//有効なオプションを設定
for (var _i = 0, _a = Object.entries(availableOptions); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], value = _b[1];
    program.option("--" + key, value);
}
//引数を受け取りパース　.
program.parse(process.argv);
//無効なオプションなら終了
var isValidOptions = checkValidOptions();
//目標ファイルパス取得 ./から始まっていれば消しておく
var filePath = getFilePath(program.args[0]);
var hasChromeOption = program.opts().chrome;
if (!hasChromeOption) {
    console.error("無効なオプションが含まれています。");
    process.exit(1);
}
//オブジェクトのマージ構文(spread)　かぶったら上書きされる
var clipOptions = __assign({ gfm: false }, program.opts());
fs.readFile(filePath, { encoding: "utf8" }, function (err, file) {
    if (err) {
        console.error(err.message);
        process.exit(1);
        return;
    }
    var html = md2html_1.md2html(file, clipOptions);
    var positionOfFirstFileExtensionComma = filePath.indexOf('.');
    var outputedFileNamePrefix = filePath.slice(0, positionOfFirstFileExtensionComma);
    outputHtmlFile(OUTPUT_DIR, outputedFileNamePrefix, html);
    //chromeオプションがあればブラウザで自動で開かせる
    previwInChrome(hasChromeOption, OUTPUT_DIR, outputedFileNamePrefix);
});
