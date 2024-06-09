import { DataTypes, Model, Sequelize } from "sequelize";
interface OrderAttributes {
  id?: number;
  amount: number;
  user_id: number;
  name: string;
  phone: string;
  address: string;
  pincode: string;
}
class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public amount!: number;
  public user_id!: number;
  public name!: string;
  public phone!: string;
  public pincode!: string;
  public address!: string;
  static associate(models: any) {
    Order.belongsTo(models.User, { foreignKey: "user_id" });
    Order.hasMany(models.Order_Chairs, { foreignKey: "order_id" });
    Order.hasMany(models.Order_Tables, { foreignKey: "order_id" });
    Order.hasMany(models.Order_Tops, { foreignKey: "order_id" });
  }
}
const initializeOrder = (sequelize: Sequelize) => {
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};

export default initializeOrder;
