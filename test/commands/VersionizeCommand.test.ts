import * as mockFs from 'mock-fs';
import * as fs from 'fs';
import {VersionizeCommand} from "../../src/commands/VersionizeCommand";
import {Cli, SuccessResponse, ErrorResponse} from "@saithodev/cli-base";
import {mock, instance} from 'ts-mockito';

describe("VersionizeCommand", () => {
    it("sets supplied version and state", async () => {
        const mockCli = mock(Cli);
        mockFs({
            'ext_emconf.php': `<?php
$EM_CONF[$_EXTKEY] = [
    "version" => "",
    "state" => ""
];
`
        });
        const command = new VersionizeCommand();
        const response = await command.handleRequest({
            input: ['versionize', '1.0.0', 'alpha'],
            flags: {'dry-run': false}
        }, instance(mockCli));
        mockFs.restore();
        expect(response).toBeInstanceOf(SuccessResponse);
        expect(response.message).toEqual('ext_emconf.php: Set version to 1.0.0 and state to alpha');
    });

    it("set state to stable if none supplied", async () => {
        mockFs({
            'ext_emconf.php': `<?php
$EM_CONF[$_EXTKEY] = [
    "version" => "",
    "state" => ""
];
`
        });
        const command = new VersionizeCommand();
        const mockCli = mock(Cli);
        const response = await command.handleRequest({
            input: ['versionize', '1.0.0'],
            flags: {'dry-run': false}
        }, instance(mockCli));
        mockFs.restore();
        expect(response).toBeInstanceOf(SuccessResponse);
        expect(response.message).toEqual('ext_emconf.php: Set version to 1.0.0 and state to stable');
    });

    it("set state to beta if none supplied and version ends with -dev", async () => {
        mockFs({
            'ext_emconf.php': `<?php
$EM_CONF[$_EXTKEY] = [
    "version" => "",
    "state" => ""
];
`
        });
        const command = new VersionizeCommand();
        const mockCli = mock(Cli);
        const response = await command.handleRequest({
            input: ['versionize', '1.0.0-dev'],
            flags: {'dry-run': false}
        }, instance(mockCli));
        mockFs.restore();
        expect(response).toBeInstanceOf(SuccessResponse);
        expect(response.message).toEqual('ext_emconf.php: Set version to 1.0.0-dev and state to beta');
    });

    it("dry-run does not write", async () => {
        const mockCli = mock(Cli);
        const fileContent = `<?php
$EM_CONF[$_EXTKEY] = [
    "version" => "",
    "state" => ""
];
`;
        mockFs({
            'ext_emconf.php': fileContent
        });
        const command = new VersionizeCommand();
        const response = await command.handleRequest({
            input: ['versionize', '1.0.0', 'alpha'],
            flags: {'dry-run': true}
        }, instance(mockCli));
        expect(fs.readFileSync('ext_emconf.php').toString()).toEqual(fileContent);
        mockFs.restore();
        expect(response).toBeInstanceOf(SuccessResponse);
        expect(response.message).toEqual('ext_emconf.php: Set version to 1.0.0 and state to alpha\nDRY-RUN active. Nothing written.');
    });

    it("returns error if ext_emconf.php file not found", async () => {
        mockFs({});
        const command = new VersionizeCommand();
        const mockCli = mock(Cli);
        const response = await command.handleRequest({
            input: ['versionize', '1.0.0'],
            flags: {'dry-run': false}
        }, instance(mockCli));
        mockFs.restore();
        expect(response).toBeInstanceOf(ErrorResponse);
        expect(response.message).toEqual('File ext_emconf.php could not be found.');
    });

    it("returns error if ext_emconf.php file does not have the expected format", async () => {
        mockFs({
            'ext_emconf.php': `$foo = 'bar';`
        });
        const command = new VersionizeCommand();
        const mockCli = mock(Cli);
        const response = await command.handleRequest({
            input: ['versionize', '1.0.0'],
            flags: {'dry-run': false}
        }, instance(mockCli));
        mockFs.restore();
        expect(response).toBeInstanceOf(ErrorResponse);
        expect(response.message).toEqual('Array $EM_CONF could not be found in ext_emconf.php.');
    });
});