/**
 * @generated SignedSource<<0e8500e5d4f22aa2621ddb29561b0ca1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeQuery$variables = {
  homeGymId: string;
  userId: string;
};
export type HomeQuery$data = {
  readonly gym: {
    readonly " $fragmentSpreads": FragmentRefs<"MyGymsFragment">;
  } | null | undefined;
  readonly gyms: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"MyGymsListFragment">;
  }> | null | undefined;
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"MyAccountFragment">;
  } | null | undefined;
};
export type HomeQuery = {
  response: HomeQuery$data;
  variables: HomeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "homeGymId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "homeGymId"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "streetAddress",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyAccountFragment"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Gym",
        "kind": "LinkedField",
        "name": "gym",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyGymsFragment"
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyGymsListFragment"
          }
        ],
        "storageKey": null
      }
    ],
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
    "name": "HomeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
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
              (v4/*: any*/),
              (v5/*: any*/)
            ],
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
                  (v6/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Gym",
        "kind": "LinkedField",
        "name": "gym",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v7/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenges",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              (v5/*: any*/)
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
          (v5/*: any*/),
          (v4/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0e4cfb5ce72c5f0993c4a27670d20ff0",
    "id": null,
    "metadata": {},
    "name": "HomeQuery",
    "operationKind": "query",
    "text": "query HomeQuery(\n  $userId: ID!\n  $homeGymId: ID!\n) {\n  user(id: $userId) {\n    ...MyAccountFragment\n    id\n  }\n  gym(id: $homeGymId) {\n    ...MyGymsFragment\n    id\n  }\n  gyms {\n    ...MyGymsListFragment\n    id\n  }\n}\n\nfragment MyAccountFragment on User {\n  name\n  email\n  homeGym {\n    city\n    id\n  }\n  entries {\n    submissionTime\n    challenge {\n      title\n      id\n    }\n    id\n  }\n}\n\nfragment MyGymsFragment on Gym {\n  city\n  country\n  id\n  state\n  streetAddress\n  challenges {\n    title\n    type\n    id\n  }\n}\n\nfragment MyGymsListFragment on Gym {\n  id\n  city\n  country\n  streetAddress\n}\n"
  }
};
})();

(node as any).hash = "c1f61d749701a36c9e194c67b6393d77";

export default node;
