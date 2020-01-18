export class GraphqlError {
  public error(errorCode: number, errorText: any) {
    this[errorCode] && this[errorCode](errorText);
  }
}
