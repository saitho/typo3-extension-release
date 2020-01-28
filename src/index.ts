import {Cli} from "./cli/Cli";
import {VersionizeCommand} from "./commands/VersionizeCommand";

new Cli()
    .setExamples([
        {command: 'foo', output: 'bar', root: false}
    ])
    .setOptions({
        rainbow: {
            type: 'boolean',
            default: true,
            alias: 'r',
            description: 'rainbow'
        },
        unicorn: {
            type: 'boolean',
            default: false,
            alias: 'u'
        },
        cake: {
            type: 'boolean',
            alias: 'c'
        },
        sparkles: {
            type: 'boolean',
            default: true
        }
    })
    .addCommand(new VersionizeCommand())
    .run()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });