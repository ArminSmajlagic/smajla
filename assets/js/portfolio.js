function onLoadSite(){
    (function() {
        // https://dashboard.emailjs.com/admin/account
        emailjs.init({
        publicKey: "eMZ1c08bXNPd3gobl",
        });
    })();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://ipinfo.io/?format=jsonp&callback=getIP', true);
    xhr.onload = function (response) {
        var response = response.srcElement.response;
        
        var start = response.indexOf("getIP({")
        var end = response.indexOf("});", start)

        var data = response.substring(start+"getIP({".length, end).replace("\n  ", "").replace("\\", "");

        const templateParams1 = {
            email: "smajlagicarmin@gmail.com",
            to_name: "Armin",
            message: data,
        };


        emailjs.send('service_fe0b3j7', 'template_i7vts0h', templateParams1);            
    };
    xhr.send();
  
}

function sendEmail(event) {

    console.log("sendEmail called")
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const body = document.getElementById('comment').value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.hunter.io/v2/email-verifier?email='+email+'&api_key=b8334b8d5c833c86d7fbf8427ab53c6c8ae4f951', true);
    xhr.onload = function (response) {
        console.log(response);
        var jsonResponse = JSON.parse(xhr.responseText);
        if(jsonResponse.data.status != "invalid"){
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
                message: "Mail from " + templateParams.email + " with Name " + name + " was sent with body "+body + " .Email verification response:" + xhr.responseText,
            };
        
            emailjs.send('service_fe0b3j7', 'template_i7vts0h', templateParams1)
                .then((response) => {

                }, (error) => {
                    alert('Failed to send email. Please try again later.');
                });
        }else {
            alert('Failed to send email. Email is: ' + jsonResponse.data.status);
        }   
    };
    xhr.send();
}

onLoadSite();