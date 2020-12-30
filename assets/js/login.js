$(function () {
    $('#link-rigth').on('click', function () {
        $('.box-login').hide();
        $('.box-register').show();
    })
    $('#link-left').on('click', function () {
        $('.box-register').hide();
        $('.box-login').show();
    })
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            let pwd =  $('.box-register [name=passwrod]').val();
            if(pwd !== value){
                return '两次密码不一致！'
            }
        }
    })
    $('#from-tj').on('submit',function(e){
        e.preventDefault();
        let data = {
        username: $('.box-register [name=username]').val(),    
        password: $('.box-register [name=password]').val()
    }
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            data:data,
            success:function(res){
                if(res.status !== 0){   
                return layer.msg('注册失败');
                }
                return layer.msg('注册成功,请登录');
                $('#link-left').click();
            }
        })
        // let data = $('#box-register [name=username]').val();
        // $.post()
      /*   $.ajax({
            method:'POST',
            url:'http://ajax.frontend.itheima.net/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return alert("登录失败");
                }
                layer.msg('登陆成功！');
                localStorage.setItem('token',res.token);
                location.href = './index.html'
            }
        }) */
    })
    /* $('#from_dl').submit(function(e){
        e.preventDefault();
        $.ajax({
            
            url:'http://ajax.frontend.itheima.net/api/login',
            method:'POST',
            data:$(this).serialize(),   
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败，用户名或密码错误！');
                }
                layer.msg('登陆成功！');
                localStorage.setItem('token',res.token);
                location.href = '/index.html'
            }
        })
    }) */
    $('#from_dl').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
          url: '/api/login',
          method: 'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
          }
        })
    })
})