import {AstProcessor} from "./AstProcessor";

export class ExtEmConfAstProcessor extends AstProcessor {
    protected emConfArray: any;

    constructor(ast: any) {
        super(ast);
        this.emConfArray = this.findEmConfArray();
    }

    protected findEmConfArray() {
        return this.findFirstAstMatch(function(child) {
            // Look for $EM_CONF = [...]
            return child.kind === 'assign' &&
                child.operator == '=' &&
                child.left.what.kind == 'variable' &&
                child.left.what.name == 'EM_CONF'
                ;
        });
    }

    public hasConfArray(): boolean {
        return this.emConfArray !== null;
    }

    public setExtEmConfValue(name: string, value: string) {
        const arrayItems = this.findEmConfArray().right.items;

        const entry = arrayItems.filter((item)  => item.key.value === name);
        if (!entry.length) { // Create new item
            arrayItems.push({
                kind: 'entry',
                key: {'kind': 'string', value: name},
                value: {'kind': 'string', value: value},
            });
        } else {
            entry[0].value.value = value;
        }
    }
}