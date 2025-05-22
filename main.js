const express = require('express');
const config = require('config');
const indexRoute = require("./routes")
const PORT = config.get("PORT")

const app = express()

app.use(express.json());
app.use("/api", indexRoute)

async function start(){
    try {
        app.listen(PORT, () => {
            console.log(`Server running at port http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()