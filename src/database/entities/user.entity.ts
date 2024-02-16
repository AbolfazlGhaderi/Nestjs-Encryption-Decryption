import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')

 class UserEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({nullable:false})
  name:string

  @Column({ unique: true, nullable: false , length:400})
  email: string;

  @CreateDateColumn()
  create_at:Date

}

export default UserEntity