
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "AssignWidget": [
      "ChoiceAssignWidget",
      "CustomAssignWidget",
      "SearchAssignWidget",
      "SliderAssignWidget",
      "StringAssignWidget"
    ],
    "DependencyEdgeImplementationEdge": [
      "DependencyEdge",
      "ImplementationEdge"
    ],
    "Effect": [
      "CustomEffect",
      "MessageEffect"
    ],
    "NodeNodeInvalidNodeTemplateNode": [
      "InvalidNode",
      "NodeNode",
      "TemplateNode"
    ],
    "ReturnWidget": [
      "ChoiceReturnWidget",
      "CustomReturnWidget"
    ]
  }
};
      export default result;
    