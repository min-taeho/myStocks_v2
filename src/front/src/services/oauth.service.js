import http from "@/common/http";
import authHeader from "@/common/auth.header";

const SERVICE_API_URL = "/api/v1";

class OauthService {
    login(params = {}) {
        /*
        let form = new FormData();
        form.append("email", params.email);
        form.append("password", params.password);
        */
        return http.post(SERVICE_API_URL + "/login", params, {
            headers: authHeader()
        })
    }
    refresh(params = {}) {
        return http.get(SERVICE_API_URL + "/oauth/refresh", {
            params: params,
            headers: authHeader()
        });
    }
}

export default new OauthService();