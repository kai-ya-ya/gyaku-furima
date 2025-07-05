import React, { useState, useEffect, useContext } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Page, Frame, Loading, ItemCard } from "@components";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function Search() {
  const { userData, loading, error } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [likes, setLikes] = useState({});
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchWord = searchParams.get("q");

  useEffect(() => {
    const fetchitems = async () => {
      setItemsLoading(true);
      setItemsError(null);
      try {
        const q = query(
          collection(db, "items"),
          where("tags", "array-contains", searchWord),
          orderBy("dt_upload", "desc"),
          limit(100)
        );

        const querySnapshot = await getDocs(q);
        const itemsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          likeCount: Number(doc.data().likeCount) || 0,
        }));
        setItems(itemsList);
      } catch (err) {
        console.error("商品データの取得中にエラーが発生しました:", err);
        setItemsError(err);
      } finally {
        setItemsLoading(false);
      }
    };
    fetchitems();
  }, []);

  return (
    <Page>
      <Frame title={`${searchWord}の検索結果`}>
        {items.length === 0 ? (
          <p className="text-center text-gray-600">
            {t.pages.toppage.no_items_found}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                liked={userData?.likedItemIds?.has(item.id) || false}
              />
            ))}
          </div>
        )}
      </Frame>
    </Page>
  );
}
