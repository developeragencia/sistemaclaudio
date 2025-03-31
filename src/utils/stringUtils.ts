
/**
 * Extracts the initials from a name
 * @param name The full name
 * @returns The first two initials of the name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
