import {AstProcessor} from "./AstProcessor";

export class ExtEmConfAstProcessor extends AstProcessor {
    public findEmConfArray() {
        return this.findFirstAstMatch(function(child) {
            // Look for $EM_CONF = [...]
            return child.kind === 'assign' &&
                child.operator == '=' &&
                child.left.what.kind == 'variable' &&
                child.left.what.name == 'EM_CONF'
                ;
        });
    }

    public setExtEmConfValue(emConfArray: any, name: string, value: string) {
        const arrayItems = emConfArray.right.items;

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