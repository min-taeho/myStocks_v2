import http from "@/common/http";
import authHeader from "@/common/auth.header";
const SERVICE_API_URL = "/api/v1/notice";
import { API_URL } from "@/common/config";

import axios from 'axios'; //axios 호출


class NoticeService {
    search(params = {}) {
        
        /* http 인터셉터를 적용한 모듈 적용시 response의 Pagable 정보가 누락되는 현상 있음
           axios를 직접 사용하는 것으로 변경, 원인이 뭔지 잘 모름
           */
        /*
        return http.get(SERVICE_API_URL, "/search", {
            params: params,
            headers: authHeader()
        });
        */
        return axios.get(API_URL + SERVICE_API_URL + "/search", {
            params: params,
            headers: authHeader()
        });
    }
    getAll(params = {}) {
        return http.get(SERVICE_API_URL, {
            params: params,
            headers: authHeader()
        });
    }
    getId(id) {
        return http.get(SERVICE_API_URL + "/" + id, {
            headers: authHeader()
        });
    }
    modify(id, params = {}) {
        return http.put(SERVICE_API_URL + "/" + id, params, {
            headers: authHeader()
        });
    }
    remove(id) {
        return http.delete(SERVICE_API_URL + "/" + id, {
            headers: authHeader()
        });
    }
    removeAll() {
        return http.delete(SERVICE_API_URL, {
            headers: authHeader()
        });
    }
    add(params) {
        return http.post(SERVICE_API_URL, params, {
            headers: authHeader()
        });
    }

}

export default new NoticeService();
