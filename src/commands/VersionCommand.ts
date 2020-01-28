import {AbstractCliCommand} from "../cli/AbstractCliCommand";
import {ICliRequest} from "../cli/ICliRequest";
import {ICliResponse} from "../cli/ICliResponse";
import {CliSuccessResponse} from "../cli/CliSuccessResponse";
import {Cli} from "../cli/Cli";

export class VersionCommand extends AbstractCliCommand {
    commandName = 'version';
    commandDescription = 'Displays version number of this tool';

    protected async process(request: ICliRequest, cli: Cli): Promise<ICliResponse> {
        return new CliSuccessResponse(`${cli.getPackageInfo().version}`);
    }
}