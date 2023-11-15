import * as fs from 'fs';
import * as path from 'path';
import ModeRegistry from './helpers/modeRegistry';

export function modesRegisterFromDir(dirPath: string): void {
    const modes: any[] = [];

    const files = fs.readdirSync(dirPath);
    files.forEach((f) => {
        const filePath = path.join(dirPath, f);
        if (fs.statSync(filePath).isDirectory()) {
            const modeFilePath = path.join(filePath, `${f}.ts`);

            // Issue Fix: When additional modes are added, this would prevent duplication of code and improve developer experience.
            if (fs.existsSync(modeFilePath)) {
                const modeClass = require(modeFilePath).default;
                const modeObject = new modeClass();
                modes.push(modeObject);
            }
        }
    });

    // Registering modes here instead of directly registring into the server.
    ModeRegistry.registerModes(modes);
}
