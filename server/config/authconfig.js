// This is required to read from the .env.local file
import localenv from 'localenv';

export default { secret: process.env.SECRET };
