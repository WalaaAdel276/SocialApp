const express = require('express')
const dbConnection = require('./Configuration/config')
const UserRoutes = require("./modules/Users/Routes/UserRoutes")
const PostRoutes = require("./modules/Posts/Routes/PostRoutes")
const AdminRoutes = require("./modules/Admins/Routes/AdminRoutes")
const ReportedRoutes = require("./modules/ReportedPosts/Routes/ReportedPostsRoutes")
// const { createUserReport } = require('./Common/Services/createPdf')
// const User = require('./modules/Users/Model/UserModel')
require('dotenv').config()
const app = express()
app.use(express.json());
dbConnection();



app.use(UserRoutes)
app.use( PostRoutes, AdminRoutes, ReportedRoutes)

// app.get("/generateUserReport", async (req, res) => {
//     const invoice = {
//         shipping: {
//             name: "John Doe",
//             address: "1234 Main Street",
//             city: "San Francisco",
//             state: "CA",
//             country: "US",
//             postal_code: 94111
//         },
//         items: [
//             {
//                 item: "TC 100",
//                 description: "Toner Cartridge",
//                 quantity: 2,
//                 amount: 6000
//             },
//             {
//                 item: "USB_EXT",
//                 description: "USB Cable Extender",
//                 quantity: 1,
//                 amount: 2000
//             }
//         ],
//         subtotal: 8000,
//         paid: 0,
//         invoice_nr: 1234
//     };

//     createUserReport(invoice, "invoice.pdf", users);

// })

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))