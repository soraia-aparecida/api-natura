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
import { Category } from "../../../../categories/infra/typeorm/entities/Category";


@Entity("products")
class Product {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    short_description: string;

    @Column()
    long_description: string;

    @Column("json")
    composition: any;

    @Column()
    value: number;

    @Column()
    in_stock: boolean;

    @Column()
    url_image: string;

    @Column()
    category_id: number;

    @ManyToOne(() => Category, category => category)
    @JoinColumn({ name: "category_id", referencedColumnName: "id" })
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date | null | null;

    @Column({ nullable: true })
    rating: number;

    @Column({ nullable: true })
    discount: boolean;

    @Column({ nullable: true })
    discount_percentage: number;
}

export { Product };

