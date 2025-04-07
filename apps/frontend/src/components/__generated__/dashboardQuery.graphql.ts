/**
 * @generated SignedSource<<e6e6713edb59a972d1bd3a9c2cd2860e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type dashboardQuery$variables = Record<PropertyKey, never>;
export type dashboardQuery$data = {
  readonly gyms: ReadonlyArray<{
    readonly city: string;
  }> | null | undefined;
};
export type dashboardQuery = {
  response: dashboardQuery$data;
  variables: dashboardQuery$variables;
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
    "name": "dashboardQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "dashboardQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2450865d6ba57bdef03e8d43f3a5f168",
    "id": null,
    "metadata": {},
    "name": "dashboardQuery",
    "operationKind": "query",
    "text": "query dashboardQuery {\n  gyms {\n    city\n  }\n}\n"
  }
};
})();

(node as any).hash = "d8ce2c994f0a8b1a70c72881c0914dce";

export default node;
