/**
 * @generated SignedSource<<81355a45484c80c7871e0a5373ae68ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyAccountFragment$data = {
  readonly email: string;
  readonly entries: ReadonlyArray<{
    readonly challenge: {
      readonly gym: {
        readonly city: string;
        readonly streetAddress: string;
      };
      readonly title: string;
    };
    readonly data: any;
    readonly id: string;
    readonly submissionTime: string;
  }> | null | undefined;
  readonly homeGym: {
    readonly city: string;
    readonly country: string;
    readonly state: string | null | undefined;
    readonly streetAddress: string;
  };
  readonly name: string;
  readonly " $fragmentType": "MyAccountFragment";
};
export type MyAccountFragment$key = {
  readonly " $data"?: MyAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyAccountFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "streetAddress",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyAccountFragment",
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
        (v0/*: any*/),
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
          "name": "state",
          "storageKey": null
        },
        (v1/*: any*/)
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
          "name": "id",
          "storageKey": null
        },
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
          "kind": "ScalarField",
          "name": "data",
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
              "concreteType": "Gym",
              "kind": "LinkedField",
              "name": "gym",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "cf429b571ba86d9d24626e9a890f7eb4";

export default node;
