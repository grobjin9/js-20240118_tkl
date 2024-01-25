/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  const collator = new Intl.Collator(["ru", "en"], { caseFirst: "upper" });

  const sortedArr = [...arr].sort((a, b) => collator.compare(a, b));

  if (param === "desc") {
    sortedArr.reverse();
  }

  return sortedArr;
}
