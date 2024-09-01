import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
const port = 3000;


app.use(cors());

app.use(express.json());


let count = 0;

app.post('/increment', (req: Request, res: Response) => {
    count += 1;
    res.json({ count: count });
});

app.post('/decrement', (req: Request, res: Response) => {
    if (count === 0) {
        res.status(400).send('Count cannot be less than 0');
        return;
    }
    count -= 1;
    res.send('Count: ' + count);
});

app.get('/count', (req: Request, res: Response) => {
    res.send('Count: ' + count);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
