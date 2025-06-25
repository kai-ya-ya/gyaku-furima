export default {
    topbar: {
        dummy: `h-14 bg-gray-100/50 `,
        title: `text-center text-2xl font-bold text-white`,
        btn: `text-white px-4 py-1 hover:border-white/50 border-white/0 border-b-2 cursor-pointer`,
        field: {
            input: `py-2 bg-red-400 border-white/50 border-b-2 text-white h-8`,
        }
    },
    win: {
        flexbox: `flex flex-col flex-auto gap-y-4 bg-gray-100/50 p-4`,
    },
    item: {
        title: `text-center text-xl font-bold text-red-400 `,
        btn: {
            ok: `bg-red-400 text-white px-4 py-2 hover:bg-red-500 cursor-pointer `,
            other: `text-black px-4 py-2 hover:bg-black/30 cursor-pointer `,
            like: {
                yes: `aspect-square text-xl bg-yellow-400 text-white text-center overflow-hidden border-none border-red-300 `,
                no: `aspect-square text-xl bg-white text-red-400 text-center overflow-hidden border-none border-red-300 `,
            },
        },
        field: {
            input: `p-2 bg-white border-b-2 border-red-300/50 `,
            input_lg: `p-2 bg-white min-h-48 border-b-2 border-red-300/50 `,
            err: `p-2 rounded-2xl text-sm bg-red-100 text-red-700 `,
        },
        tag: {
            view: `bg-red-400 text-white px-3 py-1 rounded-full truncate `,
            flexbox: `flex flex-row flex-none gap-2 flex-wrap overflow-hidden items-start `,
            xs: {
                view: `text-xs bg-red-400 text-white px-2 py-0.5 rounded-full truncate mx-0.5`,
                flexbox: `flex flex-row flex-none gap-1 flex-wrap overflow-hidden`,
            },
        },
    },
    item_card: {
        grid: `grid`
    },
    text: {
        normal: `text-gray-800 overflow-hidden truncate `,
        meta: `text-xs text-gray-500 overflow-hidden truncate `,
    },
    
}

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
    }
}