import { User } from "src/modules/users/repository/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn()
    id: number;

    

}