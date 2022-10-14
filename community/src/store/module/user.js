const user = {
    namespaced: true,
    state: {
        user: {
            id: '',
            userName: '',
            userAlias: '',
            userAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
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