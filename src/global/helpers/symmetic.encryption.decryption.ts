import * as fs from 'fs';
import * as crypto from 'crypto';

class symmetricCryption {
 

  #checkKey() {
    const keyPath = './key.txt';

    if (fs.existsSync(keyPath)) {

      const keys = fs.readFileSync(keyPath, 'utf-8');

      return JSON.parse(keys);

    } else {

      const key = crypto.randomBytes(32);
      const iv = crypto.randomBytes(16);

      const keys = {
        key: key.toString('base64'),
        iv: iv.toString('base64'),
      };

      fs.writeFileSync(keyPath, JSON.stringify(keys));

      return keys;

    }
  }

  decrypted (email:string){
    // get key and iv
    const keys = this.#checkKey();
    
    // convert to Buffer
    const keyBuffer = Buffer.from(keys.key, 'base64');

    const ivBuffer = Buffer.from(keys.iv, 'base64');

    // decrypt
    const decipher = crypto.createDecipheriv('aes-256-cbc',keyBuffer,ivBuffer)
    
    let decrypted = decipher.update(email,'base64','utf-8')
    decrypted += decipher.final('utf8')

    // return decrypted
    return decrypted
  }

  encryption(email: string) {
    // get key and iv
    const keys = this.#checkKey();
    
    // convert to Buffer
    const keyBuffer = Buffer.from(keys.key, 'base64');

    const ivBuffer = Buffer.from(keys.iv, 'base64');

    // encrypt
    const cipher=crypto.createCipheriv('aes-256-cbc',keyBuffer,ivBuffer)

    let encrypted = cipher.update(email,"utf-8",'base64')
    encrypted += cipher.final('base64');

    //---------------------- decrypted ----------------------------

    const decrypted = this.decrypted(encrypted);

    // return 
    return {
        encrypted:encrypted,
        decrypted:decrypted
    }
  }
}

export default symmetricCryption;
