// TopPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import TopBar from './TopBar';
import { useUser } from './contexts/UserContext';
import { Loading } from "./Loading";
import { text as t } from './text';
import { style as s } from './style';
import { route as r } from './route';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { timeAgo } from './utils/timeAgo';
import ItemCard from './ItemCard';

function TopPage() {
    const { userData, loading, error } = useUser();
    const [items, setItems] = useState([]);
    const [itemsLoadingg, setItemsLoading] = useState(true);
    const [itemsError, setItemsError] = useState(null);

    useEffect(() => {
        const fetchitems = async () => {
            setItemsLoading(true);
            setItemsError(null);
            try {
                const q = query(
                    collection(db, 'items'),
                    orderBy('dt_upload', 'desc'),
                    limit(100)
                );

                const querySnapshot = await getDocs(q);
                const itemsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setItems(itemsList);
            } catch (err) {
                console.error("商品データの取得中にエラーが発生しました:", err);
                setItemsError(err);
            } finally {
                setItemsLoading(false);
            }
        }; fetchitems();
    }, []);


    if (loading) {
        return <Loading />;
    }

    return (
        <div className="">
            <TopBar />
            <main className={s.win.flexbox}>
                <p className={s.item.title}>{t.pages.toppage.latest}</p>
                {items.length === 0 ? (
                    <p className="text-center text-gray-600">{t.pages.toppage.no_items_found}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {items.map(item => (
                            <ItemCard item={item} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default TopPage