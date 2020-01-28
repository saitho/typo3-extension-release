import {AbstractCliCommand} from "../cli/AbstractCliCommand";
import {ICliRequest} from "../cli/ICliRequest";
import {ICliResponse} from "../cli/ICliResponse";
import {CliSuccessResponse} from "../cli/CliSuccessResponse";
import * as fs from "fs";
import {CliErrorResponse} from "../cli/CliErrorResponse";
import {ExtEmConfAstProcessor} from "../helper/ExtEmConfAstProcessor";

export class VersionizeCommand extends AbstractCliCommand {
    commandName = 'versionize';
    commandDescription = 'Adjusts version and state in ext_emconf.php';

    protected astProcessor: ExtEmConfAstProcessor;

    protected arguments = [{
        name: 'version',
        type: 'string',
        required: true
    }, {
        name: 'label',
        type: 'string',
        required: false
    }];

    protected async process(request: ICliRequest): Promise<ICliResponse> {
        const fileName = 'ext_emconf.php';
        if (!fs.existsSync(fileName)) {
            return new CliErrorResponse(`File ${fileName} could not be found.`);
        }

        this.astProcessor = ExtEmConfAstProcessor.forFile(fileName) as ExtEmConfAstProcessor;

        if (!this.astProcessor.hasConfArray()) {
            return new CliErrorResponse(`Array $EM_CONF could not be found in ${fileName}.`);
        }

        const version = request.input[1];

        let defaultState = 'stable';
        if (version.endsWith('-dev')) {
            defaultState = 'beta';
        }

        const state = request.input[2] || defaultState;

        // Set version and state
        this.astProcessor.setExtEmConfValue('version', version);
        this.astProcessor.setExtEmConfValue('state', state);

        // Overwrite old file
        fs.writeFileSync(fileName, this.astProcessor.toPHP(), {flag: 'w'});

        return new CliSuccessResponse(`ext_emconf.php: Set version to ${version} and state to ${state}`);
    }
}