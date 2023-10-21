import fs from 'fs';
import dotenv from 'dotenv';

const initializeENV = () => {
    const path = '/env/.env';
    if (fs.existsSync(path)) {
        dotenv.config({ path });
    } else {
        dotenv.config();
    }
};

initializeENV();

export default initializeENV;
