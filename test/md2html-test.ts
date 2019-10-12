import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import { md2html } from "../md2html";
import { isMainThread } from "worker_threads";

it("converts Markdown to HTML(GFM=false)", () => {
    const sample: string = fs.readFileSync(path.resolve(__dirname, "./fixtures/sample.md"), "utf-8");
    const expected: string = fs.readFileSync(path.resolve(__dirname, "./fixtures/expected.html"), "utf-8");
    assert.strictEqual(md2html(sample, { gfm: false }), expected);
});

it("converts MarkDown to HTML (GFM=true)", () => {
    const sample: string = fs.readFileSync(path.resolve(__dirname, "./fixtures/sample.md"), "utf-8");
    const expected: string = fs.readFileSync(path.resolve(__dirname, "./fixtures/expected-gfm.html"), "utf-8");

    assert.strictEqual(md2html(sample, { gfm: true }), expected);
});