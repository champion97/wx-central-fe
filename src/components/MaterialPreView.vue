<template>
    <div>
        <el-dialog title="预览" :visible.sync="dialogVisible" width="50%" @closed="closed">
            <div v-if="mediaUrl">
                <el-image :src="mediaUrl | proxyImgFilter">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                </el-image>
            </div>
            <div v-if="mediaInfo">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="(item, index) in mediaInfo.articles" :key="item.thumbMediaId+index"
                                      :style="{backgroundImage:'url('+(proxyImg(item.thumbUrl))+')',backgroundRepeat: 'no-repeat'}">
                        <h3 class="medium">{{ item.title }}</h3>
                    </el-carousel-item>
                </el-carousel>

            </div>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getMaterialNewsInfo} from '../api'

    export default {
        name: "MaterialPreView",
        props: {
            // appId: String,
            // mediaId: String
        },
        filters: {
            proxyImgFilter: function (url) {
                if (!url) return ''
                return `${process.env.VUE_APP_WECHAT_IMG_PROXY_URL}${url}`
            }
        },
        data() {
            return {
                dialogVisible: false,
                mediaInfo: null,
                mediaUrl: null
            }
        },
        methods: {
            proxyImg(url){
                if (!url) return ''
                return `${process.env.VUE_APP_WECHAT_IMG_PROXY_URL}${url}`
            },
            show(appId, mediaId, mediaUrl) {
                this.dialogVisible = true
                if (mediaUrl) {
                    this.mediaUrl = mediaUrl;
                } else if (mediaId) {
                    //如果是图文素材，则需要获取详情
                    getMaterialNewsInfo(appId, mediaId).then((data) => {
                        console.log(data)
                        this.mediaInfo = data.data.data
                    })
                }
            },
            closed() {
                this.mediaUrl = null
                this.mediaInfo = null
            }
        }
    }
</script>

<style scoped>

</style>