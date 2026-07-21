import express, { Application, NextFunction, Request, Response } from "express";
import { ApiResponseHelper } from "./utils/api-response";
import { HttpException } from "./exceptions/http-exception";
import cors from "cors";
import userRoutes from "./routes/user_route";
import path from "path";
import adminUserRoutes from "./routes/admin/user_routes";
import adminNoteRoutes from "./routes/admin/note_routes";
import noteRoutes from "./routes/note_route";
import subjectRoutes from "./routes/subject_route";
import notificationRoutes from "./routes/notification_route";

const app: Application = express();
let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json()); // use json as request
app.use(express.urlencoded({ extended: true })); //use form-urlencoded as request
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/admin/users", adminUserRoutes);

app.use("/api/admin/notes", adminNoteRoutes);

app.use("/api/users", userRoutes);

app.use("/api/note", noteRoutes);

app.use("/api/subjects", subjectRoutes);

app.use("/api/notifications", notificationRoutes);

app.use((req: Request, res: Response) => {
  return res.status(404).json({ message: "Route Not Found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    return ApiResponseHelper.error(res, err.message, err.status);
  }
  return ApiResponseHelper.error(res, "Internal Server Error", 500);
});

export default app;
