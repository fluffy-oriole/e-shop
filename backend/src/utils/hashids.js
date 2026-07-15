import Hashids from 'hashids';

const MIN_LENGTH = 8;

const hashids = new Hashids(process.env.HASH_SALT, MIN_LENGTH);


export const encodeId = (id) => hashids.encode(id);

export const decodeId = (hash) => {
  const decoded = hashids.decode(hash);
  return decoded.length > 0 ? decoded[0] : null;
};