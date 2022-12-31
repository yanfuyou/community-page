const focus = {
    namespaced: true,
    state: {
        checkedTags: []
    },
    getters: {
        getCheckedTags(state) {
            return state.checkedTags;
        }
    },
    mutations: {
        setCheckedTags(state, val) {
            state.checkedTags = val;
        }
    },
    actions: {
        setCheckedTags(context, val) {
            context.commit('setCheckedTags', val);
        }
    }
}

export default focus