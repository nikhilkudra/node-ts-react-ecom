import { DataTypes, Model, Sequelize } from "sequelize";
interface OrderTopsAttributes {
  id?: number;
  order_id: number;
  top_id: number;
  quantity?: number;
}
class Order_Tops
  extends Model<OrderTopsAttributes>
  implements OrderTopsAttributes
{
  public id!: number;
  public order_id!: number;
  public top_id!: number;
  public quantity!: number;

  static associate(models: any) {}
}
const initializeOrderTops = (sequelize: Sequelize) => {
  Order_Tops.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      top_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order_Tops",
    }
  );

  return Order_Tops;
};

export default initializeOrderTops;
