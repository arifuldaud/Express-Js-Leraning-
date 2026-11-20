import app from "./app.js";
import config from "./config/index.js";
import { initDB } from "./db/data.js";


const main = async () =>{

initDB();
    app.listen(config.port, () => {
    console.log(`The Express Server is running ${config.port}`);
});
}
main();