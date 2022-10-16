const homePage = {
    namespaced: true,
    state: {
        hots: [
            // {
            //     title: '标题1',
            //     describe: '描述信息1'
            // },
            // {
            //     title: '标题2',
            //     describe: '描述信息2'
            // }
        ],
        headLines:[
            {
                title: '头条1',
                describe: '描述信息1'
            },
            {
                title: '头条2',
                describe: '描述信息2'
            },
            {
                title: '头条2',
                describe: '描述信息2'
            },
            {
                title: '头条2',
                describe: '描述信息2'
            },
            {
                title: '头条2',
                describe: '描述信息2'
            }
        ]
    },
    getters: {
        getHots(state){
            return state.hots;
        },
        getHeadLines(state){
            return state.headLines;
        }
    },
    mutations: {
        setHots(state,hots){
            state.hots = hots;
        }
    },
    actions: {

    }
}

export default homePage