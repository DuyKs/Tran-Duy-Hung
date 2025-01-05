import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// CRUD Endpoints for Tokens

// Create a token
app.post('/tokens', async (req: Request, res: Response) => {
    const { currency, price } = req.body;
    try {
        const token = await prisma.token.create({ 
            data: { 
                currency, 
                price: parseFloat(price) // Ensure price is stored as a float
            } 
        });
        res.json(token);
    } catch (error) {
        res.status(400).json({ error: 'Token creation failed' });
    }
});

// Read all tokens
app.get('/tokens', async (_req: Request, res: Response) => {
    try {
        const tokens = await prisma.token.findMany();
        res.json(tokens);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch tokens' });
    }
});

// Read a token by ID
app.get('/tokens/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const token = await prisma.token.findUnique({ where: { id: Number(id) } });
        if (token) res.json(token);
        else res.status(404).json({ error: 'Token not found' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

// Update a token
app.put('/tokens/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { currency, price } = req.body;
    try {
        const token = await prisma.token.update({
            where: { id: Number(id) },
            data: { 
                currency, 
                price: parseFloat(price) // Ensure price is updated as a float
            },
        });
        res.json(token);
    } catch (error) {
        res.status(400).json({ error: 'Update failed' });
    }
});

// Delete a token
app.delete('/tokens/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.token.delete({ where: { id: Number(id) } });
        res.json({ message: 'Token deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Delete failed' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
