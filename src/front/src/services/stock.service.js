import http from "@/common/http";
import authHeader from "@/common/auth.header";
const SERVICE_API_URL = "/api/v1/stock";

class StockService {
  /*
  search(params = {}) {
      return http.get(SERVICE_API_URL, "/search", {
          params: params,
          headers: authHeader()
      });
  }
  */
  getStock(params = {}) {
    console.log('params='+JSON.stringify(params))
    return http.get(SERVICE_API_URL + "/byTicker", {
        params: params,
        headers: authHeader()
    });
  }

  modify(params = {}) {
    return http.put(SERVICE_API_URL, params, {
        headers: authHeader()
    });
  }

  
/*
    getId(id) {
        return http.get(SERVICE_API_URL + "/" + id, {
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

export default new StockService();
