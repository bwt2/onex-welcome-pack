/**
 * @generated SignedSource<<11fd4ae42ec2e7049a787130219c37c5>>
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
    readonly country: string;
    readonly streetAddress: string;
  }> | null | undefined;
  readonly user: {
    readonly entries: ReadonlyArray<{
      readonly challenge: {
        readonly gym: {
          readonly city: string;
          readonly country: string;
          readonly gymId: string;
          readonly streetAddress: string;
        };
        readonly title: string;
        readonly type: string;
      };
      readonly data: any;
      readonly submissionTime: string;
    }> | null | undefined;
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "streetAddress",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "gymId",
    "storageKey": null
  },
  (v1/*: any*/),
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = [
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
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Entry",
        "kind": "LinkedField",
        "name": "entries",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "submissionTime",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenge",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Gym",
                "kind": "LinkedField",
                "name": "gym",
                "plural": false,
                "selections": (v4/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "data",
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
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
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
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "dashboardQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "aba249ea021c98cb7af90dc6075d9356",
    "id": null,
    "metadata": {},
    "name": "dashboardQuery",
    "operationKind": "query",
    "text": "query dashboardQuery(\n  $userId: ID!\n) {\n  user(userId: $userId) {\n    homeGym {\n      gymId\n      city\n      country\n      streetAddress\n    }\n    entries {\n      submissionTime\n      challenge {\n        title\n        type\n        gym {\n          gymId\n          city\n          country\n          streetAddress\n        }\n      }\n      data\n    }\n  }\n  gyms {\n    city\n    country\n    streetAddress\n  }\n}\n"
  }
};
})();

(node as any).hash = "8537e215026d98d5135d0b3a80968b26";

export default node;
