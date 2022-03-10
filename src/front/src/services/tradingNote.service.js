import http from "@/common/http";
import authHeader from "@/common/auth.header";
const SERVICE_API_URL = "/api/v1/tradingNote";
const SERVICE_API_URL2 = "/api/v1/portfolio";

class TradingNoteService {
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
  register(params) {
    console.log('>>> tradingnote::register::params='+JSON.stringify(params))
    return http.post(SERVICE_API_URL, params, {
      headers: authHeader()
    });
  }
  modify(params = {}) {
    return http.put(SERVICE_API_URL, params, {
      headers: authHeader()
    });
  }
  remove(id) {
    return http.delete(SERVICE_API_URL + "/" + id, {
        headers: authHeader()
    });
  }
  getPortfolioList(params = {}) {
    return http.get(SERVICE_API_URL2 + "/" + "byEmail", {
      params: params,
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


}

export default new TradingNoteService();
