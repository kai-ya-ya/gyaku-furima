import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import TopBar from './TopBar';
import { useUser } from './contexts/UserContext';
import { Loading } from "./Loading";
import { text as t, style as s, route as r } from './res';
import { collection, query, orderBy, limit, getDoc, doc } from 'firebase/firestore';
import { timeAgo } from './utils/timeAgo';
import { useSearchParams } from 'react-router-dom';

export default function Item() {
    const { userData, loading, error } = useUser();
    const [item, setItem] = useState(null);
    const [itemsLoading, setItemsLoading] = useState(true);
    const [itemsError, setItemsError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const itemid = searchParams.get('id');

    useEffect(() => {
        if (!itemid) {
            setItemsLoading(false);
            setItemsError(new Error("商品IDがURLに指定されていません。"));
            return;
        }

        const fetchItem = async () => {
            setItemsLoading(true);
            setItemsError(null);
            try {
                const itemDocRef = doc(db, "items", itemid);
                const itemDocSnap = await getDoc(itemDocRef);

                if (itemDocSnap.exists()) {
                    setItem({ id: itemDocSnap.id, ...itemDocSnap.data() });
                } else {
                    setItem(null);
                }
            } catch (err) {
                setItemsError(err);
            } finally {
                setItemsLoading(false);
            }
        };

        fetchItem();
    }, [itemid]);

    if (itemsLoading) {
        return <Loading />;
    }
    if (itemsError) {
        return (
            <div>
                <TopBar />
                <main className={s.win.flexbox}>
                    <div className={s.item.title}>エラー: {itemsError.message}</div>
                    <p>商品情報の取得に失敗しました。URLを確認してください。</p>
                </main>
            </div>
        );
    }
    if (!item) {
        return (
            <div>
                <TopBar />
                <main className={s.win.flexbox}>
                    <div className={s.item.title}>{t.item.not_found}</div>
                    <p>指定された商品は見つかりませんでした。</p>
                </main>
            </div>
        );
    }

    // ★ userData のローディングと存在チェックは、
    // 商品表示の必須条件であれば残すか、別の useEffect で管理する
    // 今回は商品詳細表示自体は userData に依存しない可能性があるので、
    // 上の if (loading || !userData) を一旦コメントアウトして確認しても良い
    // if (loading || !userData) {
    //     return <Loading />;
    // }

    return (
        <div>
            <TopBar />
            <main className={s.win.flexbox}>
                <div className="grid grid-cols-2 justify-items-stretch gap-2 p-2 bg-white rounded-2xl h-auto">
                    <div className="">
                        <img src={item.imageUrl || "https://dummyimage.com/320x320/eee/aaa.png&text=Not+Found"} alt={item.name} className="w-full" />
                    </div>
                    <div className="flex flex-col w-full aspect-square overflow-hidden gap-2">
                        <div className="p-2 text-justify">{item.desc}</div>
                    </div>
                    <div className="col-span-2 flex flex-col justify-start gap-2">
                        <div className="text-lg font-semibold truncate flex-none">{item.name || "No Title"}</div>
                        <div className={s.text.meta}>{t.item_card.username_seller}: {item.username_seller || t.item_card.unk_seller}, {timeAgo(item.dt_upload)}</div>
                    </div>
                    <div className="col-span-2 flex flex-col w-full overflow-hidden gap-2">
                        <div className={s.item.tag.xs.flexbox}>
                            {Array.isArray(item.tags) && item.tags.length > 0 ? (
                                item.tags.map(tag => (
                                    <button key={tag} className={s.item.tag.view}>{tag}</button>
                                ))
                            ) : (
                                <span className={s.text.meta}>タグなし</span>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}