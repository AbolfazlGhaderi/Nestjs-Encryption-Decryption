import { Injectable } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import { encription } from 'src/global/helpers/encription.decription';

@Injectable()
export class UsersService {

    getAll(){
        return 'Get All'
    }

    createUser(data:userDto){
        return encription(data)
    }
}
