import * as program from 'commander';
import * as fs from 'fs';
import { md2html } from "./md2html";

const OUTPUT_DIR = __dirname + "/output/";

const getFilePath = (argPath: string): string => {
    // ./ で始まっていれば含まないパスを返す
    if (argPath.startsWith("./")) {
        return argPath.slice(2);
    }
    return argPath;
};

const outputHtmlFile = (outputDir = OUTPUT_DIR, filePath, html) => {
    //コンマ以前の名前のみを取得
    const positionOfFirstFileExtensionComma: number = filePath.indexOf('.');
    const outputedFileNamePrefix: string = filePath.slice(0, positionOfFirstFileExtensionComma);
    fs.writeFile(outputDir + outputedFileNamePrefix + ".html", html, (err) => {
        if (err) throw err;
        console.log("SAVED SUCCESSFULLY!");
    });
};

//gfmオプションを定義
program.option("--gfm", "GFMを有効にする")
//引数を受け取りパース　.
program.parse(process.argv);
//目標ファイルパス取得 ./から始まっていれば消しておく
const filePath: string = getFilePath(program.args[0]);

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
    outputHtmlFile(OUTPUT_DIR, filePath, html);
});

//todo 出力に成功したらブラウザで自動的に開くオプションをつける