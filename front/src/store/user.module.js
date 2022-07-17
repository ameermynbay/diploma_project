import UserService from "@/services/user.service";

export const user = {
    namespaced: true,
    state: {
        user: {
            name: "",
            gender: "",
            date_of_birth: "",
            avatar: "",
            id: 0,
            email: ""
        }
    },
    getters: {
        getUser: (state) => state.user
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setUserName(state, payload) {
            state.user.name = payload;
        },
        setUserAvatar(state, payload) {
            state.user.avatar = payload;
        },
        setUserDate(state, payload) {
            state.user.date_of_birth = payload;
        }
    },
    actions: {
        async fetchUser(context) {
            let res = await UserService.getUserBoard();
            context.commit("setUser", res);
        },
        async changeUserName(context, payload) {
            context.commit("setUserName", payload);
            await UserService.changeUserName(payload)
        },
        async changeUserAvatar(context, payload) {
            context.commit("setUserAvatar", payload)
            await UserService.changeUserAvatar(payload);
        },
        async changeUserDate(context, payload) {
            context.commit("setUserDate", payload)
            await UserService.changeDateOfBirth(payload)
        }
    }
}