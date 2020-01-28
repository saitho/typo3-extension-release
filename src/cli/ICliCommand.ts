import {ICliRequest} from "./ICliRequest";
import {ICliResponse} from "./ICliResponse";

export interface ICliCommand {
    canHandleRequest(request: ICliRequest): boolean;
    handleRequest(request: ICliRequest): ICliResponse;
}