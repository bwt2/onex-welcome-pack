/**
 * @generated SignedSource<<2a82b33ee2e38bc9d61e54ada2131eba>>
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
export type dashboardMutation$variables = {
  input: EntryInput;
};
export type dashboardMutation$data = {
  readonly createEntry: {
    readonly entryId: string;
  } | null | undefined;
};
export type dashboardMutation = {
  response: dashboardMutation$data;
  variables: dashboardMutation$variables;
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
        "name": "entryId",
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
    "name": "dashboardMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "dashboardMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fb826475cdbc3cd62a66456ba3bb0320",
    "id": null,
    "metadata": {},
    "name": "dashboardMutation",
    "operationKind": "mutation",
    "text": "mutation dashboardMutation(\n  $input: EntryInput!\n) {\n  createEntry(input: $input) {\n    entryId\n  }\n}\n"
  }
};
})();

(node as any).hash = "ae5734dd5c2b1ae8c84439dd6cd1c12d";

export default node;
