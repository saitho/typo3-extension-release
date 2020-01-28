import {ICliCommand} from "./ICliCommand";
import {ICliRequest} from "./ICliRequest";
import {ICliResponse} from "./ICliResponse";

export abstract class AbstractCliCommand implements ICliCommand {
    protected abstract commandName: string;

    canHandleRequest(request: ICliRequest): boolean {
        if (request.input.length == 0) {
            return false;
        }
        return request.input[0] === this.commandName;
    }

    abstract handleRequest(request: ICliRequest): ICliResponse;
}