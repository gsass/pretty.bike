/*
* Routes for this app are all hash-based and all here
* All routes must have attributes `name` and `hash`
* Routes may also have a `label` which allows them to appear in the nav,
* and a `contentPath` to load associated markdown content for the page
*/
const routes = [
  { name: 'home',
    hash: '#',
    label: '🚲🦞',
    contentPath: 'home.md'},
  { name: 'ride_route',
    hash: '#route',
    label: 'Maps + Cue Sheet',
    contentPath: 'ride_route.md'},
  { name: 'packing-list',
    hash: '#packing',
    label: 'Packing List',
    contentPath: 'packing_list.md'},
  { name: 'mechanicals',
    hash: '#mechanicals',
    label: 'Mechanical Checklist',
    contentPath: 'mechanical_checklist.md'},
];

export default routes;