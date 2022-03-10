
import http from "@/common/http";
import authHeader from "@/common/auth.header";

const SERVICE_API_URL = "/api/v1/user";

class UserService {
    add(params) {
        return http.post(SERVICE_API_URL, params, {
            headers: authHeader()
        });
    }
}

export default new UserService();