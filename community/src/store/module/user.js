const user = {
    namespaced: true,
    state: {
        user: {
            id: '',
            userName: '',
            userAlias: '',
            loginFlag: false
        }
    },
    getters:{
        getUser(state){
            return state.user;
        }
    },
    mutations: {
        setUser(state,user){
            state.user = user;
        }
    }
}

export default user