import * as fs from "fs";

export class AstProcessor {

    protected ast: any;

    public getAst(): any {
        return this.ast;
    }

    public static forFile(filePath: string) {
        const contents = fs.readFileSync(filePath, 'utf8');
        const phpParser = require('php-parser');
        const ast = new phpParser().parseCode(contents);
        return new this(ast);
    }

    constructor(ast: any) {
        this.ast = ast;
    }

    public findFirstAstMatch(matcher: Function, tree: any = this.ast) {
        const childList = [];
        if (matcher(tree)) {
            return tree;
        } else if (tree.hasOwnProperty('children')) {
            childList.push(...tree.children);
        }
        if (childList.length) {
            for(const child of childList) {
                const match = this.findFirstAstMatch(matcher, child);
                if (match) {
                    return match;
                }
            }
        }
        return null;
    }
}