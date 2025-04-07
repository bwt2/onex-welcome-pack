/**
 * @generated SignedSource<<f9a56f78fb12884a87cd2b8df9fb1448>>
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
export type loginMutation$variables = {
  input: LoginInput;
};
export type loginMutation$data = {
  readonly login: {
    readonly email: string;
    readonly name: string;
    readonly userId: string;
  } | null | undefined;
};
export type loginMutation = {
  response: loginMutation$data;
  variables: loginMutation$variables;
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
    "name": "loginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "loginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "468e3f6c7a51e6bc5c7a6ab7f8bdb1a7",
    "id": null,
    "metadata": {},
    "name": "loginMutation",
    "operationKind": "mutation",
    "text": "mutation loginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    userId\n    name\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "a6c9282b6f62d861fdb67fc1860d350d";

export default node;
