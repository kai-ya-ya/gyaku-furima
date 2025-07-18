import { Timestamp } from "firebase/firestore";

export default {
  hashtag_regex: /(#\S+?)(?=#|\s|$)/g,
  thumb_def_size: 640,
  thumb_def_type: "image/jpeg",
  thumb_def_quality: 0.8,
};

const operations = [
  {
    category: "operation",
    id: "0",
    data: {
      itemInfo: {
        name: "+",
        desc: "足します",
      },
    },
  },
  {
    category: "operation",
    id: "1",
    data: {
      itemInfo: {
        name: "-",
        desc: "引きます",
      },
    },
  },
  {
    category: "operation",
    id: "2",
    data: {
      itemInfo: {
        name: "×",
        desc: "掛けます",
      },
    },
  },
  {
    category: "operation",
    id: "3",
    data: {
      itemInfo: {
        name: "÷",
        desc: "割ります",
      },
    },
  },
  {
    category: "operation",
    id: "4",
    data: {
      itemInfo: {
        name: "=",
        desc: "等しくなります",
      },
    },
  },
  {
    category: "operation",
    id: "5",
    data: {
      itemInfo: {
        name: "(",
        desc: "左側です",
      },
    },
  },
  {
    category: "operation",
    id: "6",
    data: {
      itemInfo: {
        name: ")",
        desc: "右側です",
      },
    },
  },
];
const terms_test = [
  {
    category: "term",
    id: "0",
    data: {
      itemInfo: {
        type: "pains",
        name: "掃除中吸引力がすぐに落ちる",
        desc: "掃除機を使ってて、ゴミがたまるにつれて吸引力が落ちるのが嫌",
      },
      uploadInfo: {
        userId: "てすと",
        createdAt: Timestamp.fromDate(new Date("2025-07-16T10:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "1",
    data: {
      itemInfo: {
        type: "pains",
        name: "掃除機のコードに引っかかる",
        desc: "ちょっと方向変えるだけで掃除機のコードに引っかかるのどうにかしてほしい",
      },
      uploadInfo: {
        userId: "b",
        createdAt: Timestamp.fromDate(new Date("2025-07-14T10:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "2",
    data: {
      itemInfo: {
        type: "needs",
        name: "掃除をストレスなくやりたい",
        desc: "部屋はきれいになっても心はストレスであふれそうです",
      },
      uploadInfo: {
        userId: "c",
        createdAt: Timestamp.fromDate(new Date("2025-07-12T10:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "3",
    data: {
      itemInfo: {
        type: "wants",
        name: "吸引力が持続するコードレス掃除機が欲しい",
        desc: "あるといいですよね",
      },
      uploadInfo: {
        userId: "d",
        createdAt: Timestamp.fromDate(new Date("2025-07-17T04:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "4",
    data: {
      itemInfo: {
        type: "seeds",
        name: "サイクロン技術",
        desc: "遠心力を利用してゴミと空気を分離する仕組みです",
      },
      uploadInfo: {
        userId: "e",
        createdAt: Timestamp.fromDate(new Date("2025-07-12T02:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "5",
    data: {
      itemInfo: {
        type: "seeds",
        name: "小型高出力モーター",
        desc: "ちっちゃいけどパワフルなモーターです",
      },
      uploadInfo: {
        userId: "f",
        createdAt: Timestamp.fromDate(new Date("2025-07-13T10:00:00Z")),
      },
    },
  },
  {
    category: "term",
    id: "6",
    data: {
      itemInfo: {
        type: "ideas",
        name: "コードレスクリーナー",
        desc: "サイクロン技術と小型モーター技術を用いた次世代の掃除機です。コードレスを実現しつつパワフルで持続する吸引力を提供します。",
      },
      uploadInfo: {
        userId: "g",
        createdAt: Timestamp.fromDate(new Date("2025-07-17T11:00:00Z")),
      },
    },
  },
];
const formulas_test = [
  {
    category: "fomula",
    id: "0",
    data: {
      itemInfo: {
        name: "次世代掃除機",
        desc: "コードレスを実現しつつ吸引力持続ほしい",
      },
      formulaInfo: [terms_test[0], operations[0], terms_test[1], operations[4], terms_test[3]],
      uploadInfo: {
        userId: "h",
        createdAt: Timestamp.fromDate(new Date("2025-07-17T13:00:00Z")),
      },
    },
  },
  {
    category: "fomula",
    id: "1",
    data: {
      itemInfo: {
        name: "次世代掃除機",
        desc: "サイクロン技術と小型高出力モーターで実現します",
      },
      formulaInfo: [
        terms_test[3],
        operations[0],
        operations[5],
        terms_test[4],
        operations[0],
        terms_test[5],
        operations[6],
        operations[4],
        terms_test[6],
      ],
      uploadInfo: {
        userId: "h",
        createdAt: Timestamp.fromDate(new Date("2025-07-17T14:00:00Z")),
      },
    },
  },
];
export { operations, terms_test, formulas_test };
