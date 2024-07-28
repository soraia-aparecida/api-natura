import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";


@Entity("users")
class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    profile: string;

    @Column()
    is_guest: boolean;

    @Column("varchar", { nullable: true })
    email: string | null;

    @Column("varchar", { nullable: true })
    name: string | null;

    @Column("varchar", { nullable: true })
    password: string | null;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date | null;
}

export { User };
