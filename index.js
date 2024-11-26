// console.log(fetch('https://e-cdns-images.dzcdn.net/images/cover/4e8ebae30709cff2ad91f5c29ad7a068/500x500-000000-80-0-0.jpg')
// .then(response => {
//     console.log(response)
//     return response.blob();
// })
// .then(blob =>{
//     console.log(blob)
//     document.querySelector('#myImage').src=URL.createObjectURL(blob)
// })
// .catch(error =>{
//     console.log(error)
// })
// )

//const content = document.querySelector("#content")
const submit = document.querySelector('#submit')    
const update = document.querySelector('#updateBtn')

submit.addEventListener('click', ()=>{  

    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value;

    let formData = {fname, lname, email, gender}
    fetch('http://localhost:5000/api/miyembro', {
    //fetch('https://bscs3a-api-crud-1-semi.onrender.com/api/miyembro', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers:{
            'Content-Type' : 'application/json'
        },

    }).catch((error) => console.log(error));
    alert("Succesfully inserted!");
    location.reload();


})


//id selector
const content=document.querySelector("#content")

//loading page
window.addEventListener("load", () =>{
    getUsers()
})

function getUsers(){
    let html=""
    
    
    //fetch("https://bscs3a-api-crud-1-semi.onrender.com/api/miyembro" , {mode: "cors"})//online
    fetch("http://localhost:5000/api/miyembro" , {mode: "cors"}) //offline
    .then((response) =>{
        //console.log(response)
        return response.json()
    })
    .then((data)=>{     
        console.log(data)
        data.forEach((element) =>{
            html += `<li>${element.first_name} ${element.last_name} <a href = "javascript:void(0)"onClick = "deleteMember(${element.id})" > DELETE </a>  
            
            <a href = "javascript:void(0)"onClick = "editMember(${element.id})" > EDIT </a>  

            </li>`
        })

        content.innerHTML = html
    })
    .catch((error) =>{
        console.log(error)
    })

}


function deleteMember(id){
    //alert(id)
    let formData = {id}

let text;
    if (confirm("Press a button!") == true) {
        text = "You pressed OK!";
        fetch("http://localhost:5000/api/miyembro", {
            method: 'DELETE',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type' : 'application/json'
            }
            })
    
            .then(response => response.text())
            .then(response => console.log(response))
            .catch(error => console.log(error))



        } else {
            text = "You canceled!";
        }



}



function editMember(id){//search
    fetch(`http://localhost:5000/api/miyembro/${id}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#fname').value = data[0].first_name
        document.querySelector('#lname').value = data[0].last_name
        document.querySelector('#email').value = data[0].email
        document.querySelector('#gender').value = data[0].gender

        document.querySelector('#ID').value = data[0].id
    })    
}


update.addEventListener('click', () => {

    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value;
    let id = document.querySelector('#ID').value 
        let formData = {fname, lname, email, gender, id}
        fetch(`http://localhost:5000/api/miyembro/`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type' : 'application/json'
            }

        })
        .catch(error => console.log(error))
        alert("Succesfully Updated!")
        location.reload()
})




