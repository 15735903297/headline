$(function(){
    $('#pagination-demo').twbsPagination({
        totalPages: 4,
        visiblePages: 8,
        onPageClick: function (event, page) {
            $.ajax({
                url:"/admin/admin.php?c=admin&m=news&page="+page,
            })

        }
    });
});