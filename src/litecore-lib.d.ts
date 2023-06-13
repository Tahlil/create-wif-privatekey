declare module 'litecore-lib' {
    export function Address(publicKey: Buffer, network: any): any;
    export function PrivateKey(privateKey: string, network: any): any;
    
    export interface Networks{
        livenet: any;
        testnet: any;
    }
  }