export const text = {
    pages: {
        sell: {
            title: `出品する`,
        },
        topbar: {
            title: `逆フリマ`,
            desc: `フリマアプリとは逆に、あなたの想像する欲しい架空の商品を出品するサイトです`,
        },
        home: {
            title: `逆フリマ`,
            desc: `フリマアプリとは逆に、あなたの想像する欲しい架空の商品を出品するサイトです`,
        },
        sell: {
            title: `出品する`,
            name: `商品の名前`,
            desc: `商品の説明`,
            tag: `カテゴリタグ`,
            price: `価格`,
            upload: `出品`,
        },
        mypage: {
            title: `マイページ`,
            go_signout: `ログアウト`,
        },
        toppage: {
            title: `トップページ`,
            latest: `新着商品`,
        },
        aboutme: {
            title: `このサイトについて`,
        },
        signin: {
            title: `ログイン`,
            go_signin: `ログイン`,
            go_signup: `新規登録`,
        },
        signup: {
            title: `新規会員登録`,
            go_signup: `登録`,
        },
    },
    item: {
        name: `商品名`,
        desc: `商品説明`,
        category: `カテゴリ`,
        feature: `特徴`,
    },
    userdata: {
        uid: `ユーザーID`,
        username: `ユーザー名`,
        email: `メールアドレス`,
        password: `パスワード`,
    },
    item_card: {
        username_seller: `出品者`,
        unk_seller: `不明`,
    },
    msg: {
        sell: {
            success: `出品が完了しました`,
            not_found: `未記入の項目があります`,
            unk_err: `出品に失敗しました`,
        },
        comment: {
            success: `コメントを投稿しました`,
            not_found: `コメントが未記入です`,
            unk_err: `投稿に失敗しました`,
        },
        like: {
            success: `いいねしました`,
            unk_err: `いいねに失敗しました`,
        },
        sign_up: {
            success: `アカウントを作成しました`,
            email_exists: `そのメールアドレスはすでに使用されています`,
            invalid_username: `ユーザー名の形式が正しくありません`,
            invalid_email: `メールアドレスの形式が正しくありません`,
            invalid_password: `パスワードの形式が正しくありません`,
            unk_err: `アカウント作成に失敗しました`,
        },
        sign_out: {
            success: `ログアウトしました`,
            unk_err: `ログアウトに失敗しました`,
        },
    },
    url: {
        thumb_default: "https://firebasestorage.googleapis.com/v0/b/gyaku-furima.firebasestorage.app/o/thumb.png?alt=media&token=0f7b6830-1f65-4c39-9e4e-52801c486263",
    }
};

export const route = {
    root: `/`,
    toppage: `/top`,
    signin: `/signin`,
    signup: `/signup`,
    mypage: `/mypage`,
    item: `/item`,
    search: `/search`,
    sell: `/sell`,
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

export const style = {
    topbar: {
        dummy: `h-14 bg-gray-100/50 `,
        title: `text-center text-2xl font-bold text-white `,
        btn: `text-white px-4 py-2 rounded-2xl hover:bg-black/30 cursor-pointer `,
    },
    win: {
        flexbox: `flex flex-col flex-auto gap-y-4 bg-gray-100/50 p-4 `,
    },
    item: {
        title: `text-center text-xl font-bold text-red-400 `,
        btn: {
            ok: `bg-red-400 text-white px-4 py-2 rounded-2xl hover:bg-red-500 cursor-pointer `,
            other: `text-black px-4 py-2 rounded-2xl hover:bg-black/30 cursor-pointer `,
            like: {
                yes: `aspect-square rounded-full text-xl bg-red-400 text-white text-center overflow-hidden border-none border-red-300 `,
                no: `aspect-square rounded-full text-xl bg-white text-red-400 text-center overflow-hidden border-none border-red-300 `,
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