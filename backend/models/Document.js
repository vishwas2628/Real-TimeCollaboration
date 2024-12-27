import { Schema, model } from 'mongoose';

const documentSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    comment: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

export default model('Document', documentSchema);