import { create_metadata_for_token, getFileCountInFolder } from './ipfs/utils';
import { pinFromFS } from './ipfs/pinata_upload_folder';
import env from './config/client';
import { parse } from 'ts-command-line-args';

interface BulkMintScriptArgs {
    wallet: string;
    number: number;
}

const BULK_MINT_MAX = env.bulkMintMax;
const { wallet, number } = parse<BulkMintScriptArgs>({
    wallet: {
        type: String,
        alias: 'w',
        description: 'Wallet to receive minted NFTs',
    },
    number: {
        type: Number,
        alias: 'n',
        description: `Number of NFTS to mint. Maximum: ${BULK_MINT_MAX}`,
    },
});
if (number >= Number(BULK_MINT_MAX))
    throw new Error(`tried to mint too many tokens. Maximum ${BULK_MINT_MAX}`);

const metaDataFolder = './src/ipfs/fitpros_metadata'    
const tokenCount = getFileCountInFolder(metaDataFolder)
for (let i = tokenCount; i < tokenCount + number; i++) {
    var tokenId = tokenCount;
    // create metadata for token, based on kyzan class type
    // store metadata in folder, appending based on tokenId
}

// upload folder to pinata

// replace metadata api url on imx

// mint tokens, similarly as in bulk-mint passing ipfs hash as blueprint for each token seperately 