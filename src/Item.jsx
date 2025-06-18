import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import TopBar from './TopBar';
import { useUser } from './contexts/UserContext';
import { Loading } from "./Loading";
import { text as t } from './text';
import { style as s } from './style';
import { route as r } from './route';
import { collection, query, orderBy, limit, getDoc, doc } from 'firebase/firestore';
import { timeAgo } from './utils/timeAgo';
import ItemCard from './ItemCard'; // このコンポーネントはここでは直接使われていませんが、インポートは残します
import { useSearchParams } from 'react-router-dom';

export default function Item() {
    const { userData, loading, error } = useUser();
    const [item, setItem] = useState(null);
    const [itemsLoading, setItemsLoading] = useState(true); // 変数名を修正: itemsLoadingg -> itemsLoading
    const [itemsError, setItemsError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const itemid = searchParams.get('id'); // URLから商品IDを取得

    useEffect(() => {
        // itemid が存在しない場合は何もしない (URLにidがない場合)
        if (!itemid) {
            setItemsLoading(false);
            setItemsError(new Error("商品IDがURLに指定されていません。"));
            return;
        }

        const fetchItem = async () => { // 関数名を fetchItem に変更
            setItemsLoading(true);
            setItemsError(null);
            try {
                const itemDocRef = doc(db, "items", itemid);
                const itemDocSnap = await getDoc(itemDocRef);
        
                if (itemDocSnap.exists()) {
                    // ★★★ ここを修正 ★★★
                    // ドキュメントID (itemid) とドキュメントのデータを結合してセット
                    setItem({ id: itemDocSnap.id, ...itemDocSnap.data() });
                    console.log("Item Found:", itemDocSnap.id, itemDocSnap.data());
                } else {
                    console.log("No Item Found for ID:", itemid); // IDを明確に表示
                    setItem(null);
                }
            } catch (err) {
                console.error("Error fetching item data:", err); // エラーメッセージを Item に関連付ける
                setItemsError(err);
            } finally {
                setItemsLoading(false);
            }
        };

        fetchItem();
    }, [itemid]); // ★★★ 依存配列に itemid を追加 ★★★
    // itemid が変更されたら再度データフェッチを実行する

    // ローディング中またはエラー表示
    if (itemsLoading) { // itemsLoading を使用
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
    if (!item) { // item が null の場合（商品が見つからなかった場合など）
        return (
            <div>
                <TopBar />
                <main className={s.win.flexbox}>
                    <div className={s.item.title}>{t.item.not_found}</div> {/* 商品が見つからない場合の表示 */}
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

    return(
        <div>
            <TopBar />
            <main className={s.win.flexbox}>
                {/* ★★★ item.id に安全にアクセスできるようになりました ★★★ */}
                <div className={s.item.title}>{item.name || t.item.no_name}</div> {/* 通常は商品名を表示 */}
                <div>
                    <img src={item.imageUrl || "https://dummyimage.com/320x320/eee/aaa.png&text=No+Image"} alt={item.name} className="w-full h-auto object-cover" />
                </div>
                <div className={s.text.normal}>価格: ¥{item.price || "???"}</div>
                <div className={s.text.normal}>商品説明: {item.desc || t.item.no_desc}</div>
                {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div className={s.item.tag.flexbox}>
                        {item.tags.map(tag => (
                            <span key={tag} className={s.item.tag.view_2xs}>{tag}</span>
                        ))}
                    </div>
                )}
                <div className={s.text.meta}>出品者: {item.username_seller || t.item.unk_seller}</div>
                <div className={s.text.meta}>出品日時: {timeAgo(item.dt_upload)}</div>
                {/* 必要に応じて他の詳細情報をここに追加 */}
            </main>
        </div>
    )
}