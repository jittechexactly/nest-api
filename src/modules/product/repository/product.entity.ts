import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductCategoryEnum } from "../enum/product.enum";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column({
        type: "varchar",
        length: 255
    })
    productName: string;

    @Column({
        type: "enum",
        enum: ProductCategoryEnum,
        default: ProductCategoryEnum.OTHER
    })
    productCategory: ProductCategoryEnum;

    @Column({
        type: "bigint",
        default: 0
    })
    stock: number;

    @Column({
        type: "varchar",
        default: null,
        length: 255
    })
    productImage: string;

    @Column({
        type: "varchar",
        default: null,
        length: 255
    })
    productDescription: string;

    @CreateDateColumn({
        name: 'createdAt'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updatedAt'
    })
    updatedAt: Date;
}