import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 150
    })
    name: string;

    @Index()
    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        select: false
    })
    password: string;

    @Column({
        name: 'is_email_verified',
        type: 'boolean',
        default: false
    })
    isEmailVerified: boolean;

    @Column({
        name: 'is_active',
        type: 'boolean',
        default: true
    })
    isActive: boolean;

    @CreateDateColumn({
        name: 'createdAt'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updatedAt'
    })
    updatedAt: Date;

}