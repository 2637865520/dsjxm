$(function(){
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        zpwd:function(value){
            if(value === $('[name=oldPwd]').val()){
                return '新旧密码不能相同';
            }
        },
        spwd:function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致';
            }
        }
    })
   $('.layui-form').on('submit',function(e){
       e.preventDefault();
       $.ajax({
           method:'POST',
           url:'/my/updatepwd',
           data:$(this).serialize(),
           success:function(res){
               if(res.status !== 0){
                    return layer.msg('修改密码失败');
               }
               layer.msg('更新密码成功');
               //把layui-form转换成dom元素，并且调用reset方法清空表单
               $('.layui-form')[0].reset();
           }
       })
   })
})