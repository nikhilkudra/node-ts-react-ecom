import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public category!: string;
  public imageUrl!: string;
}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);

export default Product;
