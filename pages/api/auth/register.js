// pages/api/auth/register.js
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { username, password, role } = req.body;

  try {
    await dbConnect();
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: '用户名已存在' });

    const user = await User.create({ username, password, role });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error in registration API:", error);
    res.status(500).json({ message: '服务器错误' });
  }
}
