import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

//  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
//  updatedAt: Date;

 @Column({ name: 'name', type: 'varchar', length: 50 })
 name: string;

 @Column({ name: 'email', type: 'varchar', length: 255 })
 email: string;

 @Column({ name: 'password', type: 'varchar', length: 255 })
 password: string;
}

