import chalk from 'chalk';

export default {
    debug: (...args: any[]) => {
        console.debug(chalk.magenta('🪲 '), ...args);
    },
    info: (...args: any[]) => {
        console.info(chalk.green('✅'), ...args);
    },
    warn: (...args: any[]) => {
        console.warn(chalk.yellow('⚠️'), ...args);
    },
    error: (...args: any[]) => {
        console.error(chalk.red('❌'), ...args);
    }
};
