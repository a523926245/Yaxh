const publicMixin = {
    methods:{
        // 全局混入返回上一页方法
        backRouter(){
            this.$router.go(-1)
            console.log('----------------------全局混入方法backRouter----------------------')
        }
    }
}
export default publicMixin;