
document.querySelector('.submitbutton').onclick = function(){
    var password = document.querySelector('.password').value,
        confirmpassword = document.querySelector('.confirmpassword').value;

    if(password == ""){
        alert("Field cannot be empty.")
    }
    else if(password != confirmpassword){
        alert("Password didn't match try again.");
        return false;
    }
}