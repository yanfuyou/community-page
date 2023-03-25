const homePage = {
    namespaced: true,
    state: {
        hots: [],
        headLines:[]
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