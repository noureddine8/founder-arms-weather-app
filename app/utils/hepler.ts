import { TxKeyPath } from "../i18n"

export function errorKindToKeyPath(
  kind:
    | "ok"
    | "timeout"
    | "cannot-connect"
    | "server"
    | "unauthorized"
    | "forbidden"
    | "not-found"
    | "rejected"
    | "unknown"
    | "bad-data",
): TxKeyPath {
  switch (kind) {
    case "unauthorized":
      return "homeScreen:unAuthorizedMessage"
    case "not-found":
      return "homeScreen:notFoundMessage"
    case "forbidden":
      return "homeScreen:unAuthorizedMessage"
    case "cannot-connect":
      return "homeScreen:cannotConnectError"
    default:
      return "homeScreen:errorMessage"
  }
}
