export function getFullName({ firstName, lastName }) {
  let fullName = [];
  if (!!firstName) {
    fullName.push(firstName);
  }
  if (!!lastName) {
    fullName.push(lastName);
  }
  return fullName.join(' ');
}
