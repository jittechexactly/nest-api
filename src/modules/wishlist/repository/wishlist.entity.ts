import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Wishlist{
    @PrimaryGeneratedColumn()
    id: number;

    
}