// models/Feedback.js
import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  college: { type: String, required: true },
  class: { type: String, required: true },
  teacherFeedback: { type: String, required: true },
  equipmentFeedback: { type: String, required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
