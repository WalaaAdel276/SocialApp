const fs = require("fs");
const PDFDocument = require("pdfkit");

function createUserReport(invoice, path, users) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice, users);
    generateFooter(doc);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
    doc
        .image("logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("Node JS", 50, 80)
        .fontSize(10)
        .text("Node JS", 200, 50, { align: "right" })
        .text("123 Main Street", 200, 65, { align: "right" })
        .text("New York, NY, 10025", 200, 80, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("user Report", 50, 120);

    generateHr(doc, 150);

}

function generateInvoiceTable(doc, invoice, users) {
    let i;
    const invoiceTableTop = 180;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Name",
        "Email",
        "Role",
        "CreatedAt",
        "Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < users.length; i++) {
        const item = users[i];
        const position = invoiceTableTop + (i + 1) * 30;
        const date = new Date(item.createdAt).toLocaleDateString();

        generateTableRow(
            doc,
            position,
            item.userName,
            item.email,
            item.role,
            date

        );

        generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Subtotal",
        "",
        users.length
     
    );

    doc.font("Helvetica");
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Payment is due within 15 days. Thank you for your business.",
            50,
            780,
            { align: "center", width: 500 }
        );
}

function generateTableRow(
    doc,
    y,
    Name,
    Email,
    Role,
    CreatedAt,

) {
    doc
        .fontSize(10)
        .text(Name, 50, y)
        .text(Email, 150, y)
        .text(Role, 280, y, { width: 90, align: "right" })
        .text(CreatedAt, 370, y, { width: 90, align: "right" })

}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency(cents) {
    return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}

module.exports = {
    createUserReport
};