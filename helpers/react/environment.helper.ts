import Auth from "@aws-amplify/auth";
import { Optional } from "typescript-optional";
import { createStore, Reducer, Action, Store } from "redux";

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

export default class EnvironmentHelper {
  static isDev: boolean = Optional.ofNullable(process.env.NODE_ENV)
    .filter((p: any) => p == "development")
    .isPresent();

  static setupAmplify = (amplifyConfig: any): void => {
    Auth.configure(amplifyConfig);
  };

  static store = (reducers: Reducer<{}, Action<any>>): Store<{}, Action<any>> => createStore(reducers, EnvironmentHelper.isDev ? reduxDevTools : undefined);

  static bootstrap = (callback: () => void, fallbackUrl: string): void => {
    if (EnvironmentHelper.isDev) {
      callback();
    } else {
      window.location.href = fallbackUrl;
    }
  };
}
