import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "~/server/api/routers/auth/auth.router";
import { reviewerRouter } from "./routers/reviewer/reviewer.router";
import { eventRouter } from "./routers/event/event.router";
import { quizRouter } from "./routers/quiz/quiz.router";
import { questionaireRouter } from "./routers/questionaire/questionaire.router";
import { answerRouter } from "./routers/answer/answer.router";
import { userRouter } from "./routers/user/user.router";
import { Server } from "socket.io"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  reviewer: reviewerRouter,
  event: eventRouter,
  quiz: quizRouter,
  questionaire: questionaireRouter,
  answer: answerRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

const server = require('http').createServer(appRouter);
// export type definition of API

server.listen(5000, () => console.info(`server listening on port - ${5000}`)) 

const io = new Server(server, { // we will use this later
    cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
    }
})

console.log(io)

io.on('connection', (socket) => {
  console.log('connected socket-------------------------------------------')

  socket.on('hello', () => {
    console.log('hello world')
    socket.emit('hello_back')
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
})
