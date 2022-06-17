import { requireEnvironmentVariable } from "libs/utils";


(async (): Promise<void> => {
    const pinata_api_key = requireEnvironmentVariable('PINATA_API_KEY');
    const pinata_secret_key = requireEnvironmentVariable('PINATA_SECRET_KEY');

    const pinataSDK = require('@pinata/sdk');
    const pinata = pinataSDK(pinata_api_key, pinata_secret_key);


    try {
        await pinFileToIPFS(pinata, "logo.png", "./src/ipfs/fitpros_metadata/");
    } catch (error) {
        throw new Error(JSON.stringify(error, null, 2));
    }
})().catch(e => {
    process.exit(1);
});

function pinFileToIPFS(pinata: any, pinataName: string, filePath: string) {
    const fs = require('fs');
    const readableStreamForFile = fs.createReadStream(filePath);
    const options = {
        pinataMetadata: {
            name: pinataName,
            keyvalues: {
                customKey: 'customValue',
                customKey2: 'customValue2'
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    pinata.pinFileToIPFS(readableStreamForFile, options).then((result: string) => {
        //handle results here
        console.log(result);
    }).catch((err: string) => {
        //handle error here
        console.log(err);
    });
}
