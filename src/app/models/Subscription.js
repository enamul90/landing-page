import mongoose from 'mongoose';

const userSubscription = new mongoose.Schema({
    lastDate: { type: String, required: true },
    template: { type: [
            { type: String },
        ],
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.subscription || mongoose.model('subscription', userSubscription);