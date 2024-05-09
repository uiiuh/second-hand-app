<template>
    <footer class="footer">
        <ul class="content">
            <li></li>
            <li></li>
            <li></li>
            <li>
                平台介绍
                <div class="option">
                    <a href="javascript:;">关于我们</a>
                    <a href="javascript:;">联系我们</a>
                </div>
            </li>
        </ul>
    </footer>
</template>

<script>
    export default {
        name: 'Footer',
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang="less">
    .footer {
        background-color: #E7E8FB;
        color: #5f479a;
        .content {
            display: flex;
            justify-content: space-around;
            margin: 0 auto;
            padding: 20px 0;
            width: 80%;

            .option {
                margin-top: 15px;
                a {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    color: #9EA3F3;
                    transition: all .3s;

                    &:hover {
                        color: #5f479a;
                    }
                }
            }
        }
    }
</style>