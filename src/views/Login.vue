<template>
    <div class="dialog" v-cloak>
        <div class="loginPage">
            <el-card style="padding: 10px 50px">
                <h1>微信公众号管理平台</h1>
                <el-form v-cloak :model="loginForm" ref="loginForm" status-icon :rules="rules">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginForm.password" autocomplete="off"
                                  @keyup.enter.native="submitForm"
                        ></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="submitForm">登录</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    import auth from '../auth'
    import cryptoRandomString from 'crypto-random-string'

    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        created() {
            const token = window.localStorage.getItem("wx_token");
            if (token && token !== "") {
                this.$router.push({
                    path: "/"
                });
            }
        },
        methods: {
            resetForm() {
                this.$refs['loginForm'].resetFields()
            },
            submitForm() {
                const username = this.loginForm.username
                const password = this.loginForm.password

                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        if (username !== auth.username || password !== auth.password) {
                            this.$notify.error({
                                title: '错误',
                                message: '用户名或密码错误'
                            });
                        } else {
                            window.localStorage.setItem("wx_token", cryptoRandomString({length: 32, type: 'url-safe'}));
                            const redirectTo = this.$router.currentRoute.query.redirect;
                            if (redirectTo) {
                                this.$router.push({
                                    path: redirectTo
                                });
                            } else {
                                this.$router.push({
                                    path: "/"
                                });
                            }
                        }
                    } else {
                        return false
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .dialog {
        height: 100vh;
        background-image: url("../assets/images/login_bg.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        position: relative;
    }

    .loginPage {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -80%);
        width: 500px;
        height: 320px;
        text-align: center;
    }

    h1 {
        font-weight: lighter;
    }
</style>