import * as mockFs from 'mock-fs';
import {VersionizeCommand} from "../../src/commands/VersionizeCommand";
import {CliErrorResponse} from "../../src/cli/CliErrorResponse";
import {CliSuccessResponse} from "../../src/cli/CliSuccessResponse";

describe("VersionizeCommand", () => {
    it("sets supplied version and state", () => {
        mockFs({
            'ext_emconf.php': `<?php
$EM_CONF[$_EXTKEY] = [
    "version" => "",
    "state" => ""
];
`
        });
        const command = new VersionizeCommand();
        const response = command.handleRequest({
            input: ['versionize', '1.0.0', 'alpha'],
            flags: null
        });
        mockFs.restore();
        expect(response).toBeInstanceOf(CliSuccessResponse);
        expect(response.message).toEqual('ext_emconf.php: Set version to 1.0.0 and state to alpha');
    });

    it("set state to stable if none supplied", () => {
        mockFs({
            'ext_emconf.php': `<?php
$EM_CONF[$_EXTKEY] = [
    "version" => "",
    "state" => ""
];
`
        });
        const command = new VersionizeCommand();
        const response = command.handleRequest({
            input: ['versionize', '1.0.0'],
            flags: null
        });
        mockFs.restore();
        expect(response).toBeInstanceOf(CliSuccessResponse);
        expect(response.message).toEqual('ext_emconf.php: Set version to 1.0.0 and state to stable');
    });

    it("set state to beta if none supplied and version ends with -dev", () => {
        mockFs({
            'ext_emconf.php': `<?php
$EM_CONF[$_EXTKEY] = [
    "version" => "",
    "state" => ""
];
`
        });
        const command = new VersionizeCommand();
        const response = command.handleRequest({
            input: ['versionize', '1.0.0-dev'],
            flags: null
        });
        mockFs.restore();
        expect(response).toBeInstanceOf(CliSuccessResponse);
        expect(response.message).toEqual('ext_emconf.php: Set version to 1.0.0-dev and state to beta');
    });

    it("returns error if ext_emconf.php file not found", () => {
        mockFs({});
        const command = new VersionizeCommand();
        const response = command.handleRequest({
            input: ['versionize', '1.0.0'],
            flags: null
        });
        mockFs.restore();
        expect(response).toBeInstanceOf(CliErrorResponse);
        expect(response.message).toEqual('File ext_emconf.php could not be found.');
    });

    it("returns error if ext_emconf.php file does not have the expected format", () => {
        mockFs({
            'ext_emconf.php': `$foo = 'bar';`
        });
        const command = new VersionizeCommand();
        const response = command.handleRequest({
            input: ['versionize', '1.0.0'],
            flags: null
        });
        mockFs.restore();
        expect(response).toBeInstanceOf(CliErrorResponse);
        expect(response.message).toEqual('Array $EM_CONF could not be found in ext_emconf.php.');
    });
});