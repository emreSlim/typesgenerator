import { printType } from './dist/lib/index.js';

const o = {
  graph: {
    name: 'Career Path',
    title: 'Career Path: Software Engineer III',
    desc: '',
    properties: {
      starting_point: 'ITM316'
    },
    metadata: {
      function: ['Function1', 'Function2', 'Function3'],
      grades: ['A', 'B', 'C', 'D', 'E', 'F']
    },
    nodes: {
      ITM316: {
        header: 'Starting Role',
        color: '',
        backgroundColor: '#00ECFF',
        id: 'ITM316',
        name: 'Software Engineer III - ITM316',
        title: 'Software Engineer III - ITM316',
        description: '',
        type: 'Individual Contributor',
        grade: 'A',
        level: '',
        subFunction: 'Function1',
        sp2id: '',
        jobCode: 'ITM316',
        noOfEmployees: '102',
        noOfOpenPositions: '2'
      },

      ITM1421: {
        id: 'ITM1421',
        name: 'Software Engineering Manager IV – ITM1421',
        title: 'Software Engineering Manager IV – ITM1421',
        description: '',
        type: 'Individual Contributor',
        grade: 'F',
        level: '',
        subFunction: 'Function1',
        sp2id: '',
        jobCode: 'ITM1421',
        noOfEmployees: '18',
        noOfOpenPositions: '7'
      },

      ITZ0818: {
        id: 'ITZ0818',
        name: 'IT manager II – ITZ0818',
        title: 'IT manager II – ITZ0818',
        description: '',
        type: 'Individual Contributor',
        grade: 'C',
        level: '',
        subFunction: 'Function3',
        sp2id: '',
        jobCode: 'ITZ0818',
        noOfEmployees: '43',
        noOfOpenPositions: '6'
      }
    },
    edges: {
      ITM316_ITM317: {
        source: 'ITM316',
        target: 'ITM317',
        moveFitScore: '0.54',
        bestMove: true,
        moveType: 'NEXT_MOVE'
      },
      ITM317_ITM1418: {
        source: 'ITM317',
        target: 'ITM1418',
        moveFitScore: '0.54',
        bestMove: true,
        moveType: 'NEXT_MOVE'
      },
      ITM1418_ITM1419: {
        source: 'ITM1418',
        target: 'ITM1419',
        moveFitScore: '0.54',
        bestMove: true,
        moveType: 'NEXT_MOVE'
      },

      ITH0421_ITZ0821: {
        source: 'ITH0421',
        target: 'ITZ0821',
        moveFitScore: '0.54',
        bestMove: false,
        moveType: 'ADJACENT_MOVE'
      }
    }
  }
};

printType(o);
