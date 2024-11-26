const content = document.querySelector("#content");
const submit = document.querySelector("#submit"); //POST

submit.addEventListener("click", () => {
    let fname = document.querySelector("#fname").value;
    let lname = document.querySelector("#lname").value;
    let email = document.querySelector("#email").value;
    let gender = document.querySelector("#gender").value;


    let formData = { fname, lname, email, gender };
    fetch("http://localhost:5000/api/miyembro", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
    "Content-Type": "application/json",
    },
  }).catch((error) => console.log(error)); //====== add this ======
    alert("Successfully inserted!");
  location.reload(); //======================
});


window.addEventListener("load", () => {
    getUsers();
});



function getUsers() {
  let html = ""; //https://apicrudpm-nc9c.onrender.com/api/members
    fetch("http://localhost:5000/api/miyembro", { mode: "cors" })
    .then((response) => {
    return response.json();
    })
    .then((data) => {
      console.log(data); //display DOM
    data.forEach((element) => {
        html += `<li>${element.first_name} ${element.last_name}</li>`;
    });
    content.innerHTML = html;
    })
    .catch((error) => {
    console.log(error);
    });
}
