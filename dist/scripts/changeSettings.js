const $ = app.jquery;

$("#changer").on("click", function(e){
    e.preventDefault();
    console.log($("#number").val());
    if ($("#number").val()==="" || $("#category").val()==="" || $("#date").val()===""){
        alert("Введите данные водительского удостоверения");
    }
    else
    {
    let data = {
        email: $("#email").val(),
        password: $("#password").val(),
        username: $("#username").val(),
        phone: $("#phone").val(),
        number: $("#number").val(),
        category: $("#category").val(),
        date: $("#date").val()
    };
    $.post("/changeSettings", data, function(result){
        if (result.success){
            document.location.href = '/profile';
        }
        else{
        alert(result);
        }
    })
    }  
})
document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );
        
        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };
    
    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
    
});