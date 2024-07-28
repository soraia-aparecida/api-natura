
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import { CartProduct } from "../../../../cartsProducts/infra/typeorm/entities/CartProduct";
import { User } from "@modules/users/infra/typeorm/entities/User";

@Entity("carts")
class Cart {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    paid: boolean;

    @Column()
    user_id: number;

    @Column({ type: 'datetime', nullable: true })
    pay_day: Date | null;

    @ManyToOne(() => User, user => user)
    @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user: User;

    @OneToMany(() => CartProduct, cartProduct => cartProduct.cart, {
        cascade: true,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    })
    items: CartProduct[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date | null;

    @Column({ nullable: true })
    voucher_id: number;
}

export { Cart };