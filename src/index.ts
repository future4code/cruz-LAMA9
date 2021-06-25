import { userRouter } from "./routes/userRouter";
import {app} from "./controller/app"
import { bandRouter } from "./routes/bandRouter";

app.use("/user", userRouter);
app.use("/band", bandRouter);