import { printType } from './dist/lib/index.js';

const o = {
  "jobCode": "ITPM04",
  "vertices": [
    {
      "nextBestMove": {
        "fitScore": 0.2621,
        "id": "ITPM10",
        "name": "Product Marketing Manager III"
      },
      "id": "ITPM03",
      "jobCode": "ITPM03",
      "name": "Marketing - General - Functional Manager of Managers II",
      "title": null,
      "description": "sample description",
      "function": "IT & Technology",
      "subFunction": "Product Management",
      "grade": "18",
      "level": "Mid Level Manager",
      "isExecutive": false,
      "noofEmployees": 0,
      "noofPositions": 0
    },
    {
      "nextBestMove": {
        "fitScore": 0.4731,
        "id": "ITUX03",
        "name": "User Experience (UX) Manager III"
      },
      "id": "ITPM10",
      "jobCode": "ITPM10",
      "name": "Product Marketing Manager III",
      "title": null,
      "description": "sample description",
      "function": "IT & Technology",
      "subFunction": "Product Management",
      "grade": "18",
      "level": "Individual Contributor",
      "isExecutive": false,
      "noofEmployees": 0,
      "noofPositions": 0
    },
    {
      "nextBestMove": {
        "fitScore": 0.7231,
        "id": "ITPM03",
        "name": "Marketing - General - Functional Manager of Managers II"
      },
      "id": "ITPM04",
      "jobCode": "ITPM04",
      "name": "Marketing - General - Functional Manager of Managers II",
      "title": null,
      "description": "sample description",
      "function": "IT & Technology",
      "subFunction": "Product Management",
      "grade": "18",
      "level": "Mid Level Manager",
      "isExecutive": false,
      "noofEmployees": 0,
      "noofPositions": 0
    },
    {
      "nextBestMove": null,
      "id": "ITUX03",
      "jobCode": "ITUX03",
      "name": "User Experience (UX) Manager III",
      "title": null,
      "description": "sample description",
      "function": "IT & Technology",
      "subFunction": "User Experience Design",
      "grade": "19",
      "level": "Front Line Manager",
      "isExecutive": false,
      "noofEmployees": 0,
      "noofPositions": 0
    }
  ],
  "edges": [
    {
      "compScore": 0.4731,
      "transitionProbability": 0.00028548,
      "id": "ITPM10_ITUX03",
      "source": "ITPM10",
      "target": "ITUX03"
    },
    {
      "compScore": 0.7231,
      "transitionProbability": 1.0,
      "id": "ITPM04_ITPM03",
      "source": "ITPM04",
      "target": "ITPM03"
    },
    {
      "compScore": 0.2621,
      "transitionProbability": 0.10670205999999999,
      "id": "ITPM04_ITPM10",
      "source": "ITPM04",
      "target": "ITPM10"
    },
    {
      "compScore": 0.2621,
      "transitionProbability": 0.10670205999999999,
      "id": "ITPM03_ITPM10",
      "source": "ITPM03",
      "target": "ITPM10"
    }
  ],
  "organizationId": "30",
  "metadata": {
    "functions": ["IT & Technology"],
    "subFunctions": ["Product Management", "User Experience Design"],
    "levels": [
      "Front Line Manager",
      "Individual Contributor",
      "Mid Level Manager"
    ],
    "grades": ["18", "19"]
  }
}



printType(o, 'NG');
