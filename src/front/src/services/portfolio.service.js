import http from "@/common/http";
import authHeader from "@/common/auth.header";
const SERVICE_API_URL = "/api/v1/portfolio";
const SERVICE_API_URL2 = "/api/v1/portfolioStock";

class PortfolioService {
  /*
  search(params = {}) {
      return http.get(SERVICE_API_URL, "/search", {
          params: params,
          headers: authHeader()
      });
  }
  */
  
  getPortfolioList(params = {}) {
    return http.get(SERVICE_API_URL + "/" + "byEmail", {
        params: params,
        headers: authHeader()
    });
  }
  getPortfolioStockList(params = {}) {
    return http.get(SERVICE_API_URL2 + "/" + "byEmailAndPortfolioId", {
        params: params,
        headers: authHeader()
    });
  }
  addPortfolio(params) {
    return http.post(SERVICE_API_URL, params, {
        headers: authHeader()
    });
  }
  register(params) {
    return http.post(SERVICE_API_URL2, params, {
        headers: authHeader()
    });
  }
  remove(params = {}) {
    return http.delete(SERVICE_API_URL2 + "/" + params.portfolioStockId, {
      headers: authHeader()
    });
  }
  modify(params = {}) {
    return http.put(SERVICE_API_URL2, params, {
        headers: authHeader()
    });
  }
  /*
  getSummary(params = {}) {
    return http.get(SERVICE_API_URL + "/" + "summary", {
        params: params,
        headers: authHeader()
    });
  }
  getSummaryDividendPayoutPerMonth(params = {}) {
    return http.get(SERVICE_API_URL + "/" + "summaryDividendPayoutPerMonth", {
        params: params,
        headers: authHeader()
    });
  }
  getStockPortionNEarningRate(params = {}) {
    return http.get(SERVICE_API_URL + "/" + "chart/stockPortionNEarningRate", {
      params: params,
      headers: authHeader()
    });
  }
  */
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

  removePortfolio(id) {
    return http.delete(SERVICE_API_URL + "/portfolio/" + id, {
        headers: authHeader()
    });
  }

  getPortfolioAll() {
    return http.get(SERVICE_API_URL + "/portfolio", {
      headers: authHeader()
    });
      
  }


  getPortfolioHistoryYearmon(params = {}) {
    return http.get(SERVICE_API_URL + "/" + "history", {
      params: params,
      headers: authHeader()
  });
}
  */



}

export default new PortfolioService();
