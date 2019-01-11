import Amplify from 'aws-amplify';
import Optional from 'typescript-optional'
import { createStore, Reducer, Action, Store } from 'redux'

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()

export default class EnvironmentHelper {
  static isDev: boolean = Optional.ofNullable(process.env.NODE_ENV)
    .filter(p => p == "development")
    .isPresent

  static setupAmplify = (amplifyConfig: any): void => {
    Amplify.configure(amplifyConfig)
  }

  static store = (reducers: Reducer<{}, Action<any>>): Store<{}, Action<any>> =>
    createStore(reducers, EnvironmentHelper.isDev ? reduxDevTools : undefined)

  static bootstrap = (callback: () => void, fallbackUrl: string): void => {
    if (EnvironmentHelper.isDev) {
      callback()
    } else {
      window.location.href = fallbackUrl
    }
  }
}
