export const groupTypes: any = {
  regular: { key: 'GROUP_TYPE_REGULAR', display: 'Regular Group or Room Chat' },
  watched: { key: 'GROUP_TYPE_WATCHED', display: 'Watched Group' },
  subscribed: { key: 'GROUP_TYPE_SUBSCRIBED', display: 'Subscribed Group' }
};

export function getGroupType(groupType) {
  return groupTypes[Object.keys(groupTypes).find(key => groupTypes[key].key === groupType)];
}
