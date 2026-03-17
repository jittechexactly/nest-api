import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
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
        default: ProductCategoryEnum.OTHER
    })
    productCategory: string;

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
}