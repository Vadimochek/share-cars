const $ = app.jquery;


$(".type").on("click", function(e){
    e.preventDefault();
    let id=$(this).attr("id");
    let order_id=(Number)(id.slice(1));
    let data;
    let idString="#"+order_id
    let uId=$(idString).val();
    console.log(uId);
    if(id[0]=="e")
    {
        data = {
            orderId: order_id,
            status: "Завершён",
            userId: uId
        };
    }
    else
    {
        data = {
            orderId: order_id,
            status: "Отменён",
            userId: uId
        };
    }
    $.post("/updateOrder", data, function(result){
        if(result.success){
            document.location.href = '/admin/orders';
        }
        else{
        alert(result);
        }
    })
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