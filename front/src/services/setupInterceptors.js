import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // const token = TokenService.getLocalAccessToken();
      // if (token) {
        // config.headers["x-access-token"] = token; 
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
    );
    axiosInstance.interceptors.response.use(
        (res) => {
          return res;
        },
        async (err) => {
          const originalConfig = err.config;
          if (originalConfig.url !== "/auth/signin" && err.response) {
            // Access Token was expired
            if (!store.getters['auth/getLogged']) {
              store.dispatch('auth/logout');
              this.$router.push('/login');
              try {
                console.log(store)
                const rs = await axiosInstance.post("/auth/refreshtoken", {
                  refreshToken: TokenService.getLocalRefreshToken(),
                });
                const { accessToken } = rs.data;
                store.dispatch('auth/refreshToken', accessToken);
                TokenService.updateLocalAccessToken(accessToken);
                return axiosInstance(originalConfig);
              } catch (_error) {
                return Promise.reject(_error);
              }
            }
          }
          return Promise.reject(err);
        }
      );
    };
    export default setup;