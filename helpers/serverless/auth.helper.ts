import Optional from 'typescript-optional'
import jwtDecode from 'jwt-decode';

export default class AuthHelper {
  private static getJWTOptional = (event : any) =>
    Optional.ofNullable(event)
      .map(e => e.headers)
      .map(h => h.Authorization)
      .map(jwtDecode)

  static getCurrentUser = (event : any) =>
    AuthHelper.getJWTOptional(event)
      .map((j: any) => j.sub)
      .orElseThrow(() => new Error("JWT Token is Invalid"))
}
