/**
 * @generated SignedSource<<35c19ebad604928ca562ad456da41e39>>
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
      readonly title: string;
    };
    readonly submissionTime: string;
  }> | null | undefined;
  readonly homeGym: {
    readonly city: string;
  };
  readonly name: string;
  readonly " $fragmentType": "MyAccountFragment";
};
export type MyAccountFragment$key = {
  readonly " $data"?: MyAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyAccountFragment">;
};

const node: ReaderFragment = {
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "city",
          "storageKey": null
        }
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
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

(node as any).hash = "dc62976c48df2c43b3403507a27a403b";

export default node;
