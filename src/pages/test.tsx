import { useEffect } from "react";
import lodash from "lodash";
import { checkObjectHasField } from "~/helpers/queryObject";

function processUpdatedDoc<
  TDoc extends { id: string } & Record<string, unknown>,
>(input: { original: TDoc; updated: TDoc }) {
  const changedFields: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input.original)) {
    if (key === "id") {
      continue;
    }
    const updatedValue = input.updated[key];
    const isEqual = lodash.isEqual(value, updatedValue);
    if (isEqual) {
      continue;
    }
    changedFields[key] = updatedValue;
  }

  const isChange = checkObjectHasField(changedFields);
  if (!isChange) {
    return null;
  }

  const docWithChangedFields = {
    id: input.original.id,
    ...changedFields,
  };

  return docWithChangedFields;
}

const objA = {
  id: "1",
  a: "a",
  theSame: "the same",
  text: "yo",
  image: {
    position: {
      y: 5,
      x: 5,
    },
  },
};
const objB = {
  id: "2",
  a: "a",
  theSame: "the same",
  text: "update",
  image: {
    position: {
      y: 5,
      x: 7,
    },
  },
};

export default function Test() {
  // const diff = jsondiffpatch.diff(objA, objB);
  // console.log("diff:", diff);

  // clone country, using dateReviver for Date objects

  // make some changes
  useEffect(() => {
    const delta = processUpdatedDoc({ original: objA, updated: objB });
    console.log("delta:", delta);
  }, []);

  return <div>Test</div>;
}
