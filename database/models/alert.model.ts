import { Schema, model, models, type Document, type Model } from 'mongoose';

export interface IAlert extends Document {
    userId: string;
    symbol: string;
    alertType: 'Price' | 'Stock P/E';
    targetPrice: number;
    condition: 'ABOVE' | 'BELOW';
    active: boolean;
    triggered: boolean;
    expiresAt: Date;
    createdAt: Date;
}

const AlertSchema = new Schema<IAlert>(
    {
        userId: { type: String, required: true, index: true },
        symbol: { type: String, required: true, uppercase: true, trim: true },
        alertType: { type: String, enum: ['Price', 'Stock P/E'], default: 'Price', required: true },
        targetPrice: { type: Number, required: true },
        condition: { type: String, enum: ['ABOVE', 'BELOW'], required: true },
        active: { type: Boolean, default: true },
        triggered: { type: Boolean, default: false },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

delete models.Alert;
export const Alert: Model<IAlert> = model<IAlert>('Alert', AlertSchema);