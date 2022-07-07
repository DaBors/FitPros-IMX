export function getFileCountInFolder(path: string) {
    const fs = require('fs');
    var length = fs.readdirSync(path).length;

    return length;
}

enum KyzanClanz {
  ClanlessMerchant,
  Assassin
}


interface KyzanClanzMetadata {
  name: string
  description: string
  image: string
  class: KyzanClanz
}

export function create_metadata_for_token(tokenId: number, tokenType: KyzanClanz) {

}



export function getKyzanClanz(kyzanClanz: KyzanClanz, tokenId: number) {

}