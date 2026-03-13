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
        type: 'int',
        select: true,
        default: null
    })
    emailOtp: number | null;

    @Column({
        type: 'timestamp',
        select: true,
        default: null
    })
    emailverificationDuration: Date | null;

    @Column({
        type: 'varchar',
        length: 255,
        select: true
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

    @Column({
        name: 'last_login_at',
        type: 'timestamp',
        default: null
    })
    lastLoginAt: Date | null

    @CreateDateColumn({
        name: 'createdAt'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updatedAt'
    })
    updatedAt: Date;

}