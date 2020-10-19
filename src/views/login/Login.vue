<template>
    <div class="page-login">
        <div class="login-header">
            <p>教师登入系统</p>
        </div>
        <div class="login-panel">
        <div class="banner">
            <img src="./../img/2.jpg" width="480" height="370" alt="教学工作统计">
        </div>
        <div class="form">
<!--            <h4 v-if="error" class="tips"> {{error}} </h4>-->
            <p>
                <span>账号登入</span>
            </p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="90px" class="ruleForm">
<!--                <el-form-item label="用户名" prop="userName" class="tips">-->
                    <el-input class="profile" v-model="ruleForm.userName" prop="userName"  placeholder="请输入用户名"  prefix-icon="profile"></el-input>
<!--                </el-form-item>-->
<!--                <el-form-item label="密     码" prop="pwd">-->
                    <el-input class="password" type="password" v-model="ruleForm.pwd" autocomplete="off" prop="pwd" placeholder="密码" prefix-icon="password"></el-input>
<!--                </el-form-item>-->

                <p class="zhuce">
                   <a href="#">忘记密码?</a>
                </p>
                    <el-button class="btn-login" type="primary" @click="submitForm('ruleForm')">登录</el-button>


            </el-form>

        </div>
        </div>
        <footer>
            <p>Copyright © 2017  教师系统  技术支持电话：0532-8608*****</p>
        </footer>

    </div>

</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    userName: '',
                    pwd: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let user = {userName: 'admin',pwd:123}
                        this.$store.commit('setCurrentUser',user)
                        this.$store.dispatcher('setLoginUser',user)
                        // 跳转路由
                        this.$router.push('/home')
                        // 发送请求，进行登录
                        // this.$axios.get("/api/user.json").then((res) => {
                        //     var dt = res.data
                        //     var user = dt.data.find((u) => {
                        //         return u.userName==this.ruleForm.userName && u.pwd==this.ruleForm.pwd
                        //     })
                        //     if (user) {
                        //         this.$message({
                        //             message: '登录成功。',
                        //             type: 'success'
                        //         })
                        //         // 保存用户信息到vuex中
                        //         this.$store.commit('setCurrentUser',user)
                        //         // this.$store.dispatcher('setLoginUser',user)
                        //         // 跳转路由
                        //         this.$router.push('/home')
                        //     }else {
                        //         this.$message({
                        //             message: '用户名或密码错误！',
                        //             type: 'warning'
                        //         })
                        //     }
                        // }).catch((error) => {
                        //
                        // })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-panel {
        margin: 0 auto 70px;
        width: 980px;
        display: flex;
    }
    .login-header {
        position: relative;
        width: 840px;
        height: auto;
        margin: 40px auto 30px;
    }
    .login-header>p{
        font-size: 23px;
        color: ;
        font-family: cursive;
        margin-bottom: 40px;
    }
    .logo >img{
        background: no-repeat;
        background-position: 0 !important;
        background-size: contain !important;
        width: 60px;
        height: 54px;
        display: block;
    }
    .banner {
        margin-right: 115px;
        margin: 0 70px;
        width: 480px;
        display: flex;
    }
    /*.tips {*/
    /*    display: flex;*/
    /*    flex-direction: column;*/
    /*    width: 270px;*/
    /*    margin-bottom: 10px;*/
    /*    padding: 10px;*/
    /*    border: 1px solid #f5d8a7;*/
    /*    border-radius: 2px;*/
    /*    background: #fff6db;*/
    /*    font-size: 12px;*/
    /*    padding-left: 26px;*/
    /*}*/
    /*.tips:after {*/
    /*     position: absolute;*/
    /*     display: inline-block;*/
    /*     width: 17px;*/
    /*     height: 17px;*/
    /*     font-family: iconfont;*/
    /*     font-style: normal;*/
    /*     content: "\e64d";*/
    /*     font-size: 28px;*/
    /*     top: -9px;*/
    /*     left: -24px;*/
    /* }*/
    .form {
        display: flex;
        flex-direction: column;
        width: 270px;
        margin-top: 50px;
    }
    .btn-login {
          margin-top: 10px;
          color: #fff;
          background-color:#FFD000;
          border: none;
          padding: 12px 15px;
      }
    .profile{
        margin-top: 40px;
    }
    .profile :after {
         font-family: iconfont;
         content: "";
         font-style: normal;
         top: -1px;
         left: 5px;
         position: absolute;
     }

    .password{
        margin-top: 30px;
    }
    .password :after {
         font-family: iconfont;
         background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
         font-style: normal;
         top: -1px;
         left: 3px;
         position: absolute;
         font-size: 18px;
     }
    .btn-login {
        margin-top: 30px;
        color: #fff;
        background-color:#FFD000;
        border: none;
        padding: 12px 15px;
        width: 270px;
    }
    footer {
        width: 980px;
        margin-left: 500px;
        text-align: left;
    }
    footer>p {
     margin-top: 120px;
    font-size: 13px;
    color: #999;
    }
    .zhuce{
        margin-top: 10px;
    }
    .zhuce>a{
        color: orangered;
        float: right;
        font-size: 15px;
    }


</style>