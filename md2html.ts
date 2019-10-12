import * as marked from "marked";

export const md2html = (markdown: string, cliOptions) => {
    return marked(markdown, {
        gfm: cliOptions.gfm,
    });
};