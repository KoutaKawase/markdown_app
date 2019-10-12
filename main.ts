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

//gfmオプションを定義
program.option("--gfm", "GFMを有効にする")
program.option("--chrome", "生成したHTMLをchromeで自動プレビュー")
//引数を受け取りパース　.
program.parse(process.argv);
//目標ファイルパス取得 ./から始まっていれば消しておく
const filePath: string = getFilePath(program.args[0]);
const hasChromeOption: boolean = program.opts().chrome;
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


//todo 出力に成功したらブラウザで自動的に開くオプションをつける
 // - /usr/bin/google-chrome path コマンドで開く