$(".input-group").on("click", "#search", function () {
    let keywords = $('.input-group input').val();
    if (keywords) {
        $.ajax({
            url: "/admin/pade.php?c=pade&m=search&s=" + keywords,
            success:function(data){
                $("#tbody").html("");
                data=JSON.parse(data);
                if(data){
                    data.forEach(v => {
                        $(` <tr data-id="<?php echo $v['id']?>">
                <td class="warning">
                    <input  data-type="id" type="text" value="<?php echo $v['id']?>" style="width: 30px">
                </td>
                <td class="warning">
                    <input data-type="cid" type="text" value="<?php echo $v['cid']?>" style="width: 30px">
                </td>
                <td class="warning" >
                    <input data-type="title" type="text" value="<?php echo $v['title']?>"style="width: 150px" class="form-control">
                </td>
                <td class="warning" >
                    <input data-type="dsc" type="text" value="<?php echo $v['dsc']?>"style="width: 150px" class="form-control">
                </td>
                <td class="warning" >
                    <input data-type="image" type="text" value="<?php echo $v['image']?>"style="width: 150px" class="form-control">
                </td>
                <td class="warning" >
                    <input data-type=url" type="text" value="<?php echo $v['url']?>"style="width: 150px" class="form-control">
                </td>
                <td class="warning" >
                    <input data-type=create_time" type="text" value="<?php echo $v['create_time']?>"style="width: 100px" class="form-control">
                </td>
                <td class="warning" >
                    <input data-type=content" type="text" value="<?php echo $v['content']?>"style="width: 100px">
                </td>
                <td class="warning"><button class="remove">删除</button></td>
            </tr>`).appendTo('#tbody');
                    })
                }else{
                    alert("没有更多")
                }
            }
        })
    }


})
