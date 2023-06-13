import dotenv from 'dotenv';

dotenv.config();

import { createHash } from 'crypto';
import * as bs58 from 'bs58';

function convertPrivateKeyToWIFLitecoin(privateKey: string, testnet: boolean): string {
  const prefix = Buffer.from([testnet ? 0xef : 0xb0]);
  const suffix = Buffer.from([0x01]);

  // Step 1: Add prefix and suffix
  const extendedKey = Buffer.concat([prefix, Buffer.from(privateKey, 'hex'), suffix]);

  // Step 2: Calculate checksum
  const checksum = createHash('sha256').update(extendedKey).digest();
  const doubleChecksum = createHash('sha256').update(checksum).digest();
  const checksumBytes = doubleChecksum.slice(0, 4);

  // Step 3: Append checksum
  const extendedKeyWithChecksum = Buffer.concat([extendedKey, checksumBytes]);

  // Step 4: Convert to Base58
  const wifPrivateKey = bs58.encode(extendedKeyWithChecksum);

  return wifPrivateKey;
}

// Example usage
const privateKey: string = process.env.PRIVATE_KEY + "";
const wifPrivateKey = convertPrivateKeyToWIFLitecoin(privateKey, true);
console.log('WIF Private Key:', wifPrivateKey);