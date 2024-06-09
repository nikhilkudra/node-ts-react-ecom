import { DataTypes, Model, Sequelize } from 'sequelize';
interface OrderTablesAttributes {
  id?: number;
  order_id: number;
  table_id: number; 
  quantity?: number;
}
class Order_Tables extends Model<OrderTablesAttributes> implements OrderTablesAttributes {
  public id!: number;
  public order_id!: number;
  public table_id!: number;
  public quantity!: number;

  static associate(models: any) {
  }
}
const initializeOrderTables = (sequelize: Sequelize) => {
  Order_Tables.init(
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
      table_id: {
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
      modelName: 'Order_Tables',
    }
  );

  return Order_Tables;
};

export default initializeOrderTables;
