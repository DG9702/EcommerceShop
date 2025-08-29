import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//import swaggerUi from "swagger-ui-express";
import { errorMiddleware } from "@packages/error-handler/error-middleware";
import router from "./routes/product.router";

//const swaggerDocument = require("./swagger-output.json");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({ message: "Hello Product API" });
});

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.get("/docs-json", (req, res) => {
//  res.json(swaggerDocument);
//});

//Routes
app.use("/api", router);

app.use(errorMiddleware);

const port = process.env.PORT || 6002;

const server = app.listen(port, () => {
  console.log(`Product Service is running at http://localhost:${port}/api`);
  console.log(`swagger docs available at http://localhost:${port}/docs`);
});

server.on("error", (err) => {
  console.log("Server error: ", err);
});
