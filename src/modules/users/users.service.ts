import { Injectable } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import ghaderCryption from 'src/global/helpers/encryption.decryption';


@Injectable()
export class UsersService {

    getAll(){
        return 'Get All'
    }

    
    async createUser(data:userDto){
        console.log("1");
        const cryption = new ghaderCryption();
        console.log("2");
        const encrypted =  cryption.encryption(data)
        console.log(encrypted);

        const decrypt = cryption.decryption(encrypted)

        // console.log(decrypt);

        
    }
}
