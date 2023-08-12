
// import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { PrismaClient, Task } from '@prisma/client'

const express = require('express')
const app = express();
const port = 3000;
const prisma = new PrismaClient()

app.use(express.json());

const getTasks = () => {
	return prisma.task.findMany();
}
app.get('/', (req, res) => {
	res.send('hello world')
})

app.get('/api/todo', async (req, res) => {
	res.json(await getTasks())
})

app.post('/api/todo', async (req, res) => {
	console.log('body', req.body, req.headers)
	const addedTask = await prisma.task.create({
		data: req.body as Task
	});
	res.status(201).json(addedTask)

})
app.listen(port, () => {
	console.log('server running on port', port)
})


