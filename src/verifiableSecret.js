const secrets = require("./secret.js");
const sodium = require("sodium-universal");
const Buffer = require("buffer/").Buffer;
const MAC_LENGTH = 32;

export function share(secret, numOfShare, threshold) {
  const shardHex = secrets.share(secret2Hex(secret), numOfShare, threshold);
  return shardHex.map(compress);
}

export function combine(shards) {
  const hex = secrets.combine(shards.map(decompress));
  return hex2Secret(hex);
}

export function verify(shards) {
  const hex = secrets.combine(shards.map(decompress));
  const secret = secrets.hex2str(hex.slice(MAC_LENGTH));
  if (Mac(secret) !== mac(hex)) return false;
  else return true;
}

function Mac(secret) {
  var hash = Buffer.alloc(sodium.crypto_hash_sha256_BYTES);
  sodium.crypto_hash_sha256(hash, Buffer.from(secret));
  return hash.toString("hex").slice(-1 * MAC_LENGTH);
}

function hex2Secret(hex) {
  const mac = hex.slice(0, MAC_LENGTH);
  const secret = secrets.hex2str(hex.slice(MAC_LENGTH));

  if (Mac(secret) !== mac)
    throw new Error("This secret appears to be corrupt - invalid MAC");
  else return secret;
}

function mac(hex) {
  return hex.slice(0, MAC_LENGTH);
}

function secret2Hex(string) {
  return Mac(string) + secrets.str2hex(string);
}

function compress(shard) {
  const shardData = shard.slice(3);
  const shardDataBase64 = Buffer.from(shardData, "hex").toString("base64");
  return shard.slice(0, 3) + shardDataBase64;
}

function decompress(shard) {
  const shardData = shard.slice(3);
  const shardDataHex = Buffer.from(shardData, "base64").toString("hex");
  return shard.slice(0, 3) + shardDataHex;
}
