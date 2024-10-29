// pages/api/feedback/index.js
import dbConnect from '../../../lib/dbConnect';
import Feedback from '../../../models/Feedback';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: '未授权，请提供令牌' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const { college, class: className, teacherFeedback, equipmentFeedback } = req.body;

      const feedback = await Feedback.create({
        date: new Date(),
        college,
        class: className,
        teacherFeedback,
        equipmentFeedback,
        submittedBy: userId,
      });
      res.status(201).json({ message: '反馈提交成功', feedback });
    } catch (error) {
      console.error("Error in feedback submission API:", error);
      res.status(500).json({ message: '服务器错误' });
    }
  } else if (req.method === 'GET') {
    try {
      const feedbacks = await Feedback.find().populate('submittedBy', 'username');
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Error in feedback retrieval API:", error);
      res.status(500).json({ message: '服务器错误' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
