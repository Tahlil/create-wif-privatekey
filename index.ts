import * as dotenv from "dotenv";

import { createHash } from "crypto";
import * as bs58 from "bs58";

dotenv.config();


const mainnetPrefix = {
  "BTC": 0x80,
  "LTC":  0xb0,
  "BCH":  0x80,
  "DOGE":  0x9e,
}

// convertTOWIF
function convertPrivateKeyToWIFBTCBasedChain(
  privateKey: string,
  testnet: boolean,
  chainType: "BTC" | "LTC" | "BCH" | "DOGE"
): string {
  const prefix = Buffer.from([testnet ? 0xef : mainnetPrefix[chainType]]);
  const suffix = Buffer.from([0x01]);

  // Step 1: Add prefix and suffix
  const extendedKey = Buffer.concat([
    prefix,
    Buffer.from(privateKey, "hex"),
    suffix,
  ]);

  // Step 2: Calculate checksum
  const checksum = createHash("sha256").update(extendedKey).digest();
  const doubleChecksum = createHash("sha256").update(checksum).digest();
  const checksumBytes = doubleChecksum.slice(0, 4);

  // Step 3: Append checksum
  const extendedKeyWithChecksum = Buffer.concat([extendedKey, checksumBytes]);

  // Step 4: Convert to Base58
  const wifPrivateKey = bs58.encode(extendedKeyWithChecksum);

  return wifPrivateKey;
}



// Example usage
const privateKey: string = process.env.PRIVATE_KEY + "";

// const wifPrivateKey = convertPrivateKeyToWIFBTCBasedChain(privateKey, false, "DOGE");
// console.log("WIF Private Key:", wifPrivateKey);

const wifPrivateKey = convertPrivateKeyToWIFBTCBasedChain(privateKey, false, "BCH");
console.log("WIF Private Key:", wifPrivateKey);


