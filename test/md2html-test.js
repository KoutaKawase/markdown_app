"use strict";
exports.__esModule = true;
var assert = require("assert");
var fs = require("fs");
var path = require("path");
var md2html_1 = require("../md2html");
it("converts Markdown to HTML(GFM=false)", function () {
    var sample = fs.readFileSync(path.resolve(__dirname, "./fixtures/sample.md"), "utf-8");
    var expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/expected.html"), "utf-8");
    assert.strictEqual(md2html_1.md2html(sample, { gfm: false }), expected);
});
it("converts MarkDown to HTML (GFM=true)", function () {
    var sample = fs.readFileSync(path.resolve(__dirname, "./fixtures/sample.md"), "utf-8");
    var expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/expected-gfm.html"), "utf-8");
    assert.strictEqual(md2html_1.md2html(sample, { gfm: true }), expected);
});
