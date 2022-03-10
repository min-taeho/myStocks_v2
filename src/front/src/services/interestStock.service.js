import http from "@/common/http";
import authHeader from "@/common/auth.header";
const SERVICE_API_URL = "/api/v1/interestStock";

class InterestStockService {
  /*
  search(params = {}) {
      return http.get(SERVICE_API_URL, "/search", {
          params: params,
          headers: authHeader()
      });
  }
  */
  getList(params = {}) {
      return http.get(SERVICE_API_URL + "/byEmail", {
          params: params,
          headers: authHeader()
      });
  }
  register(params = {}) {
    return http.post(SERVICE_API_URL, params, {
        params: params,
        headers: authHeader()
    });
  }
  remove(id) {
    return http.delete(SERVICE_API_URL + "/" + id, {
        headers: authHeader()
    });
  }  


/*
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
*/
    /*
    removeAll() {
        return http.delete(SERVICE_API_URL, {
            headers: authHeader()
        });
    }
    */
  /*
    add(params) {
        return http.post(SERVICE_API_URL, params, {
            headers: authHeader()
        });
    }
    */

}

export default new InterestStockService();
