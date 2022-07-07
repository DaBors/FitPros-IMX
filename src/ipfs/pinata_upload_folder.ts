import { requireEnvironmentVariable } from "libs/utils";


(async (): Promise<void> => {
    try {
        await pinFromFS("./src/ipfs/fitpros_metadata");
    } catch (error) {
        throw new Error(JSON.stringify(error, null, 2));
    }
})().catch(e => {
    console.log(e)
    process.exit(1);
});

export function pinFromFS(src: string) {
    const fs = require("fs");
    const FormData = require("form-data");
    const rfs = require("recursive-fs");
    const basePathConverter = require("base-path-converter");
    const got = require('got');

    const pinDirectoryToPinata = async () => {
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        try {
            const { dirs, files } = await rfs.read(src);
            let data = new FormData();
            for (const file of files) {
                data.append(`file`, fs.createReadStream(file), {
                    filepath: basePathConverter(src, file),
                });
            }

            const pinataApiKey = requireEnvironmentVariable('PINATA_API_KEY');
            const pinataSecretKey = requireEnvironmentVariable('PINATA_SECRET_KEY');
            
            console.log(data)
            console.log(data._boundary)
            const response = await got(url, {
                method: 'POST',
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                    "pinata_api_key": pinataApiKey,
                    "pinata_secret_api_key": pinataSecretKey
                },
                body: data
            })
                .on('uploadProgress', (progress: any) => {
                    console.log(progress);
                });

            console.log(JSON.parse(response.body));
        } catch (error) {
            console.log(error);
        }
    };

    pinDirectoryToPinata();
}
