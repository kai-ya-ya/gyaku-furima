// src/style.js
const theme = {
    main: {
        color: "red ",
        strong: 500,
        normal: 300,
        weak: 100,
    },
    sub: {
        color: "gray ",
        strong: 500,
        normal: 300,
        weak: 100,
    }

}

export const style = {
    field_input: "w-full p-2 mb-4 border border-gray-300 rounded ",
    field_err: "mb-4 p-2 rounded text-sm bg-red-100 text-red-700 ",
    btn_ok: "w-full bg-red-400 text-white p-2 mb-2 rounded hover:bg-red-500 cursor-pointer ",
    btn_other: "p-2 mb-2 rounded hover:bg-black/30 cursor-pointer ",
    win_popup: "max-w-xs mx-auto my-20 p-6 bg-white rounded-lg shadow-md ",
    win_title: "text-center mb-4 text-xl ",
    win_frame: "w-auto mx-4 my-2 p-2 bg-gray-100 rounded-lg shadow-md ",
    desc_tag: "text-blue-500 ",
    field_tag: "flex flex-wrap gap-1 mb-4 px-2 ",
    btn_tag: "bg-red-400 text-white px-3 py-1 rounded-2xl ",

    topbar: {
        dummy: "h-14 bg-gray-100/50 ",
        title: "text-center text-2xl font-bold text-white ",
        btn: "text-white px-4 py-2 rounded-2xl hover:bg-black/30 cursor-pointer ",
    },
    win: {
        flexbox: "flex flex-col flex-auto gap-y-4 bg-gray-100/50 p-4 ",
    },
    item: {
        title: "text-center text-xl font-bold text-red-400 ",
        btn: {
            ok: "bg-red-400 text-white px-4 py-2 rounded-2xl hover:bg-red-500 cursor-pointer ",
            other: "text-black px-4 py-2 rounded-2xl hover:bg-black/30 cursor-pointer ",
        },
        field: {
            input: "p-2 bg-white border-b-2 border-red-300/50 ",
            input_lg: "p-2 bg-white min-h-48 border-b-2 border-red-300/50 ",
            err: "p-2 rounded-2xl text-sm bg-red-100 text-red-700 ",
        },
        tag: {
            view: "bg-red-400 text-white px-3 py-1 rounded-full ",
            flexbox: "flex flex-row flex-none gap-2 flex-wrap"
        },
    },
    item_card: {
        grid: "grid"
    },
    text: {
        normal: "text-gray-800 overflow-hidden ",
        meta: "text-xs text-gray-500 overflow-hidden ",
    },
    
}