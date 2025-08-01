export default {
  topbar: {
    dummy: `h-14 bg-gray-100/50 `,
    title: `text-center text-2xl font-bold`,
    btn: `text-black hover:border-black/50 border-black/0 border-b-2 cursor-pointer `,
    field: {
      input: `py-2 bg-white border-black/50 border-b-2 text-black h-8`,
    },
  },
  win: {
    flexbox: `flex flex-col flex-auto gap-y-4 bg-gray-100/50 p-4 items-center`,
  },
  item: {
    title: `text-center text-xl font-bold text-black `,
    title_gray: `text-center text-xl font-bold text-gray-400 `,
    btn: {
      ok: `bg-white text-black px-4 py-2 hover:bg-red-500 cursor-pointer w-full`,
      other: `text-black px-4 py-2 hover:bg-white/30 cursor-pointer w-full`,
      like: {
        yes: `aspect-square text-xl bg-yellow-400 text-black text-center overflow-hidden border-none border-red-300 `,
        no: `aspect-square text-xl bg-white text-black text-center overflow-hidden border-none border-red-300 `,
      },
    },
    field: {
      input: `p-2 bg-white border-b-2 border-b-black/50 w-full `,
      input_lg: `p-2 bg-white w-full border-b-2 border-b-2 border-b-black/50 overflow-y-scroll `,
      err: `p-2 rounded-2xl text-sm bg-red-100 text-red-700 `,
    },
    tag: {
      view: `bg-white text-black px-3 py-1 rounded-full truncate `,
      flexbox: `flex flex-row flex-none gap-2 flex-wrap overflow-x-scroll items-start `,
      xs: {
        view: `text-xs bg-white text-black px-2 py-0.5 rounded-full truncate mx-0.5`,
        flexbox: `flex flex-row flex-none gap-1 flex-wrap overflow-x-scroll`,
      },
    },
    message: {
      user: {
        view: `bg-white text-black px-4 py-1 rounded-2xl order-last break-all`,
      },
      system: {
        view: `bg-white text-black px-4 py-1 rounded-2xl order-first break-all`,
      },
    },
    hashtag: "text-blue-600 font-semibold",
  },
  item_card: {
    grid: `grid`,
  },
  text: {
    normal: `text-gray-800 overflow-hidden truncate `,
    meta: `text-xs text-gray-500 overflow-hidden truncate `,
  },
  term: {
    needs: {
      text: "bg-green-400/50 px-0",
      tag: "px-2 text-center font-bold border-2 border-green-400 text-xs rounded-full text-green-400",
      name: "ニーズ",
    },
    wants: {
      text: "bg-orange-400/50 px-0",
      tag: "px-2 text-center font-bold border-2 border-orange-400 text-xs rounded-full text-orange-400",
      name: "ウォンツ",
    },
    pains: {
      text: "bg-purple-400/50 px-0",
      tag: "px-2 text-center font-bold border-2 border-purple-400 text-xs rounded-full text-purple-400",
      name: "ペインポイント",
    },
    seeds: {
      text: "bg-sky-400/50 px-0",
      tag: "px-2 text-center font-bold border-2 border-sky-400 text-xs rounded-full text-sky-400",
      name: "シーズ",
    },
    ideas: {
      text: "bg-yellow-400/50 px-0",
      tag: "px-2 text-center font-bold border-2 border-yellow-400 text-xs rounded-full text-yellow-400",
      name: "アイデア",
    },
  },
  variables: {
    text: "bg-yellow-400/50 px-0",
    tag: "px-2 text-center font-bold border-2 border-black-400 text-xs rounded-full text-black-400",
    name: "変数",
  },
};

const theme = {
  main: {
    color: `red`,
    strong: 500,
    normal: 300,
    weak: 100,
  },
  sub: {
    color: `gray`,
    strong: 500,
    normal: 300,
    weak: 100,
  },
};
