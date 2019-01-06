import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'
const AWS = require("aws-sdk");

/**
* Database manager class
*/
export default abstract class TypeORMHelper {
  protected connectionManager: ConnectionManager
  private options : ConnectionOptions = {
    name: `default`,
    type: `mysql`,
    port: 3306,
    synchronize: true,
    logging: false
  }

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  protected async connect(customOptions?: any, region?: string, secretName?: string): Promise<Connection> {
    const CONNECTION_NAME = `default`
    let connection: Connection

    if (this.connectionManager.has(CONNECTION_NAME)) {
      console.info("Using existing DB connection")
      connection = await this.connectionManager.get(CONNECTION_NAME)

      if (!connection.isConnected) {
        connection = await connection.connect()
      }
    } else {
      console.info("Creating new DB connection")

      if(region && secretName) {
        const client = new AWS.SecretsManager({ region: region }),
        data = await client.getSecretValue({ SecretId: secretName }).promise(),
        secret = JSON.parse(data.SecretString)

        Object.assign(this.options, {
          host: secret.host,
          username: secret.username,
          database: secret.dbnmame,
          password: secret.password
        })
      }

      Object.assign(this.options, customOptions)
      connection = await createConnection(this.options)
    }

    return connection
  }
}
