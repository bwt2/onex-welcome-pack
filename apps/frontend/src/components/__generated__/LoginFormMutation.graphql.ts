/**
 * @generated SignedSource<<536d5e3c6b1aec6d66f98824e61cf64a>>
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
      readonly id: string;
    };
    readonly id: string;
    readonly name: string;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
      (v1/*: any*/),
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
          (v1/*: any*/)
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
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginFormMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "d19f6e1cb289bbaa3834b376ae402884",
    "id": null,
    "metadata": {},
    "name": "LoginFormMutation",
    "operationKind": "mutation",
    "text": "mutation LoginFormMutation(\n  $input: LoginInput!\n) {\n  login(input: $input) {\n    id\n    name\n    email\n    homeGym {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6dcf4b734d6c6e50ecad39a00bfd4df7";

export default node;
