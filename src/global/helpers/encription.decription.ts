import { userDto } from "src/modules/users/dto/user.dto";
import * as fs from 'fs'
import * as crypto from 'crypto'


export function encription(plainData : userDto) {

    let privateKey :string , publicKey : string;

    const publickeyPath = './publicKey.pem'
    const privatekeyPath = './privateKey.pem'

    if(fs.existsSync(publickeyPath) && fs.existsSync(privatekeyPath)){

        publicKey = fs.readFileSync(publickeyPath,'utf-8')
        privateKey = fs.readFileSync(privatekeyPath,'utf-8')
        console.log(privateKey);
        console.log(publicKey);

    }else {
        console.log("object");
        const  keyPair  =  crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096, // bits - standard for RSA keys
            publicKeyEncoding: {
            type: 'pkcs1', // "public key cryptography standards 1"
            format: 'pem'  // most common formatting choice
            },
            privateKeyEncoding: {
            type: 'pkcs1', // "public key cryptography standards 1"
            format: 'pem'  // most common formatting choice
            }
            });
            console.log("2");

        fs.writeFileSync(publickeyPath,keyPair.publicKey)
        fs.writeFileSync(privatekeyPath,keyPair.privateKey)

        console.log("private Key : "+ " | " + keyPair.publicKey);
        console.log("public Key : "+ " | " + keyPair.privateKey);
    }




}
