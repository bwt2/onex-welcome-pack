/**
 * @generated SignedSource<<91bc31263763d9e09dd36fedffe52a3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type EntryInput = {
  challengeId: string;
  data: any;
  submissionTime: string;
  userId: string;
};
export type NewEntryDialogMutation$variables = {
  input: EntryInput;
};
export type NewEntryDialogMutation$data = {
  readonly createEntry: {
    readonly id: string;
  } | null | undefined;
};
export type NewEntryDialogMutation = {
  response: NewEntryDialogMutation$data;
  variables: NewEntryDialogMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Entry",
    "kind": "LinkedField",
    "name": "createEntry",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewEntryDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewEntryDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7257e0dc6a7542bc2aba448ff154dfaa",
    "id": null,
    "metadata": {},
    "name": "NewEntryDialogMutation",
    "operationKind": "mutation",
    "text": "mutation NewEntryDialogMutation(\n  $input: EntryInput!\n) {\n  createEntry(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1dc1950fc19a3af8316a7216d38dcd6f";

export default node;
