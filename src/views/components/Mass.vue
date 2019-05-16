<template>
    <div style="width:900px;margin:50px auto;">
        <el-alert
                title="订阅号提供了每天一条的群发权限，为服务号提供每月（自然月）4条的群发权限。用户每月只能接收4条群发消息，多于4条的群发将对该用户发送失败。相同的内容只群发一次。"
                type="warning">
        </el-alert>
        <div style="margin-top: 20px">
            <el-input type="textarea" :rows="6" :show-word-limit="true" maxlength="300"
                      v-model="massContent"></el-input>
            <div style="margin-top: 20px">
                <el-button type="primary" :loading="loading" @click="send">确认发送</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {massSendToAll} from '../../api'

    export default {
        name: "Mass",
        data() {
            return {
                appId: null,
                loading: false,
                massContent: ''
            }
        },
        created() {
            this.appId = this.$route.params.id
        },
        methods: {
            send() {
                this.loading = true
                massSendToAll({appId: this.appId, content: this.massContent}).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '群发成功',
                        type: 'success'
                    });
                    this.loading = false
                }).catch(()=>{
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>