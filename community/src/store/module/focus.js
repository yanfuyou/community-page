const focus = {
    namespaced: true,
    state: {
        checkedTags: [],
        activeName: 'first'
    },
    getters: {
        getCheckedTags(state) {
            return state.checkedTags;
        },
        getActiveName(state){
            return state.activeName;
        }
    },
    mutations: {
        setCheckedTags(state, val) {
            state.checkedTags = val;
        },
        setActiveName(state,val){
            state.activeName = val;
        }
    },
    actions: {
        setCheckedTags(context, val) {
            context.commit('setCheckedTags', val);
        }
    }
}

export default focus