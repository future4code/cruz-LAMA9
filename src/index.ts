import { userRouter } from "./routes/userRouter";
import {app} from "./controller/app"

app.use("/user", userRouter);