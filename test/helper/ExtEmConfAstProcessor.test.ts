import {ExtEmConfAstProcessor} from "../../src/helper/ExtEmConfAstProcessor";
import * as mockFs from 'mock-fs';

describe("ExtEmConfAstProcessor", () => {
    it("change existing field", () => {

        mockFs({
            'ext_emconf.php': `<?php
$EM_CONF[$_EXTKEY] = [
    "version" => ""
];
`
        });
        const processor = ExtEmConfAstProcessor.forFile('ext_emconf.php') as ExtEmConfAstProcessor;
        processor.setExtEmConfValue('version', '1.0.0');
        mockFs.restore();

        const expectedOutput = `<?php
$EM_CONF[$_EXTKEY] = ["version" => "1.0.0"];
`;

        expect(processor.hasConfArray()).toEqual(true);

        expect(processor.toPHP()).toEqual(expectedOutput);
    });

    it("add new field if it does not exist", () => {

        mockFs({
            'ext_emconf.php': `<?php
$EM_CONF[$_EXTKEY] = [
    "version" => "1.0.0",
];
`
        });
        const processor = ExtEmConfAstProcessor.forFile('ext_emconf.php') as ExtEmConfAstProcessor;
        processor.setExtEmConfValue('state', 'stable');
        mockFs.restore();

        const expectedOutput = `<?php
$EM_CONF[$_EXTKEY] = ["version" => "1.0.0", "state" => "stable"];
`;

        expect(processor.hasConfArray()).toEqual(true);

        expect(processor.toPHP()).toEqual(expectedOutput);
    });
});