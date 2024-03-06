import { Column, Table ,Model, DataType } from "sequelize-typescript";

@Table({
    tableName:"publicacion",
    timestamps:false
})
class PublicacionModel extends Model{
    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    })
    public id!: number;

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    public descripcion!:string

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    public createDate!:string

    @Column({
        type:DataType.INTEGER,
        allowNull: false
    })
    public likes!:string

    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    public userId!:string
}

export default PublicacionModel;