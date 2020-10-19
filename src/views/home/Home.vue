<template>
    <div class="home">
        <div class="side">
            <p class="title">教学工作统计</p>
            <el-menu
                    :default-active="active"
                    class="el-menu"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#222222"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <template v-for="(item,i) in menus">

                    <el-submenu v-if="item.children && item.children.length!=0" :index="item.name">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item
                                v-for="(m,idx) in item.children"
                                :index="m.name"
                                @click="handleGo(m)"
                        >{{ m.title }}</el-menu-item>
                    </el-submenu>

                    <el-menu-item
                            v-else
                            :index="item.name"
                            @click="handleGo(item)"
                    >
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>

                </template>

            </el-menu>
        </div>
        <div class="main">
            <div class="header">
                <div class="menu-left" v-on:click="startMove">
                    <el-avatar icon="el-icon-s-unfold" class=""></el-avatar>
                </div>
                <div class="menu-right" v-on:click="startMove">
                    <el-avatar icon="el-icon-s-fold" class=""></el-avatar>
                </div>


                <div class="menu-conter" >
                    <div class="menu-gr" >
                        <div class="menu-gr-icon" >
                            <el-avatar icon="el-icon-user" class="topnav-icon"></el-avatar>
                            <span class="wz">xxxx</span>
                        </div>

                    </div>

                </div>
                <div class="sign-out">

                    <el-avatar icon="el-icon-switch-button" class="sign-out-icon"></el-avatar>

                        <a @click="handleTc" href="./../login/Login.vue">退出系统</a>
                </div>

            </div>
            <div class="container">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    // import Login from "../login/Login";

    export default {
        name: "Home",
        data() {
          return {
              active: ''
          }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleGo(item) {
                this.$router.push({name: item.name})
            },
            startMove() {
                // var dom = document.getElementsByClassName("side")[0];
                // var omain = document.getElementsByClassName('main')[0];



                var dom = document.getElementsByClassName("side")[0];
                var omain = document.getElementsByClassName('main')[0];
                var omainb = document.getElementsByClassName('menu-left')[0];
                var omaina = document.getElementsByClassName('menu-right')[0];
                var oside = document.getElementsByClassName("side")[0];
                var osideTitle = oside.getElementsByClassName('title')[0]
                clearInterval(this.timer);
                this.flag = false
                this.target = dom.clientWidth > 45 ? 45 : 220;
                this.flag = dom.clientWidth > 30 ? true : false;
                // this.changeText(this.flag)
                this.ispeed = null;
                this.timer = null;
                this.timer = setInterval(() => {
                    this.ispeed = (this.target - dom.clientWidth) / 7;
                    this.ispeed =
                        this.ispeed > 0 ? Math.ceil(this.ispeed) : Math.floor(this.ispeed);
                    if (dom.clientWidth == this.target) {

                            clearInterval(this.timer);
                        // omain.style.display = "none";
                    } else {
                        dom.style.width = dom.clientWidth + this.ispeed + 'px';
                        omain.style.left = omain.offsetLeft + this.ispeed +'px';

                            if(dom.style.width == "220px"){
                                console.log('111');
                                omainb.style.display = "none";
                                omaina.style.display = "block";
                                osideTitle.style.visibility = "visible"
                                // omainb.style. = "20px";
                            }else {
                                omainb.style.display = "block";
                                omaina.style.display = "none";
                                oside.style.whiteSpace = "nowrap"
                                osideTitle.style.visibility = "hidden"
                                
                            }

                    }
                });
            },
            // changeText(flag) {
            //     var oside = document.getElementsByClassName("side")[0];
            //     var osideTitle = oside.getElementsByClassName('title')[0]
            //     if(flag){
            //         oside.style.whiteSpace = "nowrap"
            //         osideTitle.style.visibility = "hidden"
            //
            //     }else{
            //         osideTitle.style.visibility = "visible"
            //     }
            // },
            handleTc(item) {
                alert(`您是否要退出？`)
                // if(1){
                //     this.$router.push({name:Login})
                // }else {
                //     this.$router.push({name: item.name})
                // }
            }
        },
        computed: {
            menus() {
                return this.$store.state.permission
            }
        },
        mounted() {
            this.active = this.$route.name
        }
    }
</script>

<style scoped>
    .home {
        display: flex;
    }
    .side {
        position: absolute;
        left: 0;
        top: 0;
        width: 220px;
        bottom: 0;
        background: #222222;
        overflow: auto;
    }
    .side .title {
        line-height: 50px;
        text-align: center;
        color: rgba(255,255,255,0.8);
    }
    .el-menu {
        width: 100%;
    }
    .main .container {
        position: absolute;
        left: 0;
        top: 50px;
        right: 0;
        bottom: 0;
        padding: 15px;
        box-sizing: border-box;
        background: #f2f2f2;
        overflow: auto;
    }

    .main .header .menu-left{
            float: left;
        margin-top: 5px;
        margin-left: -175px;
        display: none;
    }
    .main .header .menu-right{
        float: left;
        margin-top: 5px;
        margin-left: -40px;

    }
    .main {
        flex: 1;
        position: absolute;
        left: 220px;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .main .header {
        position: fixed;
        left: 220px;
        top: 0;
        right: 0;
        height: 50px;
        background: white;
        box-sizing: border-box;
    }

/* 退出*/
    .sign-out{
        float: right;
        margin-top: -31px;
        margin-right: 60px;
        width: 120px;
        height: 40px;
    }
    .sign-out-icon{
        height: 40px;
        width: 30px;
    }
    .sign-out>span{
        font-size: 15px;
        line-height: 40px;
        height: 40px;
        margin-left: 5px;
        margin-bottom: -12px;
    }
    .sign-out>a{
        margin-left: 5px;
        color: #999999;
    }
    .sign-out>a:hover{
        color: powderblue;
    }


    /*!*    个人中心*!*/
.menu-conter .menu-gr .menu-gr-icon{
    /*border: 1px solid #000;*/
    width: 130px;
    margin-top: 5px;
    margin-left: 850px;
}
    .menu-conter .menu-gr .menu-gr-icon .topnav-icon{
        height: 40px;
        width: 35px;
    }
    .menu-conter .menu-gr .menu-gr-icon>span{
        margin-bottom: -10px;
        font-size: 16px;
        color: #333;
    }


</style>