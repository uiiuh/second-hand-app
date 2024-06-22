<template>
    <div class="message">
        <Header></Header>
        <div class="main">
            <div class="conversation">
                <div class="title">
                    <i class="el-icon-chat-dot-round"></i>
                    <span>聊天列表</span>
                </div>
                <div class="search">
                    <el-input
                        placeholder="搜索最近联系人"
                        prefix-icon="el-icon-search"
                        v-model="searchKeyword"
                        clearable
                    >
                    </el-input>
                </div>
                <ul class="conversation-list" @click="enterChat">
                    <li v-for="(item,index) in filteredConversationList" :key="index" :data-contactid="item.userId">
                        <div class="avatar">
                            <img :src="$baseURL+item.avatar" alt="">
                        </div>
                        <div class="content">
                            <div class="name">
                                <h4>{{ item.userName }}</h4>
                                <p>{{ item.timeDiff }}</p>
                            </div>
                            <p class="desc">{{ item.lastMessageContent }}</p>
                        </div>
                    </li>
                </ul>

            </div>
            <div class="container">
                <div class="chatting-records">
                    <div v-show="!preConversation" class="unselected">您尚未选择联系人</div>
                    <div v-show="preConversation" class="selected">
                        <div class="message">
                            <div class="message-title">{{ contactInfo.userName }}</div>
                            <ul class="message-list" ref="messageList">
                                <li :class="{'message-item':true,'self':item.senderUserId==userInfo.userId}" v-for="(item,index) in allChatMessages" :key="index">
                                    <img :src="item.senderUserId==userInfo.userId?$baseURL+userInfo.avatar:$baseURL+contactInfo.avatar" alt="" class="avatar">
                                    <div class="message-content">
                                        <div class="top">
                                            <span class="name">{{ item.senderUserId==userInfo.userId? userInfo.userName:contactInfo.userName }}</span>
                                            <span class="time">{{ $formatDateTime(item.sentTime) }}</span>
                                        </div>
                                        <p class="content">
                                            {{ item.content }}
                                        </p>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                        <div class="message-input">
                            <!-- <div class="upload-files">
                                <el-upload
                                    class="upload-picture"
                                    action="http://127.0.0.1:3007/api/upload/uploadFile"
                                    :show-file-list="false"
                                >
                                    <i class="el-icon-picture-outline uploader-icon"></i>
                                </el-upload>
                            </div> -->
                            <div class="edit-box">
                                <textarea name="message" v-model="message" placeholder="请输入消息，按Enter发送，按 Shift+Enter换行" @keyup.enter="sendMessage"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="contact-info">
                    <div v-show="!preConversation" class="unselected">您尚未选择联系人</div>
                    <div v-show="preConversation">
                        <div class="contact-avatar">
                            <img :src="$baseURL+contactInfo.avatar" alt="">
                        </div>
                        <div class="contact-name">
                            {{ contactInfo.userName }}
                        </div>
                        <div class="check">
                            <el-button type="primary" size="small" class="check-btn" @click="checkHomepage">进入主页</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reqUserById, reqChatContacts, receiveMessage, reqAllChatMessages, reqSendMessage } from '@/api'
    import { mapState } from 'vuex'
    export default {
        name: 'Message',
        data() {
            return {
                pollingTimer: null, // 定义轮询定时器
                sellerInfo: {},    // 从详情页发起聊天时需要存储卖家信息
                contactKeyWord: '',    // 搜索联系人关键词
                conversationList: [],    // 用户发起的对话或别人对用户发起的对话
                newMessageList: [],    // 未读的消息
                newMessageLength: null,   // 未读消息长度
                preConversation: null,    // 上一个点击的对话框节点
                message: '',    // 待发送的消息
                allChatMessages: [],    // 历史消息
                contactInfo: {},   //联系方信息
                searchKeyword: '', // 搜索关键词
            }
        },
        created() {
            // 在组件创建时开始轮询
            this.startPolling();
        },
        mounted() {
            // 如果从详情发起聊天，则获取卖家信息
            const userId = this.$route.params.id
            if(userId) this.getUserById(userId)

            // 获取聊天对象信息列表
            this.getChatContacts()
        },
        destroyed() {
            // 在组件销毁时停止轮询
            this.stopPolling();
        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo,
            }),
            // 计算属性，根据搜索关键词过滤对话列表
            filteredConversationList() {
                return this.conversationList.filter(item => {
                    // 根据用户名进行模糊匹配搜索
                    return item.userName.toLowerCase().includes(this.searchKeyword.toLowerCase());
                });
            }
        },
        watch: {
            userInfo() {
                // 获取聊天对象信息列表
                this.getChatContacts()
            }
        },
        methods: {
            // 开始轮询
            startPolling() {
                const pollingInterval = 5000; // 轮询间隔为5秒钟
                this.pollingTimer = setInterval(this.pollMessages, pollingInterval);
            },
            // 停止轮询
            stopPolling() {
                clearInterval(this.pollingTimer);
            },
            // 轮询函数，向后端发送请求并处理数据
            async pollMessages() {
                const result = await receiveMessage(this.userInfo.userId)
                console.log(result);
                if(result.code == 200) {
                    this.newMessageList = result.data
                    const length = result.data.length
                    if(this.newMessageLength)
                    console.log(length);
                    // conversationList 重新排序
                    this.updateConversationList();
                    // 计算新消息数量
                    
                }
            },

            // 更新 conversationList 数据并重新排序
            updateConversationList() {
                // 根据最后一条消息的时间进行排序
                this.conversationList.sort((a, b) => {
                    return Date.parse(b.lastMessageTime) - Date.parse(a.lastMessageTime);
                });
            },

            // 获取卖家信息
            async getUserById(userId) {
                const result = await reqUserById(userId)
                if(result.code == 200) {
                    this.sellerInfo = result.data

                    // 并且将
                }
            },

            // 获取聊天对象列表
            async getChatContacts() {
                const userId = this.userInfo.userId
                if(userId) {
                    const result = await reqChatContacts(userId)
                    console.log(result)
                    if(result.code == 200) {
                        let data = result.data
                        data = data.map(item => {
                            if(item.lastMessageTime) {
                                const lastTime = Date.parse(item.lastMessageTime)
                                const timeDiff = this.getTimeDiff(lastTime)
                                item.timeDiff = timeDiff
                            } else {
                                item.timeDiff = ''
                            }
                            return item
                        })
                        this.conversationList = result.data
                        // conversationList 重新排序
                        this.updateConversationList();
                    }
                }
            },

            // 计算与上次聊天的时间差
            getTimeDiff(lastTime) {
                const nowTime = Date.now();
                const timeDiff = nowTime - lastTime;

                // 将时间差转换为小时、分钟和天数
                const msPerMinute = 60 * 1000;
                const msPerHour = msPerMinute * 60;
                const msPerDay = msPerHour * 24;

                let str = ''

                if (timeDiff < msPerMinute) {
                    // 小于1分钟，显示xx秒前
                    const seconds = Math.round(timeDiff / 1000);
                    str = `${seconds} 秒前`;
                } else if (timeDiff < msPerHour) {
                    // 小于1小时，显示xx分钟前
                    const minutes = Math.round(timeDiff / msPerMinute);
                    str = `${minutes} 分钟前`;
                } else if (timeDiff < msPerDay) {
                    // 小于1天，显示xx小时前
                    const hours = Math.round(timeDiff / msPerHour);
                    str = `${hours} 小时前`;
                } else {
                    // 大于等于1天，显示xx天前
                    const days = Math.round(timeDiff / msPerDay);
                    str = `${days} 天前`;
                }
                console.log(str);
                return str
            },

            // 点击进入聊天
            async enterChat(e) {
                console.dir(e.target)
                let target = e.target;

                // 先去掉上一个点击的 li 标签的类名
                if(this.preConversation) {
                    // 这样写样式层叠几倍最高，导致hover时样式不会变
                    // this.preConversation.style.backgroundColor = 'transparent'
                    this.preConversation.className = ''
                }
                
                // 再找到这次点击的 li 标签
                // 因为click事件是写在ul上的，因此当点击li标签中的子元素时，target是li的子元素
                // 因此需要循环往上找到li标签
                while (target && target.nodeName.toLowerCase() != 'li') {
                    target = target.parentNode
                }

                // 保存这次点击的元素
                this.preConversation = target;
                // 更改颜色
                // target.style.backgroundColor = '#e6e9ed'
                target.className = 'active'

                const contactId = target.dataset.contactid
                // console.log('Contact ID:',contactId);

                // 根据 Id 获取用户与他的所有聊天记录
                this.getAllChatMessages(contactId)
                // 根据 id 获取对方信息
                this.getContactInfo(contactId)
            },

            // 获取所有聊天记录
            async getAllChatMessages(contactId) {
                const result = await reqAllChatMessages(this.userInfo.userId,contactId)
                if(result.code == 200) {
                    this.allChatMessages = result.data

                    // 在获取所有聊天记录后，设置滚动条在底部
                    if (result.code == 200) {
                        this.allChatMessages = result.data;
                        this.$nextTick(() => {
                            this.scrollToBottom();
                        });
                    }
                }
            },

            // 获取联系方信息
            async getContactInfo(contactId) {
                const result2 = await reqUserById(contactId)
                if(result2.code == 200) {
                    this.contactInfo = result2.data
                }
            },

            // 发送信息
            async sendMessage(e) {
                console.log(e)
                // 检查event.shiftKey属性，如果为true，则说明同时按下了Shift键，则调用event.preventDefault()来阻止默认行为
                if (e.shiftKey) {
                    e.preventDefault() // 阻止默认行为
                    return
                }
                const messageInfo = {
                    senderUserId: this.userInfo.userId,
                    recipientUserId: this.contactInfo.userId,
                    content: this.message
                }
                const result = await reqSendMessage(messageInfo)
                if(result.code == 200) {
                    this.getAllChatMessages(this.contactInfo.userId)
                    this.message = ''
                }
            },

            // 滚动到底部的方法
            scrollToBottom() {
                const messageList = this.$refs.messageList;
                if (messageList) {
                    messageList.scrollTop = messageList.scrollHeight;
                }
            },

            // 查看个人主页
            checkHomepage() {
                const userId = this.contactInfo.userId
                // 将用户id传给个人主页组件
                this.$router.push({
                    name: 'personalhomepage',
                    params: {
                        id: userId
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .main {
        display: flex;
        margin: 20px auto;
        /* padding: 20px; */
        width: 1040px;
        height: 450px;
        /* background-color: pink; */
        /* border-radius: 15px; */

        .conversation {
            display: flex;
            flex-direction: column;
            padding: 15px 0;
            width: 300px;
            background-color: #f7f8fa;
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;

            .title {
                padding: 0 15px;
                font-size: 14px;
                i {
                    margin: 0 5px;
                    font-size: 16px;
                    vertical-align: bottom;
                }
            }

            .search {
                margin: 10px 0;
                padding: 0 15px;
                ::v-deep .el-input__inner {
                    border-color: #e7e8fb;
                    border-radius: 20px;

                    &:hover {
                        border-color: #c9cbe5;
                    }
                    &:focus {
                        box-shadow: 0 0 1px 1px rgb(231, 232, 251);
                        outline: 0;
                    }
                }
            }

            .conversation-list {
                flex: 1;
                overflow: auto;
                li {
                    display: flex;
                    align-items: center;
                    padding: 0 15px;
                    height: 60px;
                    border-bottom: 1px solid #E4E7ED;
                    transition: all .3s;
                    cursor: pointer;

                    &.active {
                        background-color: #e6e9ed;
                    }

                    &:hover {
                        background-color: #E7E8FB;
                    }

                    .avatar {
                        img {
                            width: 40px;
                            height: 40px;
                        }
                    }

                    .content {
                        width: 200px;
                        margin-left: 10px;
                        .name {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            h4 {
                                font-weight: 400;
                            }

                            p {
                                font-size: 12px;
                                color: #8a8a8a;
                            }
                        }

                        .desc {
                            margin-top: 5px;
                            font-size: 12px;
                            color: #8a8a8a;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                }
            }
        }

        .container {
            flex: 1;
            display: flex;
            justify-content: space-between;

            .chatting-records {
                position: relative;
                flex: 1;
                background-color: #f0f2f5;

                .selected {
                    display: flex;
                    flex-direction: column;
                    height: 100%;

                    .message {
                        padding: 0 15px;
                        height: 350px;

                        .message-title {
                            padding-top: 15px;
                            height: 45px;
                            border-bottom: 1px solid #DCDFE6;
                            color: #333;
                        }

                        .message-list {
                            padding: 10px 0;
                            height: 290px;
                            overflow: auto;

                            .message-item {
                                display: flex;
                                margin-bottom: 15px;
                                width: 95%;

                                img {
                                    margin: 0 8px;
                                    width: 30px;
                                    height: 30px;
                                }

                                .message-content {
                                    .top {
                                        display: flex;
                                        margin-bottom: 5px;
                                        font-size: 14px;
                                        .time {
                                            margin: 0 25px;
                                            color: #8a8a8a;
                                        }
                                    }

                                    .content {
                                        padding: 8px;
                                        border-radius: 5px;
                                        background-color: #fff;
                                        color: #333;
                                        font-size: 15px;
                                    }
                                }

                                &.self {
                                    flex-direction: row-reverse;

                                    .top {
                                        flex-direction: row-reverse;
                                    }
                                }
                            }
                        }
                    }

                    .message-input {
                        height: 100px;
                        border-top: 1px solid #DCDFE6;
                        // border-bottom: 1px solid #DCDFE6;

                        .upload-files {
                            display: flex;
                            align-items: end;
                            height: 30px;

                            .upload-picture {
                                cursor: pointer;

                                .uploader-icon {
                                    padding: 0 14px;
                                    font-size: 20px;
                                }
                            }
                        }

                        .edit-box {
                            height: 70px;

                            textarea {
                                padding: 10px 15px;
                                width: 100%;
                                height: 100%;
                                background-color: transparent;
                                resize: none;

                                &::placeholder {
                                    font-size: 14px;
                                    color: #999;
                                }
                            }
                        }
                    }
                }
            }

            .contact-info {
                position: relative;
                padding: 20px 0;
                width: 200px;
                background-color: #F7F9FA;
                text-align: center;
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;

                .contact-avatar {
                    img {
                        width: 60px;
                        height: 60px;
                    }
                }

                .contact-name {
                    margin: 10px 0;
                }

                .check {
                    .check-btn {
                        background-color: #9085c4;
                        border: none;
                        transition: all .3s;

                        &:hover {
                            background-color: #776da6;
                        }
                    }
                }
            }

            .unselected {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 100%;
                font-size: 14px;
                color: #666;
                text-align: center;
            }
        }
    }
</style>