$(function(){
    let layer = layui.layer; 
    let form = layui.form;




    list();



    function list(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                // if(res.status !== 0){
                //     return layer.msg('获取文章列表失败');
                // }
                let htmlStr = template('tpl-table',res);
                $('tbody').html(htmlStr);
    
            }
        })
    }


    
    let indexAdd = null;
    $('#addclass').on('click',function(){
       indexAdd = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
    $('body').on('submit', '#form-add', function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('添加分类失败');
                }
                list();
                layer.msg('添加分类成功');
                layer.close(indexAdd);
            }
        })
    })
    let indexEdd = null;
    $('tbody').on('click','.btn-edit',function(){
        indexEdd = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        let id = $(this).attr('data-Id');
        $.ajax({
            method:'GET',
            url:'/my/article/cates/' + id,
            success:function(res){
           form.val('form-edit',res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('修改失败！');
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdd)
                list();
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function() {
        let id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
        $.ajax({
            method:'GET',
            url: '/my/article/deletecate/' + id,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('删除失败');
                }
                layer.msg('删除成功！');
                layer.close(index);
                list();
            }
        })
    })
})


})
