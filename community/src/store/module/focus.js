const focus = {
    namespaace: true,
    state: {
        checkedTags: []
    },
    getters: {
        getChekedTags(state) {
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