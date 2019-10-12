import * as program from 'commander';
import * as fs from 'fs';
import { md2html } from "./md2html";

//gfmオプションを定義
program.option("--gfm", "GFMを有効にする")
//引数を受け取りパース
program.parse(process.argv);
//目標ファイルパス取得
const filePath: string = program.args[0];

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
    console.log(html)
});