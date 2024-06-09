
import { User } from '../models';
interface UserInterface {
  id: number;
  username: string;
  email: string;
  password: string;
}
type UserDetailsResult = UserInterface | any;
export const userDetails = async (email: string): Promise<UserDetailsResult>=> {
    try {
      const user = await User.findOne({ where: { email } });
      return user?.toJSON()
    } catch (error) {
            const err = error as Error;
      return { error: err.message };
    }
  }