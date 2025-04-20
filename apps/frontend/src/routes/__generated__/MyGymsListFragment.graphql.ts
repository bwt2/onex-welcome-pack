/**
 * @generated SignedSource<<f86cbe645876320c850ce6e660a9e9b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyGymsListFragment$data = ReadonlyArray<{
  readonly city: string;
  readonly country: string;
  readonly id: string;
  readonly streetAddress: string;
  readonly " $fragmentType": "MyGymsListFragment";
}>;
export type MyGymsListFragment$key = ReadonlyArray<{
  readonly " $data"?: MyGymsListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyGymsListFragment">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "MyGymsListFragment",
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "streetAddress",
      "storageKey": null
    }
  ],
  "type": "Gym",
  "abstractKey": null
};

(node as any).hash = "3ab141652e1b42bbd9630123904f6785";

export default node;
