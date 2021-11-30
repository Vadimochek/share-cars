const $ = app.jquery;

$("#signup").on("click", function(e){
    e.preventDefault();
    let data = {
        email: $("#login").val(),
        password: $("#password").val(),
        username: $("#username").val(),
        phone: $("#phone").val()
    };
    $.post("/signup", data, function(result){
        if(result.success){
            document.location.href = '/sign';
        }
        else{
        alert(result);
        }
    })
})