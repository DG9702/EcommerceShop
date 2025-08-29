
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Product Service Api",
    description: "Automatically generated Swagger docs.",
    version: "1.0.0"
  },
  host: "localhost:6002",
  schemes: ["http"]
}

const outputFile = "./swagger-output.json"
const endPointsFiles = ["./routes/product.router.ts"]

swaggerAutogen(outputFile, endPointsFiles, doc);
