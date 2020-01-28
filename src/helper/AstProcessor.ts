import * as fs from "fs";
import * as PhpParser from "php-parser";
import * as PhpUnparser from "php-unparser";

export class AstProcessor {

    protected ast: any;

    public getAst(): any {
        return this.ast;
    }

    public static forFile(filePath: string) {
        const contents = fs.readFileSync(filePath, 'utf8');
        // @ts-ignore
        const ast = new PhpParser().parseCode(contents);
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

    public toPHP(): string {
        return PhpUnparser(this.getAst());
    }
}