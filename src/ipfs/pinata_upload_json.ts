import { requireEnvironmentVariable } from "libs/utils";


(async (): Promise<void> => {
    const pinataApiKey = requireEnvironmentVariable('PINATA_API_KEY');
    const pinataSecretKey = requireEnvironmentVariable('PINATA_SECRET_KEY');

    const pinataSDK = require('@pinata/sdk');
    const pinata = pinataSDK(pinataApiKey, pinataSecretKey);
  
    
    try {
        const body = {
            "name": "FitPros #8",
            "image_url": "https://ipfs.io/ipfs/QmY4S5ZkB6zQvK15irEQY7LGrMgMcPNMjypM2UEYodyotW"
        };
      await pinJSONToIPFS(pinata, "logo.json", body);
    } catch (error) {
      throw new Error(JSON.stringify(error, null, 2));
    }
  })().catch(e => {
    process.exit(1);
  });

function pinJSONToIPFS(pinata: any, pinataName: string, json_data: any) {
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
    pinata.pinJSONToIPFS(json_data, options).then((result: string) => {
        //handle results here
        console.log(result);
    }).catch((err: string) => {
        //handle error here
        console.log(err);
    });
}