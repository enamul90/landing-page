import mongoose from 'mongoose';

const CompanyInfoSchema = new mongoose.Schema({
    logo: { type: String, required: true },
    pageName: { type: String, required: true, unique: true },
    copyRight: { type: String, required: true },
    description: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    socialLink: {
        type: [
            {
                platform: { type: String, required: true },
                url: { type: String, required: true }
            }
        ],
        required: true
    },

}, { timestamps: true });

export default mongoose.models.Company_info || mongoose.model('Company_info', CompanyInfoSchema);