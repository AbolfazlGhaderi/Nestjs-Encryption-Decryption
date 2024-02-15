import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
 class UserEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({nullable:false})
  name:string

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  phoneNumber:string

}

export default UserEntity