
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import { Cart } from "../../../../carts/infra/typeorm/entities/Cart";
import { Product } from "../../../../products/infra/typeorm/entities/Product";


@Entity("carts_products")
class CartProduct {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    cart_id: number;

    @Column()
    product_id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Cart, cart => cart.items)
    @JoinColumn({ name: "cart_id", referencedColumnName: "id" })
    cart: Cart;

    @ManyToOne(() => Product, product => product)
    @JoinColumn({ name: "product_id", referencedColumnName: "id" })
    product: Product;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date | null;
}

export { CartProduct };