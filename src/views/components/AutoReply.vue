<template>
    <div style="width:900px;margin:0 auto;">
        <material-pre-view ref="materialPreView"></material-pre-view>
        <!-- 关键字回复 -->
        <el-card class="box-card" :style="{margin:'50px 0'}">
            <div slot="header" class="clearfix">
                <i class="el-icon-aim">&nbsp;</i><span>关键字回复</span>
                <el-button style="float: right; padding: 3px 0" @click="addKeyWordReply" type="text">添加回复</el-button>
            </div>
            <div v-if="adding">
                <el-form ref="form" :model="keyWordReplyForm" label-width="80px">
                    <el-form-item label="关键字">
                        <el-input v-model="keyWordReplyForm.keyWord"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="keyWordReplyForm.replyType">
                            <el-option v-for="type in replyType" :key="type.value" :label="type.label"
                                       :value="type.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容" v-if="keyWordReplyForm.replyType===0">
                        <el-input type="textarea" :rows="6" :show-word-limit="true" maxlength="300"
                                  v-model="keyWordReplyForm.text"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" v-else>
                        <div>
                            <el-button type="text" v-if="keyWordReplyForm.mediaId"
                                       @click="preview(keyWordReplyForm.mediaId,keyWordReplyForm.mediaUrl)">预览
                            </el-button>
                            <el-button type="text" v-if="keyWordReplyForm.mediaId"
                                       @click="openMaterialDialog(0,keyWordReplyForm.replyType)">重新选择
                            </el-button>
                            <el-button type="text" v-else @click="openMaterialDialog(0,keyWordReplyForm.replyType)">
                                从素材库选择
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveKeyWordReplyForm()">保存</el-button>
                        <el-button @click="adding=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else>
                <el-table
                        :data="keyWordReplyList"
                        style="width: 100%">
                    <el-table-column
                            prop="keyWord"
                            label="关键字">
                    </el-table-column>
                    <el-table-column
                            label="回复内容">
                        <template slot-scope="scope">
                            <span v-if="scope.row.replyType===0">{{scope.row.replyText}}</span>
                            <span v-else-if="scope.row.replyType===1">图文</span>
                            <span v-else-if="scope.row.replyType===2">图片</span>
                            <span v-else-if="scope.row.replyType===3">语音</span>
                            <span v-else-if="scope.row.replyType===4">视频</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.replyType!==0" type="text" size="small" @click="preview(scope.row.replyMediaId, scope.row.replyMediaUrl)">预览</el-button>
                            <el-button type="text" size="small" @click="deleteKeyWordReply(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <!-- 收到消息回复 -->
        <el-card class="box-card" :style="{margin:'50px 0'}">
            <div slot="header" class="clearfix">
                <span><i class="el-icon-chat-dot-round">&nbsp;</i>收到消息回复</span>
            </div>
            <div>
                <el-form ref="form" :model="normalReplyForm" label-width="80px">
                    <el-form-item label="类型">
                        <el-select v-model="normalReplyForm.replyType">
                            <el-option v-for="type in replyType" :key="type.value" :label="type.label"
                                       :value="type.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容" v-if="normalReplyForm.replyType===0">
                        <el-input type="textarea" :rows="6" :show-word-limit="true" maxlength="300"
                                  v-model="normalReplyForm.text"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" v-else>
                        <div>
                            <el-button type="text" v-if="normalReplyForm.mediaId"
                                       @click="preview(normalReplyForm.mediaId,normalReplyForm.mediaUrl)">预览
                            </el-button>
                            <el-button type="text" v-if="normalReplyForm.mediaId"
                                       @click="openMaterialDialog(1,normalReplyForm.replyType)">重新选择
                            </el-button>
                            <el-button type="text" v-else @click="openMaterialDialog(1,normalReplyForm.replyType)">
                                从素材库选择
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveNormalReplyForm">保存</el-button>
                        <el-button type="danger" @click="deleteNormalReply">删除</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <!-- 被关注回复 -->
        <el-card class="box-card" :style="{margin:'50px 0'}">
            <div slot="header" class="clearfix">
                <span><i class="el-icon-star-off">&nbsp;</i>被关注回复</span>
            </div>
            <div>
                <el-form ref="form" :model="subscribeReplyForm" label-width="80px">
                    <el-form-item label="类型">
                        <el-select v-model="subscribeReplyForm.replyType">
                            <el-option v-for="type in replyType" :key="type.value" :label="type.label"
                                       :value="type.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容" v-if="subscribeReplyForm.replyType===0">
                        <el-input type="textarea" :rows="6" :show-word-limit="true" maxlength="300"
                                  v-model="subscribeReplyForm.text"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" v-else>
                        <div>
                            <el-button type="text" v-if="subscribeReplyForm.mediaId"
                                       @click="preview(subscribeReplyForm.mediaId,subscribeReplyForm.mediaUrl)">预览
                            </el-button>
                            <el-button type="text" v-if="subscribeReplyForm.mediaId"
                                       @click="openMaterialDialog(2,subscribeReplyForm.replyType)">重新选择
                            </el-button>
                            <el-button type="text" v-else @click="openMaterialDialog(2,subscribeReplyForm.replyType)">
                                从素材库选择
                            </el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveSubscribeReplyForm">保存</el-button>
                        <el-button type="danger" @click="deleteSubscribeReply">删除</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <el-dialog :visible.sync="dialogMaterialVisible" title="素材库" @close="closeMaterialDialog">
            <div v-show="this.currentReplyType===1">
                <el-table
                        :data="materialData.news"
                        style="width: 100%">
                    <el-table-column
                            label="图文内容">
                        <template slot-scope="scope">
                            <div v-for="article in scope.row.content.articles" :key="article.mediaId">
                                {{article.title}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="更新时间">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleSelectMaterialId(scope.row.mediaId)" size="small">
                                选择
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            layout="prev, pager, next"
                            @current-change="getNews"
                            :current-page.sync="materialDataPageInfo.news.pageIndex"
                            :page-size="materialDataPageInfo.news.pageSize"
                            :total="materialDataPageInfo.news.total">
                    </el-pagination>
                </div>
            </div>
            <div v-show="this.currentReplyType===2">
                <el-table
                        :data="materialData.image"
                        style="width: 100%">
                    <el-table-column
                            label="图片名称"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="上传时间">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="preview(scope.row.mediaId, scope.row.url)" size="small">
                                查看
                            </el-button>
                            <el-button type="text" @click="handleSelectMaterialId(scope.row.mediaId, scope.row.url)"
                                       size="small">
                                选择
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            layout="prev, pager, next"
                            @current-change="getImages"
                            :current-page.sync="materialDataPageInfo.image.pageIndex"
                            :page-size="materialDataPageInfo.image.pageSize"
                            :total="materialDataPageInfo.image.total">
                    </el-pagination>
                </div>
            </div>
            <div v-show="this.currentReplyType===3"></div>
            <div v-show="this.currentReplyType===4"></div>

        </el-dialog>

    </div>
</template>

<script>
    import {
        getAutoReplyByType,
        getMaterialList,
        saveAutoReply,
        deleteAutoReply,
        deleteAutoReplyByType
    } from '../../api'
    import MaterialPreView from '../../components/MaterialPreView'

    export default {
        name: "AutoReply",
        components: {MaterialPreView},
        data() {
            return {
                appId: null,
                dialogMaterialVisible: false,
                adding: false,
                currentType: null,
                currentReplyType: null,
                materialType: {
                    NEWS: 'news',
                    IMAGE: 'image',
                    VOICE: 'voice',
                    VIDEO: 'video',
                },
                type: [
                    {label: '关键字回复', value: 0},
                    {label: '被动回复', value: 1},
                    {label: '关注回复', value: 2}
                ],
                replyType: [
                    {label: '文字', value: 0},
                    {label: '图文', value: 1},
                    {label: '图片', value: 2},
                    {label: '语音', value: 3},
                    {label: '视频', value: 4}
                ],
                keyWordReplyList: [],
                normalReply: {},
                subscribeReply: {},
                keyWordReplyForm: {
                    keyWord: null,
                    replyType: 0,
                    text: null,
                    mediaId: null,
                    mediaUrl: null
                },
                subscribeReplyForm: {
                    replyType: 0,
                    text: null,
                    mediaId: null,
                    mediaUrl: null
                },
                normalReplyForm: {
                    replyType: 0,
                    text: null,
                    mediaId: null,
                    mediaUrl: null
                },
                materialData: {
                    news: [],
                    image: [],
                    voice: [],
                    video: []
                },
                defaultPageSize: 10,
                materialDataPageInfo: {
                    news: {
                        pageIndex: 1,
                        pageSize: 0,
                        total: 0
                    },
                    image: {
                        pageIndex: 1,
                        pageSize: 0,
                        total: 0
                    },
                    voice: {
                        pageIndex: 1,
                        pageSize: 0,
                        total: 0
                    },
                    video: {
                        pageIndex: 1,
                        pageSize: 0,
                        total: 0
                    },
                }

            }
        },
        created() {
            this.appId = this.$route.params.id
            this.getNews(1)
            this.getImages(1)
            this.getVoices(1)
            this.getVideos(1)
            this.getKeyWordReplyList()
            this.getNormalReplyData()
            this.getSubscribeReplyData()
        },
        methods: {
            //选中素材
            handleSelectMaterialId(mediaId, url) {
                this.dialogMaterialVisible = false
                if (this.currentType === 0) {
                    // 关键字回复
                    this.keyWordReplyForm.mediaId = mediaId
                    this.keyWordReplyForm.mediaUrl = url || ''
                    this.keyWordReplyForm.replyType = this.currentReplyType
                } else if (this.currentType === 1) {
                    // 被动回复
                    this.normalReplyForm.mediaId = mediaId
                    this.normalReplyForm.mediaUrl = url || ''
                    this.normalReplyForm.replyType = this.currentReplyType
                } else if (this.currentType === 2) {
                    // 关注回复
                    this.subscribeReplyForm.mediaId = mediaId
                    this.subscribeReplyForm.mediaUrl = url || ''
                    this.subscribeReplyForm.replyType = this.currentReplyType
                }
            },

            addKeyWordReply() {
                this.adding = true
            },
            openMaterialDialog(type, replyType) {
                this.dialogMaterialVisible = true
                this.currentType = type
                this.currentReplyType = replyType
            },
            closeMaterialDialog() {
                this.dialogMaterialVisible = false
                this.currentType = null
                this.currentReplyType = null
            },
            getNews(pageIndex) {
                this.getMaterialData(this.materialType.NEWS, pageIndex)
            },
            getImages(pageIndex) {
                this.getMaterialData(this.materialType.IMAGE, pageIndex)
            },
            getVideos(pageIndex) {
                this.getMaterialData(this.materialType.VIDEO, pageIndex)
            },
            getVoices(pageIndex) {
                this.getMaterialData(this.materialType.VOICE, pageIndex)
            },
            // 获取微信素材
            getMaterialData(materialType, pageIndex) {
                getMaterialList(this.appId, materialType, pageIndex, this.defaultPageSize).then((resp) => {
                    if (resp.data.data) {
                        let items = resp.data.data.data.items;
                        // 坑：微信的隐藏图片CropImage
                        this.materialData[`${materialType}`] = items
                        let pageInfo = {
                            pageIndex: resp.data.data.pageIndex,
                            pageSize: resp.data.data.pageSize,
                            pages: resp.data.data.pages,
                            total: resp.data.data.total
                        }
                        this.materialDataPageInfo[`${materialType}`] = pageInfo
                    }
                })
            },
            saveKeyWordReplyForm() {
                let a = {
                    appId: this.appId,
                    type: 0,
                    keyWord: this.keyWordReplyForm.keyWord,
                    replyType: this.keyWordReplyForm.replyType,
                    replyText: this.keyWordReplyForm.text,
                    replyMediaId: this.keyWordReplyForm.mediaId,
                    replyMediaUrl: this.keyWordReplyForm.mediaUrl
                }
                saveAutoReply(a).then(() => {
                    this.getKeyWordReplyList()
                    this.adding = false
                    this.$notify({
                        title: '成功',
                        message: '自动回复已生效',
                        type: 'success'
                    });
                })
            },
            saveNormalReplyForm() {
                let a = {
                    appId: this.appId,
                    type: 1,
                    replyType: this.normalReplyForm.replyType,
                    replyText: this.normalReplyForm.text,
                    replyMediaId: this.normalReplyForm.mediaId,
                    replyMediaUrl: this.normalReplyForm.mediaUrl
                }
                saveAutoReply(a).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '自动回复已生效',
                        type: 'success'
                    });
                })
            },
            saveSubscribeReplyForm() {
                let a = {
                    appId: this.appId,
                    type: 2,
                    replyType: this.subscribeReplyForm.replyType,
                    replyText: this.subscribeReplyForm.text,
                    replyMediaId: this.subscribeReplyForm.mediaId,
                    replyMediaUrl: this.subscribeReplyForm.mediaUrl
                }
                saveAutoReply(a).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '自动回复已生效',
                        type: 'success'
                    });
                })
            },
            getKeyWordReplyList() {
                getAutoReplyByType(this.appId, 0).then((resp) => {
                    this.keyWordReplyList = resp.data.data
                })
            },
            getNormalReplyData() {
                getAutoReplyByType(this.appId, 1).then((resp) => {
                    if (resp.data.data.length > 0) {
                        this.normalReplyForm.replyType = resp.data.data[0].replyType
                        this.normalReplyForm.mediaId = resp.data.data[0].replyMediaId
                        this.normalReplyForm.mediaUrl = resp.data.data[0].replyMediaUrl
                        this.normalReplyForm.text = resp.data.data[0].replyText
                    }
                })
            },
            getSubscribeReplyData() {
                getAutoReplyByType(this.appId, 2).then((resp) => {
                    if (resp.data.data.length > 0) {
                        this.subscribeReplyForm.replyType = resp.data.data[0].replyType
                        this.subscribeReplyForm.mediaId = resp.data.data[0].replyMediaId
                        this.subscribeReplyForm.mediaUrl = resp.data.data[0].replyMediaUrl
                        this.subscribeReplyForm.text = resp.data.data[0].replyText
                    }
                })
            },
            deleteKeyWordReply(id) {
                deleteAutoReply(id).then((resp) => {
                    this.getKeyWordReplyList()
                })
            },
            deleteNormalReply() {
                deleteAutoReplyByType(this.appId, 1).then((resp) => {
                    this.normalReplyForm = {}
                    this.normalReplyForm.replyType = 0
                    this.$notify({
                        title: '成功',
                        message: '自动回复已删除',
                        type: 'success'
                    });
                })
            },
            deleteSubscribeReply() {
                deleteAutoReplyByType(this.appId, 2).then((resp) => {
                    this.subscribeReplyForm = {}
                    this.subscribeReplyForm.replyType = 0
                    this.$notify({
                        title: '成功',
                        message: '自动回复已删除',
                        type: 'success'
                    });
                })
            },
            preview(mediaId, mediaUrl) {
                this.$refs.materialPreView.show(this.appId, mediaId, mediaUrl)
            }

        }
    }
</script>

<style scoped>

</style>