const nodemailer = require('nodemailer')

const { EMAIL, PASSWORD } = process.env

module.exports = {
    email: async (req, res) => {
      const { name, message, email, title} = req.body
      console.log(email)
  
      try {
        //invoke the createTransport function passing in your email information. 
        let transporter = nodemailer.createTransport({
          service: 'yahoo',
          auth: {
            user: EMAIL,
            pass: PASSWORD
          }
        });
  
        //invoke the sendMail function with the info in the email
        let info = await transporter.sendMail({
          from: `'${name}' <${email}>`, //This will show up when you go into the email
          to: EMAIL,
          subject: title, //This will show on the subject of the email
          text: message, //for clients with plaintext support only
        }, (err, res) => {
          if (err) {
            console.log('err', err)
          } else {
            console.log('res', res)
            res.status(200).send(info)
          }
        })
      } catch (err) {
        console.log(err)
        res.sendStatus(500)
      }
    }
  }
  