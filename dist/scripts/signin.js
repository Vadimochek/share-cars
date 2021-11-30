const $ = app.jquery;

$("#signgo").on("click", function(e){
    e.preventDefault();
    let data = {
        email: $("#login").val(),
        password: $("#password").val()
    };
    $.post("/signin", data, function(result){
        if(result.success){
            document.location.href = '/autos';
        }
        else{
        alert(result);
        }
    })
})
