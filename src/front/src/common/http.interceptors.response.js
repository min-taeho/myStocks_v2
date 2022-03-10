import Jwt from "./jwt";
//import router from '@/router';
import routes from '@/routes/routes'
import store from '@/store';

import OauthService from "@/services/oauth.service.js";

const processQueue = (error, accessToken = null) => {   // eslint-disable-line no-unused-vars
  failedQueue.forEach(prom => { // eslint-disable-line no-undef
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(accessToken);
    }
  });

  failedQueue = []; // eslint-disable-line no-undef
};


const interceptor = axiosInstance => error => { // eslint-disable-line no-unused-vars
    const _axios = axiosInstance; // eslint-disable-line no-unused-vars
    const originalRequest = error.config;

    if (error.response) {
        //console.log(originalRequest.url);
        if (originalRequest.url.indexOf("/api/oauth/login") == 0) {
            //console.log("/oauth/login");
            Promise.reject(error);
        } else if (error.response.status === 401 && !originalRequest._retry) {
            /*
            if (isRefreshing) {
                return new Promise(function(resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                .then(accessToken => {
                    originalRequest.headers["Authorization"] = "Bearer " + accessToken;
                    return _axios.request(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
            }
    
            originalRequest._retry = true;
            isRefreshing = true;
            */
            const refreshToken = Jwt.getRefreshToken(); // eslint-disable-line no-unused-vars
            /*
            return new Promise((resolve, reject) => {
                // Refresh Token 으로 AccessToken 재발급 요청
                _axios
                    .post("/api/oauth/refresh", { certify: { refreshToken } })
                    .then(({ data }) => {
                        console.log("interceptor_ refresh--------");
                        console.log(data);
                        Jwt.saveToken(data.accessToken);
                        _axios.defaults.headers.common["Authorization"] =
                            "Bearer " + data.accessToken;
                        originalRequest.headers["Authorization"] =
                            "Bearer " + data.accessToken;
                        processQueue(null, data.accessToken);
                        resolve(_axios(originalRequest));
                    })
                    .catch(err => {
                        console.log("interceptor_ CATCH");
                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
            */
        } else if (error.response.status == 400) {
            if (originalRequest.url.indexOf("/api/oauth/refresh") == 0) {
                // 리프레시토큰 요청후 실패 > 로그아웃
            } else {
                if (error.response.data.message) {
                    // 에러 메시지
                }
            }
        } else if (error.response.status == 500) {
          /*
          console.log(">>>http.interceptors.response.js::error.response.status", error.response.status)
          console.log(">>>error.response.data.errorClassName", error.response.data.errorClassName)
          if (error.response.data.errorClassName === 'SignatureException') {
            // accessToken 오류, 로그아웃 처리 후 로그린 페이지로 이동
            if (error.response.data.message) { alert(error.response.data.message) }
            Jwt.destroyAccessToken()
            Jwt.destroyRefreshToken()
            routes.replace('/login')
          }
          else if (error.response.data.errorClassName === 'ExpiredJwtException') {
            // accessToken 타임아웃
            // Refresh Token 으로 AccessToken 재발급 요청
            originalRequest._retry = true;
            
            let params = {
                userId: store.state.userId,
                email: store.state.email,
                refreshToken: store.state.refreshToken
            }

            // Refresh Token 으로 AccessToken 재발급 요청
            OauthService.refresh(params)
                .then(res => {
                    console.log('res', res);
                })
                .catch(err => {
                    console.log("interceptor_ CATCH", err);

                    //processQueue(err, null);
                    //reject(err);
                })
                .finally(() => {
                    Promise.reject(error);
                })
            
            *
            _axios
                .post("api/v1/oauth/refresh", { certify: { refreshToken } })
                .then(({ data }) => {
                    console.log("interceptor_ refresh--------");
                    console.log(data);
                    Jwt.saveToken(data.accessToken);
                    _axios.defaults.headers.common["Authorization"] =
                        "Bearer " + data.accessToken;
                    originalRequest.headers["Authorization"] =
                        "Bearer " + data.accessToken;
                    processQueue(null, data.accessToken);
                    resolve(_axios(originalRequest));
                })
                .catch(err => {
                    console.log("interceptor_ CATCH");
                    processQueue(err, null);
                    reject(err);
                })
                .finally(() => {
                    isRefreshing = false;
                });
            *
        
        
            
          }
          else {
            console.log(">>>error.response.data", error.response.data)
            console.log(">>>error.response.data.message", error.response.data.message)
            console.log(">>>error.response.data.errorClassName2", error.response.data.errorClassName)
            console.log('Jwt.getRefreshToken()', Jwt.getRefreshToken());
            routes.replace('/login')
          }
          */
        }
    }

    return Promise.reject(error);
};

export default interceptor;
