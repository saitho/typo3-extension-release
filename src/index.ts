import {Cli} from "./cli/Cli";

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
    //.addRequestHandler()
    .run();