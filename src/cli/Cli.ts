import * as meow from "meow";
import {ICliRequestHandler} from "./ICliRequestHandler";
import {ICliResponse} from "./ICliResponse";
import {CliOptions} from "./TCliOptions";
import {ICliCommandExample} from "./ICliCommandExample";

export class Cli {
    protected binaryName = 'typo3-extension-release';
    protected options: CliOptions;
    protected examples: ICliCommandExample[];
    protected requestHandlers: ICliRequestHandler[] = [];

    public setOptions(options: CliOptions): this {
        this.options = options;
        return this;
    }

    public setExamples(examples: ICliCommandExample[]): this {
        this.examples = examples;
        return this;
    }

    protected getExamplesText(): string {
        let text = '';
        for (const example of this.examples) {
            text += '      ';
            text += example.root ? '#' : '$';
            text += ' ' + example.command + '\n';
            text += '      ';
            text += example.output + '\n'
        }
        return text;
    }

    protected getOptionsText(): string {
        let text = '';
        for (const flag of Object.keys(this.options)) {
            const option: any = this.options[flag];
            text += '      ';
            const optionName = (option.default === true) ? 'no-' + flag : flag;
            text += '--' + optionName;
            if (option.alias) {
                text += ', -' + option.alias;
            }
            if (option.hasOwnProperty('description')) {
                text += '  ' + option.description;
            }
            text += '\n'
        }
        return text;
    }

    public addRequestHandler(requestHandler: ICliRequestHandler): this {
        this.requestHandlers.push(requestHandler);
        return this;
    }

    run() {
        const cli = meow(`
    Usage
      $ ${this.binaryName}
 
    Options
${this.getOptionsText()}
 
    Examples
${this.getExamplesText()}
`, {
            booleanDefault: undefined,
            flags: this.options,
            autoHelp: true
        });
        const request = {input: cli.input, flags: cli.flags};

        let response: ICliResponse;
        for(const handler of this.requestHandlers) {
            if (handler.canHandleRequest(request)) {
                response = handler.handleRequest(request);
                break;
            }
        }

        // todo: evaluate response
        console.log(response);
    }
}