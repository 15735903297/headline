$(function () {
    let add = $('#add');
    let tbody = $('tbody');
    tbody.on("click",".remove",function(){
        var id = $(this).closest("tr").attr("data-id");
        $.ajax({
            url:'/admin/pade.php?c=pade&m=delete&id='+id,
            success:function(data){
                if(data==1){
                    // alert('删除成功');
                    location.reload();
                }
                else{
                    alert("error")
                }
            }
        })
    });

    tbody.on("blur",".form-control",function(){
        var id = $(this).closest("tr").attr("data-id");
        var k=$(this).attr("data-type");
        var v=$(this).val();
        console.log(k);
        console.log(v);
        $.ajax({
            url:'/admin/pade.php?c=pade&m=update',
            data:{
                id:id,
                k:k,
                v:v
            }
        })
    });

    add.on('click', function () {
        $.ajax({
            url: '/admin/pade.php?c=pade&m=insert',
            success: function (data) {
                if (data == '1') {
                    // alert('添加成功')
                    location.reload();
                } else {
                    alert('网络出了点问题')
                }
            }
        });
    })
});
// function progressBar(percentage){
//     var p = Math.round(percentage * 100);
//     var deg = p * 3.6;
//     var right = document.getElementById("right"),
//         left = document.getElementById("left"),
//         desc = document.getElementById("desc");
//     if(p > 100 || p < 0) p = 100;
//     if(deg <= 180){
//         right.style.cssText = "transform:rotate("+(deg-180)+"deg);"
//         left.style.cssText = "background:#CCFFFF;"
//     }else{
//         right.style.cssText = "transform:none;"
//         left.style.cssText = "background:#003366;transform:rotate("+(deg-360)+"deg);"
//     }
//     if(desc.innerText){
//         desc.innerText = p+"%"
//     }
//     if(desc.textContent){
//         desc.textContent = p+"%";
//     }
// }
// var g = 0;
// setTimeout(function _a(){
//     if(g>1)return;
//     progressBar(g);
//     g += 0.1
//     setTimeout(_a,10)
// },100)