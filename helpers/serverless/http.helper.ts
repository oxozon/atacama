export default class HttpHelper {
  static buildResponse = (status: any, body? : any) => (
    {
      statusCode: status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(body)
    }
  )
}
