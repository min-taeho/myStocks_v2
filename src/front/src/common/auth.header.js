import Jwt from "./jwt";

export default function authHeader(params = {}) {
    let accessToken = Jwt.getAccessToken();
    
    if (accessToken) {
        return {
            //"X-AUTH-TOKEN": accessToken
          "Authorization": "Bearer " + accessToken,
          "portfolioid": params.portfolioId,
          "yearmon": params.yearmon
        }
    }
    else {
        return {
            "Authorization": "Bearer "
        };
    }
}