<template>
    <el-container>
        <el-header class="container-header">
            <el-menu :default-active="$route.meta.path" router mode="horizontal" @select="handleSelect">
                <el-menu-item index="/" class="menu-link">
                    <span class="nav-app-name">{{$route.params.name}} </span>
                </el-menu-item>
                <el-menu-item index="menu">自定义菜单</el-menu-item>
                <el-menu-item index="auto-reply">自动回复</el-menu-item>
                <el-menu-item index="mass">群发</el-menu-item>
                <el-submenu index="user" class="right-menu">
                    <template slot="title">
                        <!--  <img class="user-avatar"
                               :src="user.avatar">-->
                        <span>微信管理员</span>
                    </template>
                    <el-menu-item index="action-user-profile" class="user-menu-item">
                        <i class="el-icon-setting"></i>
                        <span>返回公众号列表</span>
                        <span></span>
                    </el-menu-item>
                    <el-menu-item index="action-user-logout" class="user-menu-item">
                        <i class="el-icon-back"></i>
                        <span>退出登录</span>
                        <span></span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <el-container>
            <router-view></router-view>
        </el-container>
    </el-container>
</template>
<script>

    export default {
        name: "Customer",
        data() {
            return {}
        },
        created(){
        },
        methods: {
            handleSelect(key) {
                if ('action-user-logout' === key) {
                    window.localStorage.removeItem("wx_token");
                    this.$router.push({path: '/login'})
                } else {
                    this.$router.push({path: key})
                }
            }
        }
    }
</script>

<style scoped>

    .container-header {
        padding: 0;
    }

    .right-menu {
        float: right !important;
    }

    .nav-app-name {
        font-size: 18px;
        padding: 50px;
    }

    .user-avatar {
        display: inline-block;
        height: 2em;
        width: 2em;
        margin-right: 8px;
        border-radius: 50%;
    }

    .user-menu-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .menu-link {
        padding: 0;
    }

    .menu-link a {
        display: block;
        height: 100%;
        padding: 0 20px;
    }

    .menu-link img {
        height: 100%;
        vertical-align: top;
    }
</style>