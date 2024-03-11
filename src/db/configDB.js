import mongoose from "mongoose";    

const URI = "mongodb+srv://lucasrocchietti1:coderhouse@cluster0.wfh2e2r.mongodb.net/dbCoder?retryWrites=true&w=majority"
mongoose.connect(URI)
.then(() => {
    console.log("Conectado a la base de datos");
}).catch((error)=> {
 console.log(error);
}
)