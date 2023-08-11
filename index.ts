
import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { PrismaClient, Task } from '@prisma/client'



const prisma = new PrismaClient()

const getTasks = () => {
	return prisma.task.findMany();
}

const init = async () => {
	const server: Server = new Server({
		port: 3000,
		host: 'localhost',
	});
	server.route({
		method: 'GET',
		path: '/',
		handler: async (request: Request, h: ResponseToolkit) => {
			return 'Helo'
		}
	});

	server.route({
		method: "GET",
		path: '/api/todo',
		handler: async (request: Request, h: ResponseToolkit) => {
			const tasks = await getTasks()
			// await prisma.$disconnect()
			return tasks;
		}
	})
	server.route({
		method: "POST",
		path: '/api/todo',
		handler: async (request: Request, h: ResponseToolkit) => {
			console.log(typeof request.payload)
			const tasks = await getTasks()
			// await prisma.$disconnect()
			await prisma.task.create({
				data: request.payload as Task
			})
			return tasks;
		}
	})
	await server.start();
	console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});
init();
//
//
// async function main() {
// 	// await prisma.task.create({
// 	// 	data: {
// 	// 		title: 'first task',
// 	// 		content: "the first task details"
// 	// 	}
// 	// })
// 	const data = await prisma.task.findMany();
// 	console.log(data)
// }
//
// main()
// 	.then(async () => {
// 		await prisma.$disconnect()
// 	})
// 	.catch(async (e) => {
// 		console.error(e)
// 		await prisma.$disconnect()
// 		process.exit(1)
// 	})
