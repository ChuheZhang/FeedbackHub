// pages/api/auth/login.js
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { username, password } = req.body;

  try {
    await dbConnect();
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: '用户不存在' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: '密码错误' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error("Error in login API:", error);
    res.status(500).json({ message: '服务器错误' });
  }
}
