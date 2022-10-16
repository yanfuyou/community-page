<template>
    <div class="block">
        <el-carousel height="300px">
            <el-carousel-item v-for="item in getHots" :key="item.id">
                <img :src="item.coverPath" class="tu" @click="dump('/article/preview',item.id)"/>
                <!-- <h3 class="small">{{ item }}</h3> -->
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters('homePage', ['getHots']),
    },
    methods: {
        dump(path,id){
            this.$router.push({
                path: '/article/preview',
                query: {id}

            })
        }
    }
}
</script>

<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.tu {
    width: 100%;
    height: 100%;
  }
</style>