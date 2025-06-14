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
        };fetchitems();
    }, []);


    if (loading) {
        return <Loading />;
    }

    return (
        <div className="">
            <TopBar />
            <main className={s.win_frame}>
                <p className={s.win_title}>{t.pages.toppage.latest}</p>
                {items.length === 0 ? (
                    <p className="text-center text-gray-600">t.pages.toppage.no_items_found</p>
                    ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {items.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.desc}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                            {/* {item.tags && item.tags.map(tag => (
                                <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{tag}</span>
                            ))} */}
                            </div>
                            <p className="text-xl font-bold text-gray-900">¥{item.price.toLocaleString()}</p>
                            <p className="text-xs text-gray-500 mt-1">出品者: {item.username_seller || '不明'}</p>
                            <p className="text-xs text-gray-500 mt-1">{timeAgo(item.dt_upload)}</p>
                        </div>
                        ))}
                    </div>
                    )}
            </main>
        </div>
    );
}

export default TopPage