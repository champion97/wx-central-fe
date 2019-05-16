<template>
    <div id="home">
        <div class="app-nav">
            <div class="title">微信公众号管理平台</div>
        </div>
        <div>
            <el-input class="app-search-input" v-model="searchKeyWord" clearable size="small"
                      prefix-icon="el-icon-search">
            </el-input>
        </div>
        <el-button id="add-app" round type="text" @click="dialogFormVisible=true">添加公众号</el-button>

        <div class="app-list">
            <el-card class="box-card" shadow="never">
                <el-table
                        :data="wxAccounts"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="appName"
                            label="公众号名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="appId"
                            label="APPID"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="appSecret"
                            label="SECRET">
                    </el-table-column>
                    <el-table-column
                            prop="aesKey"
                            label="AESKEY">
                    </el-table-column>
                    <el-table-column
                            prop="token"
                            label="TOKEN">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row.appId, scope.row.appName)" type="text"
                                       size="small">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>

        <el-dialog title="添加公众号" :visible.sync="dialogFormVisible" width="40%">
            <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="100px">
                <el-form-item label="公众号名称" prop="appName">
                    <el-input v-model="addForm.appName"></el-input>
                </el-form-item>
                <el-form-item label="appId" prop="appId">
                    <el-input v-model="addForm.appId"></el-input>
                </el-form-item>
                <el-form-item label="appSecret" prop="appSecret">
                    <el-input v-model="addForm.appSecret"></el-input>
                </el-form-item>
                <el-form-item label="aesKey" prop="aesKey">
                    <el-input v-model="addForm.aesKey" placeholder="消息加解密密钥"></el-input>
                </el-form-item>
                <el-form-item label="token" prop="token">
                    <el-input v-model="addForm.token"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveWxAccount">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>


<script>
    import {getWxAccountAll, searchByAppName, addWxAccount} from '../api/index'

    export default {
        data() {
            return {
                searchKeyWord: '',
                wxAccounts: [],
                dialogFormVisible: false,
                addForm: {
                    appName: '',
                    appId: '',
                    appSecret: '',
                    aesKey: '',
                    token: ''
                },
                addFormRules: {
                    appName: [
                        {required: true, message: '请输入公众号名称', trigger: 'blur'}
                    ],
                    appId: [
                        {required: true, message: '请输入appId', trigger: 'blur'}
                    ],
                    appSecret: [
                        {required: true, message: '请输入appSecret', trigger: 'blur'}
                    ],
                    token: [
                        {required: true, message: '请输入token', trigger: 'blur'}
                    ],
                    aesKey: [
                        {max: 50, message: '超过50 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        watch: {
            searchKeyWord: function () {
                this.searchWxAccountByAppName()
            }
        },
        created() {
            this.getWxAccountAllData()
        },
        methods: {
            getWxAccountAllData() {
                getWxAccountAll().then((resp) => {
                    this.wxAccounts = resp.data.data
                })
            },
            searchWxAccountByAppName() {
                if (this.searchKeyWord) {
                    searchByAppName(encodeURI(this.searchKeyWord)).then((resp) => {
                        this.wxAccounts = resp.data.data
                    })
                } else {
                    this.getWxAccountAllData()
                }
            },
            handleClick(appId, appName) {
                this.$router.push(`/app/${appId}/${appName}`)
            },
            saveWxAccount() {
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        addWxAccount(this.addForm).then((resp) => {
                            this.$message.success("添加公众号成功")
                            this.getWxAccountAllData()
                            this.dialogFormVisible = false

                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<!--全局样式-->
<style>
    .app-search-input input {
        border-radius: 30px
    }

    #home {
        text-align: center;
        color: #2c3e50;
    }
</style>

<!--组件样式-->
<style scoped>
    .app-nav {
        margin: 30px 0px;
        padding-bottom: 30px;
        font-weight: lighter;
        border-bottom: 1px solid #dcdfe6;
    }

    .title {
        font-size: 25px;
    }

    .app-search-input {
        margin: 0 auto 10px;
        width: 250px;
    }

    .app-list {
        margin: 0 auto;
        width: 80%;
    }

    #add-app {
        text-align: center;
        margin: 0 auto 10px;
    }

</style>
