const chatHistory = document.querySelector(".message-content");
const userInput = document.querySelector("#message");
const sendButton = document.querySelector(".btn");
const changeClass = document.querySelector(".chatbot-response")

function extractFileName(chatbotResponse) {
    chatbotResponse = chatbotResponse.slice(12) + ".docx"
    return chatbotResponse
}

function numberOfMembers(fileKaNaam, json_data) {
    let members = 0;
    members = json_data[fileKaNaam];
    return members
}

let first_query = 0;
sendButton.addEventListener("click", () => {
    const message = userInput.value;
    userInput.value = "";  // Clear the input field


    try {
        const aadhar_btn = document.querySelector('.info-btn')
        const aadhar_number = document.querySelector('#aadhar')
        aadhar_number.id = "something"
        aadhar_btn.className = "something"
    } catch (error) {
        console.log("error aagya")
    }


    try {
        const aadhar_btn = document.querySelector('.info-btn')
        const aadhar_number1 = document.querySelector('#aadhar1')
        const aadhar_number2 = document.querySelector('#aadhar2')
        aadhar_btn.className = "something"
        aadhar_number1.id = "something"
        aadhar_number2.id = "something"
    } catch (error) {
        console.log("error aagya")
    }


    // Send the message to the server using fetch or Axios library
    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }),
    })
        .then(response => response.json())
        .then(data => {
            // Update the chat history with user message and chatbot response
            let response_on_web = data.response
            chatHistory.innerHTML += `<div class = "user-container"> <div class="user-response">${message}</div><p class="user-logo"> : You</p></div>`;
            chatHistory.innerHTML += `<div class="chatbot-container"><p class="chatbot-logo" >Chatbot : </p><div class = "chatbot-response"><p> ${response_on_web}</p></div></div>`;
            let myList = [];
            function fetchData() {
                myList = []; // Clear the list before fetching
                fetch('/sendList')
                    .then(response => response.json())
                    .then(data => {
                        myList = data;
                        console.log(myList);

                        fetch('./static/json files/document_info.json')
                            .then((response) => response.json())
                            .then((json) => {
                                console.log(typeof json)

                                let nameOfFile = extractFileName(response_on_web);
                                let numOfMembers = numberOfMembers(nameOfFile, json);

                                if (numOfMembers == 1) {
                                    let add_link = document.querySelector(".chatbot-response")
                                    add_link.className = "NewClass2"
                                    try {

                                        add_link = document.querySelector(".chatbot-response")
                                        console.log("try")
                                        add_link.innerHTML += `<link rel="stylesheet" type="text/css" href="static\\style\\style2.css"><div>
                                            <p>Enter the Aadhar Number : </p>
                                            <div><input type="text" name="" id="aadhar"><button type="button" class="info-btn">send</button></div>
                                            </div>`;

                                    } catch (error) {
                                        add_link = document.querySelector(".NewClass2")
                                        console.log("catch")
                                        add_link.innerHTML += `<link rel="stylesheet" type="text/css" href="static\\style\\style2.css"><div>
                                            <p>Enter the Aadhar Number : </p>
                                            <div><input type="text" name="" id="aadhar"><button type="button" class="info-btn">send</button></div>
                                            </div>`;
                                    }
                                    add_link.className = "NewClass2"
                                    const element = document.querySelector(".NewClass2")
                                    if (element.classList.contains('chatbot-response')) {
                                        element.classList.remove('chatbot-response');
                                        element.classList.add('NewClass2');
                                    } else if (element.classList.contains('NewClass2')) {
                                        element.classList.remove('NewClass2');
                                        element.classList.add('chatbot-response');
                                    }

                                    const aadhar_btn = document.querySelector('.info-btn')
                                    const aadhar_number = document.querySelector('#aadhar')

                                    aadhar_btn.addEventListener('click', () => {
                                        const number = aadhar_number.value
                                        fetch("/search", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ number: number }),
                                        })

                                        aadhar_btn.className = 'newclass'
                                        aadhar_number.id = 'newid'
                                        add_link.className = 'NewClass2'
                                        

                                        add_link.innerHTML += `<link rel="stylesheet" type="text/css" href="static\\style\\style2.css"><div><a href="/static/open_pdf.html?pdfname=${nameOfFile}" target='_blank'>link</a></div>`

                                    });

                                    // if (first_query == 0) {
                                    //     const elemen = document.querySelector(".NewClass2")
                                    //     if (elemen.classList.contains('chatbot-response')) {
                                    //         elemen.classList.remove('chatbot-response');
                                    //         elemen.classList.add('NewClass2');
                                    //         first_query = 1  
                                    //     } else if (elemen.classList.contains('NewClass2')) {
                                    //         elemen.classList.remove('NewClass2');
                                    //         elemen.classList.add('chatbot-response');
                                    //         first_query = 1
                                    //     }
                                    // }    
                                    // else if (first_query == 1) {
                                    //     add_link.className = 'NewClass2'
                                    //     // first_query = 0
                                    // }
                                    // first_query = 1 
                                    add_link.className = 'NewClass2'
                                }

                                else if (numOfMembers == 2) {
                                    let add_link = document.querySelector(".chatbot-response")
                                    add_link.className = "NewClass"

                                    try {
                                        add_link = document.querySelector(".chatbot-response")
                                        add_link.innerHTML += `<link rel="stylesheet" type="text/css" href="static\\style\\style2.css">
                                            <div>
                                                <div>
                                                    <p>Enter aadhar number1</p>
                                                    <div><input type="text" name="" id="aadhar1"></div>
                                                </div>
                                                <div>
                                                    <p>Enter aadhar number1</p>
                                                    <div><input type="text" name="" id="aadhar2"></div>
                                                </div>
                                            </div>
                                            <div><button type="button" class="info-btn">send</button></div>`
                                    } catch (error) {
                                        add_link = document.querySelector(".NewClass")
                                        add_link.innerHTML += `<link rel="stylesheet" type="text/css" href="static\\style\\style2.css">
                                            <div>
                                                <div>
                                                    <p>Enter aadhar number1</p>
                                                    <div><input type="text" name="" id="aadhar1"></div>
                                                </div>
                                                <div>
                                                    <p>Enter aadhar number1</p>
                                                    <div><input type="text" name="" id="aadhar2"></div>
                                                </div>
                                            </div>
                                            <div><button type="button" class="info-btn">send</button></div>`
                                    }

                                    add_link.className = "NewClass"
                                    const element = document.querySelector(".NewClass")
                                    if (element.classList.contains('chatbot-response')) {
                                        element.classList.remove('chatbot-response');
                                        element.classList.add('NewClass');
                                    } else if (element.classList.contains('NewClass')) {
                                        element.classList.remove('NewClass');
                                        element.classList.add('chatbot-response');
                                    }

                                    const aadhar_btn = document.querySelector('.info-btn')
                                    const aadhar_number1 = document.querySelector('#aadhar1')
                                    const aadhar_number2 = document.querySelector('#aadhar2')

                                    aadhar_btn.addEventListener('click', () => {
                                        const number1 = aadhar_number1.value
                                        const number2 = aadhar_number2.value
                                        number1And2 = { var1: number1, var2: number2 };
                                        fetch("/petition", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ number1And2 }),
                                        })

                                        aadhar_btn.className = 'newclass'
                                        aadhar_number1.id = 'newid1_'
                                        aadhar_number2.id = 'newid2_'
                                        add_link.className = 'NewClass'

                                        add_link.innerHTML += `<link rel="stylesheet" type="text/css" href="static\\style\\style2.css"><div><a href="/static/open_pdf.html?pdfname=${nameOfFile}" target='_blank'>link</a></div>`
                                    })

                                    // if (first_query == 0) {
                                    //     const elemen = document.querySelector(".NewClass")
                                    //     if (elemen.classList.contains('chatbot-response')) {
                                    //         elemen.classList.remove('chatbot-response');
                                    //         elemen.classList.add('NewClass');
                                    //         first_query = 1
                                    //     } else if (elemen.classList.contains('NewClass')) {
                                    //         elemen.classList.remove('NewClass');
                                    //         elemen.classList.add('chatbot-response');
                                    //         first_query = 1
                                    //     }
                                    // }
                                    // else if (first_query == 1) {
                                    //     add_link.className = 'NewClass'
                                    // }
                                    // first_query = 1
                                    add_link.className = 'NewClass'

                                }
                            })
                    })

                chatHistory.scrollTop = chatHistory.scrollHeight;  // Auto-scroll to bottom
            }
            fetchData()
        })

        .catch(error => console.error(error));
});