import {Cli} from "./cli/Cli";
import {VersionizeCommand} from "./commands/VersionizeCommand";
import {HelpCommand} from "./commands/HelpCommand";
import {VersionCommand} from "./commands/VersionCommand";

new Cli('typo3-extension-release')
    .setOptions({
        'dry-run': {
            type: 'boolean',
            default: false,
            alias: 'd',
            description: 'Simulates changes without writing them'
        }
    })
    .addCommand(new VersionizeCommand())
    .addCommand(new HelpCommand())
    .addCommand(new VersionCommand())
    .run()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });