/**
 * @generated SignedSource<<f99f57fa9a3c735d06332fbe00494132>>
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
  readonly gymId: string;
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
      "name": "gymId",
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

(node as any).hash = "efe210964ee2bde93933f2bcab375a87";

export default node;
