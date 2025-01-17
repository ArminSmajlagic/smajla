function onLoadSite(){
    (function() {
        // https://dashboard.emailjs.com/admin/account
        emailjs.init({
          publicKey: "dazFYuv8-rjNpZFhU",
        });
    })();
    
    document.getElementById("contact").onsubmit = function() {
        sendEmail();
    };
    
    console.log("Site loaded")
}

function sendEmail(event) {

    console.log("sendEmail called")
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const body = document.getElementById('comment').value;

    const templateParams = {
        email: email,
        to_name: name,
        message: "I am glad you contacted me. You will soon get response from me so we can talk and I can send you my full CV and portfolio. \nThis is automated response.",
    };

    emailjs.send('service_fe0b3j7', 'template_i7vts0h', templateParams)
        .then((response) => {
            alert('Email sent successfully!');
        }, (error) => {
            alert('Failed to send email. Please try again later.');
        });

    //to me
    
    const templateParams1 = {
        email: "smajlagicarmin@gmail.com",
        to_name: "From APP TO Armin",
        message: "Mail from " + templateParams.email + " with Name " + name + " was sent with body "+body,
    };

    emailjs.send('service_fe0b3j7', 'template_i7vts0h', templateParams1)
        .then((response) => {
            alert('Email sent successfully!');
        }, (error) => {
            alert('Failed to send email. Please try again later.');
        });
}

onLoadSite();

