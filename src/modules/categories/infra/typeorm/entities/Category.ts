
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Product } from "../../../../products/infra/typeorm/entities/Product";


@Entity("categories")
class Category {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Product, product => product, {
        cascade: true,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    })
    @JoinColumn({ name: "id", referencedColumnName: "category_id" })
    products: Product[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date | null | null;
}

export { Category };
