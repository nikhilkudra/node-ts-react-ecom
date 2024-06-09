import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { userDetails } from "../utils/userDetails";
import { loginSchema, userSchema } from "../utils/validators";
interface UserInterface {
  id: number;
  username: string;
  email: string;
  password: string;
}
type UserDetailsResult = UserInterface | any;

export const signup = async (req: Request, res: Response) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { username, email, password } = req.body;
    let userData: UserDetailsResult | { error: string } | null =
      await userDetails(email);
    if (userData)
      return res
        .status(404)
        .json({ Message: "Email already exists, Please Login" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: UserDetailsResult | any = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const userWithoutPassword = newUser.toJSON();
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword); 
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};
export const login = async (req: Request, res: Response) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email, password } = req.body;
  try {
    const user: UserDetailsResult | any = await userDetails(email);
    if (!user) return res.status(404).json({ error: "User not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid password" });
    delete user.password;
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1h" }
    );
    res.json({ token,user });
    
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user: UserDetailsResult | any = await userDetails(email);
    if (!user) return res.status(404).json({ error: "Invalid Email address" });
    const resetToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1h" }
    );
    res.json({ resetToken });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
