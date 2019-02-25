export interface Schema {
  queryType?: {
    name: string;
  }

  mutationType?: {
    name: string;
  }

  subscriptionType: {
    name: string;
  }

  types: Type[];
}

export interface Type {
  kind: "OBJECT" | "INTERFACE" | "SCALAR" | "ENUM" | "INPUT_OBJECT";
  name: "Query" | "Mutation" | "Subscription",
  description: string;
  fields: Field[];
  enumValues: EnumValues[],
  inputFields: Args[];
}

export interface EnumValues {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: string;
}

export interface ArgsType {
  kind: "NULL" | "NON_NULL" | "LIST",
  name: string;
  ofType: ArgsType;
}

export interface Field {
  name: string;
  description: string;
  args: Args[];
  type: ArgsType;
  isDeprecated: boolean;
  deprecationReason: string;
}

export interface Args {
  name: string;
  description: string;
  type: ArgsType;
  defaultValue?: any;
}