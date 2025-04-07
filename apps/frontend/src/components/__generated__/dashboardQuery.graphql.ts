/**
 * @generated SignedSource<<a525f52519610522d976dc069b89da7b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type dashboardQuery$variables = {
  userId: string;
};
export type dashboardQuery$data = {
  readonly gyms: ReadonlyArray<{
    readonly city: string;
  }> | null | undefined;
  readonly user: {
    readonly homeGym: {
      readonly city: string;
      readonly country: string;
      readonly gymId: string;
      readonly streetAddress: string;
    };
  } | null | undefined;
};
export type dashboardQuery = {
  response: dashboardQuery$data;
  variables: dashboardQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
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
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "country",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "streetAddress",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Gym",
    "kind": "LinkedField",
    "name": "gyms",
    "plural": true,
    "selections": [
      (v1/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "dashboardQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "dashboardQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "ad82036b86218d8780d21a8388143a35",
    "id": null,
    "metadata": {},
    "name": "dashboardQuery",
    "operationKind": "query",
    "text": "query dashboardQuery(\n  $userId: ID!\n) {\n  user(userId: $userId) {\n    homeGym {\n      gymId\n      city\n      country\n      streetAddress\n    }\n  }\n  gyms {\n    city\n  }\n}\n"
  }
};
})();

(node as any).hash = "24c226ceabc4ea305562f7f55bc3e8e2";

export default node;
