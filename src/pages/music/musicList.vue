<template>
    <div class="page">
        <y-table-card :lists="musicList"></y-table-card>
    </div>
</template>

<script>
import yTableCard from "@/components/tablecard/tablecard";

export default {
    name:"musicList",
    components:{
        yTableCard,
    },
    data(){
        return{
            musicList:[]
        }
    },
    beforeMount(){
        this.initMusicList()
    },
    methods:{
        initMusicList(){
            this.$http('get',"/musicList",{})
            .then(res =>{
                console.log(res)
                if(res.data.resultCode == '0000'){
                    this.musicList = res.data.result
                }
            })
            .catch(err =>{
            console.log(err)
            })
        }
    }
}
</script>

<style>

</style>