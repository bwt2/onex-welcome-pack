/**
 * @generated SignedSource<<9caf629f6ff0b5c35eadd4e91aad1b4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LoginInput = {
  email: string;
  password: string;
};
export type LoginFormMutation$variables = {
  input: LoginInput;
};
export type LoginFormMutation$data = {
  readonly login: {
    readonly email: string;
    readonly homeGym: {
      readonly gymId: string;
    };
    readonly name: string;
    readonly userId: string;
  } | null | undefined;
};
export type LoginFormMutation = {
  response: LoginFormMutation$data;
  variables: LoginFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "login",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "userId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Gym",
        "kind": "LinkedField",
        "name": "homeGym",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "gymId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a85d2b5ecad916c5b324aa2c425a1031",
    "id": null,
    "metadata": {},
    "name": "LoginFormMutation",
    "operationKind": "mutation",
    "text": "mutation LoginFormMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    userId\n    name\n    email\n    homeGym {\n      gymId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d8dfd3ef0945b9712bf58e501e296174";

export default node;
