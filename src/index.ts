import express, { Express, Request, Response } from 'express';
const app: Express = express();
import router from './router/RouteAPI';

const port = 5000;
app.get('/', async (req: Request, res: Response) => {
    res.send('<h2>welcom api Image Processing</h2>');
});

app.use(router);

app.listen(port, async (): Promise<void> => {
    console.log(`http://localhost:${port}`);
});

export default app;
