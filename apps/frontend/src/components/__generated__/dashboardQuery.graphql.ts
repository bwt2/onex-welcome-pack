/**
 * @generated SignedSource<<d6c827afd917ecade5c0f9c2a879daee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type dashboardQuery$variables = {
  gymId: string;
  userId: string;
};
export type dashboardQuery$data = {
  readonly gym: {
    readonly challenges: ReadonlyArray<{
      readonly title: string;
      readonly type: string;
    }> | null | undefined;
    readonly city: string;
    readonly country: string;
    readonly gymId: string;
    readonly state: string | null | undefined;
    readonly streetAddress: string;
  } | null | undefined;
  readonly gyms: ReadonlyArray<{
    readonly city: string;
    readonly country: string;
    readonly gymId: string;
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "gymId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gymId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "streetAddress",
  "storageKey": null
},
v6 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v9 = [
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
        "selections": (v6/*: any*/),
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
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Gym",
                "kind": "LinkedField",
                "name": "gym",
                "plural": false,
                "selections": (v6/*: any*/),
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
    "args": [
      {
        "kind": "Variable",
        "name": "gymId",
        "variableName": "gymId"
      }
    ],
    "concreteType": "Gym",
    "kind": "LinkedField",
    "name": "gym",
    "plural": false,
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "state",
        "storageKey": null
      },
      (v5/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Challenge",
        "kind": "LinkedField",
        "name": "challenges",
        "plural": true,
        "selections": [
          (v7/*: any*/),
          (v8/*: any*/)
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
    "selections": (v6/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "dashboardQuery",
    "selections": (v9/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "dashboardQuery",
    "selections": (v9/*: any*/)
  },
  "params": {
    "cacheID": "2dca9612a3aa18c76c15b8a8c633eeea",
    "id": null,
    "metadata": {},
    "name": "dashboardQuery",
    "operationKind": "query",
    "text": "query dashboardQuery(\n  $userId: ID!\n  $gymId: ID!\n) {\n  user(userId: $userId) {\n    homeGym {\n      gymId\n      city\n      country\n      streetAddress\n    }\n    entries {\n      submissionTime\n      challenge {\n        title\n        type\n        gym {\n          gymId\n          city\n          country\n          streetAddress\n        }\n      }\n      data\n    }\n  }\n  gym(gymId: $gymId) {\n    city\n    country\n    gymId\n    state\n    streetAddress\n    challenges {\n      title\n      type\n    }\n  }\n  gyms {\n    gymId\n    city\n    country\n    streetAddress\n  }\n}\n"
  }
};
})();

(node as any).hash = "09366a1c8294b5679da21482ab6dce9b";

export default node;
