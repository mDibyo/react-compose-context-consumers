export function elementsWillChange(nextElements, currentElements) {
  if (nextElements.length !== currentElements.length) {
    return true;
  }

  for (let i = 0; i < currentElements.length; i+= 1) {
    if (nextElements[i] !== currentElements[i]) {
      return true;
    }
  }

  return false;

}
