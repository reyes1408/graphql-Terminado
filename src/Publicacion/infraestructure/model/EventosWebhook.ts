import { Table , Column , DataType ,Model } from "sequelize-typescript";

@Table({
    tableName:"EventoWebhook",
    timestamps: false
})

class EventoWebhookModel extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true
    })
    public id! : number;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    public url! : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      public events!: string;
    
}

export default EventoWebhookModel;