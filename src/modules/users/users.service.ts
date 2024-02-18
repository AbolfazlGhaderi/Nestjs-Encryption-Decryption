import { Injectable } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import asymmetricenCryption from 'src/global/helpers/encryption.decryption';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import symmetricCryption from 'src/global/helpers/symmetic.encryption.decryption';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  getAll() {
    return 'Get All';
  }

  async createUser(data: userDto) {
    const cryption = new asymmetricenCryption();

    const encrypted = cryption.encryption(data.email);

    data.email = `fsx_020111:${encrypted}`;

    const user = await this.userRepository.save(data);

    return user;
  }

  getUser() {
    const data =
      'fsx_020111:F3kfeMIybn0qqTkwvpCLkTMQawSLq0/2my+U0F1Jm8mJ2ykxUUqYRLPpEkqu5i8588lW9i13CPXBMh8nyyuE2ILHB4/QjFp5KIV6/Hzb3X4oikHk8rpixUWxpYISWnu3TtbJX3+mZtPLnQ5FmwxZ9RsufUEos/Sbe5ChAdFmP272zgThcS4kB7bD3chDuE//LjVcderYTiZHq3VywyJf0Z4VJSA01ko/pf0GUycipatd9GVf9OCvhXNh8xroUFWWVMez7HI+Ge/Mdsa2oj4ZN3wDiAsMHiaHbRNxhmFC3sQOou9TuWbWFCbNbwTCA9JDRCp+EDvWz+G6nM6Mbu8jTg==';

    const cryption = new asymmetricenCryption();

    return cryption.decryption(data);
  }

  // ---------------------- Symmetric --------------------------------

  createUserSymmetric(data: userDto) {

    const crypto = new symmetricCryption();
    
    return crypto.encryption(data.email);

  }
}
