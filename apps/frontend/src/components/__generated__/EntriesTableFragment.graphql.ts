/**
 * @generated SignedSource<<d060a6ace335278250f13db809b1a107>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EntriesTableFragment$data = {
  readonly entries: ReadonlyArray<{
    readonly data: any;
    readonly id: string;
    readonly submissionTime: string;
    readonly user: {
      readonly name: string;
    };
  }> | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "EntriesTableFragment";
};
export type EntriesTableFragment$key = {
  readonly " $data"?: EntriesTableFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EntriesTableFragment">;
};

import EntriesTableRefetchQuery_graphql from './EntriesTableRefetchQuery.graphql';

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
      "operation": EntriesTableRefetchQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "EntriesTableFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Entry",
      "kind": "LinkedField",
      "name": "entries",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "Challenge",
  "abstractKey": null
};
})();

(node as any).hash = "18184ec16e0aac83ce016c10623f6fcc";

export default node;
