import logger from '../logger';
import BaseMode from '../modes/baseMode';
import { isModeInstanceValid } from '../validators/mode.validator';
import { SESSION_CONTEXT } from '../config/loggerContexts';

class ModeRegistry {
    private static modes: { [key: string]: BaseMode } = {};

    private static async registerMode(
        modeName: string,
        modeInstance: BaseMode
    ) {
        try {
            this.modes[modeName] = await isModeInstanceValid(modeInstance);
        } catch (error) {
            logger.error(
                SESSION_CONTEXT,
                `Error registering mode: ${modeName}. Error: ${error.message}`
            );
        }
    }

    static registerModes(modeInstances: BaseMode[]) {
        modeInstances.forEach(async (modeInstance) => {
            await this.registerMode(modeInstance.modeName, modeInstance);

            logger.info(
                SESSION_CONTEXT,
                `Registered mode: ${modeInstance.modeName}`
            );
        });
    }

    static getMode(modeName: string): BaseMode {
        const modeInstance = this.modes[modeName];

        if (!modeInstance)
            throw new Error(`Mode ${modeName} is not registered.`);

        return modeInstance;
    }

    static getRegisteredModes(): string[] {
        return Object.keys(this.modes);
    }

    static isModeRegistered(modeName: string): boolean {
        return Object.keys(this.modes).includes(modeName);
    }
}

export default ModeRegistry;
