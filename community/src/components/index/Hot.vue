<template>
    <div>
        <ul>
            <li v-for="(item,index) in getHots" :key="index" @click="dump('/article/preview',item.id)">
                <span class="title">{{item.articleName}}</span>
                <span class="describe">{{item.articleContent}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters('homePage', ['getHots'])
    },
    methods: {
        dump(path, id) {
            this.$router.push({
                path: '/article/preview',
                query: { id }
            })
        }
    },
    mounted() {
        this.$http.get('/article/getHots/0/4').then(res => {
            if (res.data.code === 2000) {
                // console.log(res.data.records);
                this.$store.commit('homePage/setHots', res.data.records)
            }
        })
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