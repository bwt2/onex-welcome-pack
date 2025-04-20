/**
 * @generated SignedSource<<07702296672347c34dd9e92304c6318a>>
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
    readonly title: string;
    readonly type: string;
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

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Gym",
  "abstractKey": null
};

(node as any).hash = "2a3e0c8286b622948ae387c319a64e82";

export default node;
