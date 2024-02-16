import { userDto } from 'src/modules/users/dto/user.dto';
import * as fs from 'fs';
import * as crypto from 'crypto';


class ghaderCryption {
  private privateKey: string;
  private publicKey: string;

  checkKey() {
    const publickeyPath = './publicKey.pem';
    const privatekeyPath = './privateKey.pem';

    if (fs.existsSync(publickeyPath) && fs.existsSync(privatekeyPath)) {

      this.publicKey = fs.readFileSync(publickeyPath, 'utf-8');
      this.privateKey = fs.readFileSync(privatekeyPath, 'utf-8');

      return { publicKey: this.publicKey, privateKey: this.privateKey };
      
    } else {
        const keyPair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048, // bits - standard for RSA keys
            publicKeyEncoding: {
              type: 'pkcs1', // "public key cryptography standards 1"
              format: 'pem', // most common formatting choice
            },
            privateKeyEncoding: {
              type: 'pkcs8', // "public key cryptography standards 1"
              format: 'pem', // most common formatting choice
            },
          });

      fs.writeFileSync(publickeyPath, keyPair.publicKey);
      fs.writeFileSync(privatekeyPath, keyPair.privateKey);

      return { publicKey: this.publicKey, privateKey: this.privateKey };
    }
  }

   encryptDataWithPublicKey(data: Buffer, publicKey: string): Buffer {

    const bufferLength = 245; 

    let encryptedData: Buffer[] = [];
  
    for (let i = 0; i < data.length; i += bufferLength) {

      const buffer = data.slice(i, i + bufferLength);

      const encryptedBuffer = crypto.publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer,
      );
      
      encryptedData.push(encryptedBuffer);
    }
  
    return Buffer.concat(encryptedData);
  }

   decryptDataWithPrivateKey(data: Buffer, privateKey: string): Buffer {

    const bufferLength = 256; 
    let decryptedData: Buffer[] = [];
  
    for (let i = 0; i < data.length; i += bufferLength) {
     
      const buffer = data.slice(i, i + bufferLength);
      
      const decryptedBuffer = crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer,
      );
      decryptedData.push(decryptedBuffer);
    }
  
    return Buffer.concat(decryptedData);
  }
  

   encryption(plainData: userDto) {
    const keys = this.checkKey();

    const plaintext = 'hello my friend !';

    // const encrypted = crypto.publicEncrypt(
    //   { key: keys.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    //   Buffer.from(plaintext),
    // );

    const encrypted = this.encryptDataWithPublicKey(Buffer.from(plaintext),keys.publicKey)

    return encrypted.toString('base64')
    
  }



   decryption(encrypted : string) {

    const keys = this.checkKey();
    
    // const decrypted = crypto.privateDecrypt(
    //   { key: keys.privateKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    //   Buffer.from(encrypted,'base64'),
    // );

    const decrypted = this.decryptDataWithPrivateKey(Buffer.from(encrypted,'base64'),keys.privateKey)
    
    
    console.log(decrypted.toString());
  }
}

export default ghaderCryption;
