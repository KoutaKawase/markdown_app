import * as program from 'commander';
import * as fs from 'fs';
import { md2html } from "./md2html";
import { exec } from "child_process";

const OUTPUT_DIR = __dirname + "/output/";

const getFilePath = (argPath: string): string => {
    // ./ で始まっていれば含まないパスを返す
    if (argPath.startsWith("./")) {
        return argPath.slice(2);
    }
    return argPath;
};

const previwInChrome = (hasChromeOption: boolean, outputDir: string = OUTPUT_DIR, prefix: string): void => {
    if (hasChromeOption) {
        const chromeCommand = `/usr/bin/google-chrome ${outputDir}${prefix}.html`;
        exec(chromeCommand, (err, stdout, stderr) => {
            if (err) throw new Error;
            return;
        });
    }
    return;
};

const outputHtmlFile = (outputDir = OUTPUT_DIR, prefix, html) => {
    fs.writeFile(outputDir + prefix + ".html", html, (err) => {
        if (err) throw err;
        console.log("SAVED SUCCESSFULLY!");
    });
};

//使用可能なオプションとその説明のリスト オプションを追加したかったらここに書く
const availableOptions = {
    gfm: "GFMを有効にする",
    chrome: "生成したHTMLを自動プレビュー",
};

//有効なオプションを設定
for (const [key, value] of Object.entries(availableOptions)) {
    program.option(`--${key}`, value);
}

//引数を受け取りパース　.
program.parse(process.argv);
//目標ファイルパス取得 ./から始まっていれば消しておく
const filePath: string = getFilePath(program.args[0]);
const hasChromeOption: boolean = program.opts().chrome;
console.log(program.opts());
//オブジェクトのマージ構文(spread)　かぶったら上書きされる
const clipOptions = {
    gfm: false,
    ...program.opts(),
}

fs.readFile(filePath, { encoding: "utf8" }, (err: Error, file: string) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
        return;
    }

    const html = md2html(file, clipOptions);
    const positionOfFirstFileExtensionComma: number = filePath.indexOf('.');
    const outputedFileNamePrefix: string = filePath.slice(0, positionOfFirstFileExtensionComma);
    outputHtmlFile(OUTPUT_DIR, outputedFileNamePrefix, html);
    //chromeオプションがあればブラウザで自動で開かせる
    previwInChrome(hasChromeOption, OUTPUT_DIR, outputedFileNamePrefix);
});
