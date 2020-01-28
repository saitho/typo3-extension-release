import {CliSuccessResponse} from "../../src/cli/CliSuccessResponse";
import {VersionCommand} from "../../src/commands/VersionCommand";
import {Cli} from "../../src/cli/Cli";
import {mock, instance, when} from 'ts-mockito';

describe("VersionCommand", () => {
    it("shows version from package.json", () => {
        const mockCli = mock(Cli);
        when(mockCli.getPackageInfo()).thenReturn({
            version: '1.2.3-test'
        });

        const command = new VersionCommand();
        const response = command.handleRequest({
            input: ['version'],
            flags: null
        }, instance(mockCli));
        expect(response).toBeInstanceOf(CliSuccessResponse);
        expect(response.message).toEqual('1.2.3-test');
    });
});