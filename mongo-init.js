db = db.getSiblingDB('pipelite');

db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [{ role: 'readWrite', db: 'pipelite' }],
});
