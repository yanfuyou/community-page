<template>
    <div>
        <ul>
            <li v-for="(item, index) in headMas" :key="index" title="点击下载"
                @click="download(item.id,item.fileName, item.visitPath)">
                <span class="title">{{ item.descr }}</span>
                <span class="describe">{{ item.createBy }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
    methods: {
        download(id, fileName, url) {
            // 增加下载量
            this.$http.get('/material/downloadCount/' + id);
            // 调用下载方法
            this.$down.myDownLoad(url, fileName);
        }
    },
    data() {
        return {

        }
    },
    computed: {
        // ...mapGetters('homePage', ['getHeadLines'])
    },
    props: {
        headMas: {
            type: Array,
            default: () => {
                return []
            }
        }
    }
}
</script>

<style lang="scss">
li {
    list-style: none;

    .title {
        display: block;
        font-weight: bold;
        margin-top: 5px;
    }
}
</style>