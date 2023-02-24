import bcrypt from "bcrypt";

export interface IHashing {
  compare: (text: string, hash: string) => Promise<boolean>;
  hash: (text: string) => string;
}

export default class Hash implements IHashing {
  async compare(text: string, hash: string) {
    const isSame = await bcrypt.compare(text, hash);
    return isSame;
  }
  hash(text: string) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS) || 10);
    const hash = bcrypt.hashSync(text, salt);
    return hash;
  }
}
