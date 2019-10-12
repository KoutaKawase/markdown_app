"use strict";
exports.__esModule = true;
var marked = require("marked");
exports.md2html = function (markdown, cliOptions) {
    return marked(markdown, {
        gfm: cliOptions.gfm
    });
};
