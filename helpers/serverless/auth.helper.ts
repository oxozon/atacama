import jwtDecode from "jwt-decode";
import { Optional } from "typescript-optional";

export default class AuthHelper {
  private static getJWTOptional = (event: any) =>
    Optional.ofNullable(event)
      .map((e: any) => e.headers)
      .map((h: any) => h.Authorization)
      .map(jwtDecode);

  static getCurrentUser = (event: any) =>
    AuthHelper.getJWTOptional(event)
      .map((j: any) => j.sub)
      .orElseThrow(() => new Error("JWT Token is Invalid"));
}
