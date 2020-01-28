import * as meow from "meow";
import {ICliCommand} from "./ICliCommand";
import {ICliResponse} from "./ICliResponse";
import {CliOptions} from "./TCliOptions";
import {ICliCommandExample} from "./ICliCommandExample";
import {CliErrorResponse} from "./CliErrorResponse";

export class Cli {
    protected binaryName = 'typo3-extension-release';
    protected options: CliOptions;
    protected examples: ICliCommandExample[];
    protected commands: ICliCommand[] = [];

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

    public addCommand(command: ICliCommand): this {
        this.commands.push(command);
        return this;
    }

    async run() {
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
        const command = this.commands.filter((command) => command.canHandleRequest(request));
        if (command.length == 0) {
            response = new CliErrorResponse('The requested command was not found.');
        } else if (command.length > 1) {
            response = new CliErrorResponse('Multiple commands matching this call were found.');
        } else {
            try {
                response = await command[0].handleRequest(request);
            } catch (e) {
                response = new CliErrorResponse(e);
            }
        }

        if (response instanceof CliErrorResponse) {
            console.error('Command execution failed with the following error:\n\n' + response.message);
            process.exit(response.errorCode > 0 ? response.errorCode : 1);
        } else {
            console.log(response.message || 'Command execution finished successfully.');
        }
    }
}