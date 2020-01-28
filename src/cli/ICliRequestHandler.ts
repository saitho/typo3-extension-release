import {ICliRequest} from "./ICliRequest";
import {ICliResponse} from "./ICliResponse";

export interface ICliRequestHandler {
    canHandleRequest(request: ICliRequest): boolean;
    handleRequest(request: ICliRequest): ICliResponse;
}