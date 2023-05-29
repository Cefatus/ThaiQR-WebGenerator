function promptpayQR() {
    var f = document.getElementById('appForm'); // Get data from the form/
    var b = f.elements[0].value;
    var q = f.elements[1].value;
    var r = f.elements[2].value;
    var price = '1'; // Set price for quantity of 1.

    var qrdiv = document.getElementById("qrcode");
    qrdiv.innerHTML = "";
    console.log(typeof b, typeof q, typeof r);
    ref1l = b.length + 6;
    ref2l = q.length;
    //stuck with crc
    // crc32_generate(1021);
    // var crc = 


    /*
        From Bank Of Thailand on standards of QR Payment.
        00 02 01 
        01 02 11 
        - prompt pay 
            30 57 <-- length:57
            00 16 A000000677010112 <-- Type of payment
            01 15 000000000000000 <-- biller ID
            02 09 REF1 <-- referrence 1
            03 01 1 <-- (I don't know I forgot it.)
        53 03 764 <-- Finance Instutuib Code for SCB.
        54 01 2 <-- amount
        58 02 TH 
        - additional information
            62 10 
            07 06 REF2 <-- referrence 2
            63 04 4673 <-- CRC
    */


    var promptpaycode = `0016A000000677010112` +
        `0115` + `000000000000000` +
        `02${ref1l.toString().padStart(2, 0)}` + `RANXXX${b}` +
        `03${ref2l.toString().padStart(2, 0)}` + `${q}`
    console.log(promptpaycode.length)

    var qrcode = `000201010211` +
        `30${promptpaycode.length}${promptpaycode}` +
        `5303764` +
        `54${price.length.toString().padStart(2, 0)}${price}` +
        `5802TH` +
        `6210` + `0706REF2` +
        `6304` // Don't add CRC now.

    // setTimeout(() => {
        var crc16c = crc16(qrcode); // Calculate CRC.
        // var crc16c = crc16(promptpaycode,0x8408);
        console.log("crc16", crc16c, crc16c.toString(16))
        qrcode += crc16c.toString(16).toUpperCase(); // Add CRC
        qr = new QRCode(qrdiv, qrcode)
    // },1);
}