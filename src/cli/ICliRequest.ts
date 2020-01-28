import {TypedFlags} from "meow";
import {Options as MinimistOptions} from "minimist-options";

export interface ICliRequest {
    input: string[];
    flags: TypedFlags<MinimistOptions>;
}