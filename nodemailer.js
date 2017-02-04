module.exports =
{
   transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'jsaivarahi@gmail.com', // Your email id
            pass: 'Sai2314108' // Your password
        }
    });
}
