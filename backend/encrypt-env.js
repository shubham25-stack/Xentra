// encrypt-env.js
import { encryptEnv,decryptEnv } from 'shubham-securestore';

// Replace this with your strong password
const password = 'myStrongPassword';

// Encrypt the .env file
decryptEnv(password);
