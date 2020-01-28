import {AbstractCliCommand} from "../cli/AbstractCliCommand";
import {ICliRequest} from "../cli/ICliRequest";
import {ICliResponse} from "../cli/ICliResponse";
import {CliSuccessResponse} from "../cli/CliSuccessResponse";
import {Cli} from "../cli/Cli";

export class HelpCommand extends AbstractCliCommand {
    commandName = 'help';
    commandDescription = 'Shows help (this page)';

    protected async process(request: ICliRequest, cli: Cli): Promise<ICliResponse> {
        let helpText = `${cli.getPackageInfo().description}

  Usage
   $ ${cli.getBinaryName()} [command]
    
  Available commands
${this.listCommands(cli)}`;
        const options = cli.getOptions();
        if (Object.keys(options).length) {
            helpText += `\n  Available options:\n`;
            for (const flag of Object.keys(options)) {
                const option: any = options[flag];
                helpText += '   ';
                const optionName = (option.default === true) ? 'no-' + flag : flag;
                helpText += '--' + optionName;
                if (option.alias) {
                    helpText += ', -' + option.alias;
                }
                if (option.hasOwnProperty('description')) {
                    helpText += '  ' + option.description;
                }
                helpText += '\n'
            }
        }

        return new CliSuccessResponse(helpText);
    }

    protected listCommands(cli: Cli) {
        let text = '';
        for (const {name, description} of cli.getAvailableCommands()) {
            text += '   ' + name + ': ' + description + '\n';
        }
        return text;
    }
}