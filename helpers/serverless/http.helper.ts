import * as HttpStatus from 'http-status-codes'

const FULL_OPEN_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
}

export default class HttpHelper {
  static buildResponse = (status: number, body? : any) => {

    /* Validate provided status */
    HttpStatus.getStatusText(status)

    return {
      statusCode: status,
      headers: FULL_OPEN_CORS,
      body: JSON.stringify(body)
    }
  }
}
