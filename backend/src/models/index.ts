import sequelize from '../config/database';
import User from './user';
import Product from './product';
import initializeOrder from './order';
import initializeOrderTops from './order_tops';
import initializeOrderTables from './order_tables';
import initializeOrderChairs from './order_chairs';
const syncModels = async () => {
  await sequelize.sync({ force: false });
};
export { User, Product,syncModels,initializeOrder,initializeOrderTops ,initializeOrderTables,initializeOrderChairs};
