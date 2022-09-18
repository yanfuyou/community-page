<template>
    <div>
        <ul>
            <li v-for="(item,index) in getHots" :key="index">
                <span class="title">{{item.title}}</span>
                <span class="describe">{{item.describe}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
    data(){
        return {

        }
    },
    computed:{
        ...mapGetters('homePage',['getHots'])
    }
}
</script>

<style lang="scss">
    li{
        list-style: none;
        .title{
            display: block;
            font-weight: bold;
            margin-top: 5px;
        }
    }
</style>