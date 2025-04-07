/**
 * @generated SignedSource<<02bcfd1558c7f3ef49ee4c3d5da01d62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type mainQuery$variables = Record<PropertyKey, never>;
export type mainQuery$data = {
  readonly gyms: ReadonlyArray<{
    readonly city: string;
  }> | null | undefined;
};
export type mainQuery = {
  response: mainQuery$data;
  variables: mainQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Gym",
    "kind": "LinkedField",
    "name": "gyms",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "city",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "mainQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "mainQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0899102e0434d90975fae3bd46ba9499",
    "id": null,
    "metadata": {},
    "name": "mainQuery",
    "operationKind": "query",
    "text": "query mainQuery {\n  gyms {\n    city\n  }\n}\n"
  }
};
})();

(node as any).hash = "7b26d878a24238a0cd53eb4b674b69d7";

export default node;
