/* eslint-disable import/no-extraneous-dependencies */
import test from 'ava';
import getTypeTree from '../lib/getTypeTree';

test('getTypeTree supports primitive paths', (t) => {
  const primitivePaths = {
    name: {
      instance: 'String',
    },
    no: {
      instance: 'Number',
    },
  };

  const primitiveTree = {
    name: 'String',
    no: 'Float',
  };

  t.deepEqual(getTypeTree(primitivePaths), primitiveTree);
});

test('getTypeTree supports complex paths', (t) => {
  const complexPaths = {
    'location.instructions': {
      instance: 'String',
    },
    'location.placeId': {
      instance: 'ObjectID',
    },
    name: {
      instance: 'String',
    },
  };

  const complexTree = {
    name: 'String',
    location: {
      instructions: 'String',
      placeId: 'String',
    },
  };

  t.deepEqual(getTypeTree(complexPaths), complexTree);
});

test('getTypeTree supports primitive arrays', (t) => {
  const primitiveArray = {
    statuses: {
      instance: 'Array',
      caster: {
        instance: 'String',
      },
    },
  };

  const primitiveArrayTree = {
    statuses: ['String'],
  };

  t.deepEqual(getTypeTree(primitiveArray), primitiveArrayTree);
});

test('getTypeTree supports complex arrays', (t) => {
  const complexArray = {
    notes: {
      instance: 'Array',
      casterConstructor: {
        schema: {
          paths: {
            author: {
              instance: 'String',
            },
            message: {
              instance: 'String',
            },
          },
        },
      },
    },
  };

  const complexArrayTree = {
    notes: [{
      author: 'String',
      message: 'String',
    }],
  };

  t.deepEqual(getTypeTree(complexArray), complexArrayTree);
});

