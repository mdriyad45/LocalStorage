let form = document.querySelector('form');
let main = document.querySelector('.main');
form.addEventListener('submit',(event)=>{
    let name = event.target.name.value;
    let email = event.target.email.value;
    let phone = event.target.phone.value;
    let message = event.target.message.value;
    let checkStatus = 0;

    
    let userdata = JSON.parse(localStorage.getItem('usersDetails')) ?? [];
    for(v of userdata){
        if(v.email == email || v.phone == phone){
            checkStatus = 1;
            break;
        }
    }
    if(checkStatus==1){
        alert("Email or Phone number already exist.")
    }
    else{
        userdata.push({
        'name': name,
        'email': email,
        'phone': phone,
        'message': message,
    });
        localStorage.setItem("usersDetails",JSON.stringify(userdata));
        console.log(userdata);
        event.target.reset();
    }
    
    displayData();
    event.preventDefault();
})

let displayData = () =>{
    let userdata = JSON.parse(localStorage.getItem('usersDetails')) ?? [];
    console.log(userdata)
    let finalData = '';
    userdata.forEach((element,index) => {
        finalData+=`<div class="items">
            <span onclick="removeData(${index})">&times;</span>
            <h3>Name</h3>
            <div>${element.name}</div>
            <h3>Email</h3>
            <div>${element.email}</div>
            <h3>Phone</h3>
            <div>${element.phone}</div>
            <h3>Message</h3>
            <div>${element.message}</div>
            </div>`
            main.innerHTML = finalData;
    });
}
let removeData = (index) =>{
    let userdata = JSON.parse(localStorage.getItem('usersDetails')) ?? [];
    userdata.splice(index,1);
    localStorage.setItem("usersDetails",JSON.stringify(userdata));
    displayData();
    console.log(userdata)
}
displayData();