import {Cli, HelpCommand, VersionCommand} from "@saithodev/cli-base";
import {VersionizeCommand} from "./commands/VersionizeCommand";

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