import http from "@/common/http";
import authHeader from "@/common/auth.header";
const SERVICE_API_URL = "/api/v1/exchange";

class ExchangeService {

    getId(id) {
        return http.get(SERVICE_API_URL + "/" + id, {
            headers: authHeader()
        });
    }
    
}

export default new ExchangeService();
