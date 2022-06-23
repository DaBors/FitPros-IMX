import { requireEnvironmentVariable } from "libs/utils";


(async (): Promise<void> => {
    const pinataApiKey = requireEnvironmentVariable('PINATA_API_KEY');
    const pinataSecretKey = requireEnvironmentVariable('PINATA_SECRET_KEY');

    const pinataSDK = require('@pinata/sdk');
    const pinata = pinataSDK(pinataApiKey, pinataSecretKey);


    try {
        await pinFromFS(pinata, "ipfs-metaapi", "./src/ipfs/fitpros_metadata/");
    } catch (error) {
        throw new Error(JSON.stringify(error, null, 2));
    }
})().catch(e => {
    process.exit(1);
});

function pinFromFS(pinata: any, pinataName: string, filePath: string) {
    const options = {
        pinataMetadata: {
            name: pinataName
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    pinata.pinFromFs(filePath, options).then((result: string) => {
        //handle results here
        console.log(result);
    }).catch((err: string) => {
        //handle error here
        console.log(err);
    });
}
