export default function isTextMatched(tag, match) {
  if (tag !== undefined && match !== '')
    return tag.toLocaleLowerCase() === match.toLocaleLowerCase();
  return false;
}
