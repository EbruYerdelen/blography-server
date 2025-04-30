require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/db")

const PORT = process.env.PORT || 3001;
connectToDB();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `)
}) 