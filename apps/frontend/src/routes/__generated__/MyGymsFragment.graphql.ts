/**
 * @generated SignedSource<<744204bf25804d13c01f35957c003ad5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyGymsFragment$data = {
  readonly challenges: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly type: string;
    readonly " $fragmentSpreads": FragmentRefs<"EntriesTableFragment">;
  }> | null | undefined;
  readonly city: string;
  readonly country: string;
  readonly id: string;
  readonly state: string | null | undefined;
  readonly streetAddress: string;
  readonly " $fragmentType": "MyGymsFragment";
};
export type MyGymsFragment$key = {
  readonly " $data"?: MyGymsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyGymsFragment">;
};

import MyGymsRefetchQuery_graphql from './MyGymsRefetchQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": MyGymsRefetchQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "MyGymsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "city",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "country",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "streetAddress",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Challenge",
      "kind": "LinkedField",
      "name": "challenges",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "EntriesTableFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Gym",
  "abstractKey": null
};
})();

(node as any).hash = "ed577a8d66f57cfa7c2b7547dd3d7e96";

export default node;
