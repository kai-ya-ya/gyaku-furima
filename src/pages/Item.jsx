import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDoc,
  doc,
} from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { TopBar, Loading } from "@components";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";

export default function Item() {
  const { userData, loading, error } = useContext(UserContext);
  const [item, setItem] = useState(null);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemid = searchParams.get("id");
  const navigate = useNavigate();

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

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    navigate(`${r.search}?q=${encodeURIComponent(tag)}`);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-stretch gap-2 p-2 bg-white h-auto">
          <div className="col-span-2 md:col-span-1 w-full aspect-square">
            <img
              src={item.imageUrl || img.thumb_default}
              alt={item.name}
              className="w-full object-cover"
            />
          </div>
          <div className="col-span-1 flex flex-col w-full gap-2 overflow-y-scroll">
            <div className="p-2 text-justify break-words">{item.desc}</div>
          </div>
          <div className="col-span-2 flex flex-col justify-start gap-2">
            <div className="text-lg font-semibold truncate flex-none">
              {item.name || "No Title"}
            </div>
            <div className={s.text.meta}>
              {t.item_card.username_seller}:{" "}
              {item.username_seller || t.item_card.unk_seller},{" "}
              {timeAgo(item.dt_upload)}
            </div>
          </div>
          <div className="col-span-2 flex flex-col w-full overflow-hidden gap-2">
            <div className={s.item.tag.xs.flexbox}>
              {Array.isArray(item.tags) && item.tags.length > 0 ? (
                item.tags.map((tag) => (
                  <button
                    key={tag}
                    className={s.item.tag.view}
                    onClick={(e) => {
                      handleTagClick(e, tag);
                    }}
                  >
                    {tag}
                  </button>
                ))
              ) : (
                <span className={s.text.meta}>タグなし</span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
