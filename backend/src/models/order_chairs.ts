import { DataTypes, Model, Sequelize } from 'sequelize';

interface OrderChairsAttributes {
  id?: number;
  order_id: number;
  chair_id: number;
  quantity?: number;
}

class Order_Chairs extends Model<OrderChairsAttributes> implements OrderChairsAttributes {
  public id!: number;
  public order_id!: number;
  public chair_id!: number;
  public quantity!: number;

  static associate(models: any) {
  }
}

const initializeOrderChairs = (sequelize: Sequelize) => {
  Order_Chairs.init(
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
      chair_id: {
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
      modelName: 'Order_Chairs',
    }
  );

  return Order_Chairs;
};

export default initializeOrderChairs;
