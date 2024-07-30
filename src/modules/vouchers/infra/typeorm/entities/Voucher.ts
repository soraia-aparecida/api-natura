
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity("vouchers")
class Voucher {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    is_valid: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date | null;
}

export { Voucher };