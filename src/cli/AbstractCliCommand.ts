import {ICliCommand} from "./ICliCommand";
import {ICliRequest} from "./ICliRequest";
import {ICliResponse} from "./ICliResponse";

export abstract class AbstractCliCommand implements ICliCommand {
    protected abstract commandName: string;
    protected arguments = [];

    canHandleRequest(request: ICliRequest): boolean {
        if (request.input.length == 0) {
            return false;
        }
        if (request.input[0] !== this.commandName) {
            return false;
        }

        const suppliedArguments = request.input.length-1;
        const requiredArguments = this.arguments.filter((arg) => arg.required).length;
        if (requiredArguments > suppliedArguments) {
            console.log(`Command ${this.commandName} not invoked because it requires ${requiredArguments} arguments. ${suppliedArguments} supplied.`);
            return false;
        }
        // Todo: check arguments in detail

        return true;
    }

    protected abstract process(request: ICliRequest): ICliResponse;

    handleRequest(request: ICliRequest): ICliResponse {
        return this.process(request);
    }
}