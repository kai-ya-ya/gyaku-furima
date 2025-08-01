import React, { useState, useEffect, useContext } from "react";
import { collection, query, orderBy, limit, getDoc, doc, where, getDocs } from "firebase/firestore";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Page, Frame, Loading, TagList, ItemList, Swipe } from "@components";
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
  const [items, setItems] = useState(null);

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

  useEffect(() => {
    const fetchitems = async () => {
      setItemsLoading(true);
      setItemsError(null);
      try {
        const q = query(
          collection(db, "items"),
          where("tags", "array-contains", item.tags[0]),
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
    if (item && item.tags && item.tags.length !== 0) fetchitems();
  }, [item]);

  // useEffect(() => {
  //   console.log(itemsLoading);
  // }, [itemsLoading]);

  if (itemsError) {
    return (
      <Page>
        <div className={s.win.flexbox}>
          <div className={s.item.title}>エラー: {itemsError.message}</div>
          <p>商品情報の取得に失敗しました。URLを確認してください。</p>
        </div>
      </Page>
    );
  }
  if (!itemsLoading && !item) {
    return (
      <Page>
        <div className={s.win.flexbox}>
          <div className={s.item.title}>{t.item.not_found}</div>
          <p>指定された商品は見つかりませんでした。</p>
        </div>
      </Page>
    );
  }

  const handleLikeClick = async (event) => {}
  //   event.stopPropagation();

  //   if (!userData || !userData.uid) {
  //     alert("いいねするにはログインが必要です。");
  //     return;
  //   }

  //   const likeDocRef = doc(db, "likes", `${userData.uid}_${item.id}`);
  //   const prevLiked = liked;
  //   const prevLikeCount = currentLikeCount;
  //   setLiked((prev) => !prev);
  //   setCurrentLikeCount((prev) => (prevLiked ? prev - 1 : prev + 1));

  //   try {
  //     if (prevLiked) {
  //       await deleteDoc(likeDocRef);
  //       console.log(`User ${userData.uid} unliked item ${item.id}`);
  //     } else {
  //       await setDoc(likeDocRef, {
  //         userId: userData.uid,
  //         itemId: item.id,
  //         timestamp: new Date(),
  //       });
  //       console.log(`User ${userData.uid} liked item ${item.id}`);
  //     }
  //   } catch (error) {
  //     console.error("いいねの操作中にエラーが発生しました:", error);
  //     setLiked(prevLiked);
  //     setCurrentLikeCount(prevLikeCount);
  //     alert("いいねの操作に失敗しました。時間をおいてもう一度お試しください。");
  //   }
  // };

  return (
    <Page>
      {!itemsLoading ? (
        <>
          <Frame>
            <div className="flex flex-row justify-center gap-2 flex-shrink-0">
              <button className={s.item.title}>{t.pages.item.title}</button>
              <div className={s.item.title}>|</div>
              <button className={s.item.title_gray} onClick={() => navigate(`${r.item_comment}?id=${item.id}`)}>
                {t.pages.item_comment.title}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 justify-center w-full bg-white p-2 gap-2">
              <div className="col-span-2 md:col-span-1 w-full aspect-square">
                <img src={item.imageUrl || img.thumb_default} alt={item.name} className="w-full object-cover" />
              </div>
              <div className="col-span-1 flex flex-col w-full gap-2 overflow-y-scroll">
                <div className="p-2 text-justify break-words">{item.desc}</div>
              </div>
              <div className="col-span-2 flex flex-col justify-start gap-2">
                <div className="text-lg font-semibold truncate flex-none">{item.name || "No Title"}</div>
                <div className={s.text.meta}>
                  {t.item_card.username_seller}: {item.username_seller || t.item_card.unk_seller},{" "}
                  {timeAgo(item.dt_upload)}
                </div>
              </div>
              <div className="flex flex-col w-full overflow-hidden gap-2">
                <TagList tags={item.tags} />
              </div>
              {/* <div className="grid grid-cols-[1fr_min-content_min-content] grid-rows-2 gap-x-4 h-full place-items-center">
                <div></div>
                <div></div>
                <div className="font-bold text-yellow-400 text-center truncate">
                  {!item ? 0 : item.likeCount > 99 ? "99+" : item.likeCount}
                </div>
                <div></div>
                <div onClick={()=>{}} type="button" className="w-8 text-center cursor-pointer">
                  <img src={img.comment} className="w-full inline-block" alt="いいね" />
                </div>
                <div onClick={()=>{}} type="button" className="w-8 text-center cursor-pointer">
                  <img src={liked ? img.like_yes : img.like_no} className="w-full inline-block" alt="いいね" />
                </div>
              </div> */}
            </div>
          </Frame>
          <Swipe />
          <Frame title="関連商品">
            <ItemList items={items} userData={userData} />
          </Frame>
        </>
      ) : (
        <Frame>
          <Loading />
        </Frame>
      )}
    </Page>
  );
}
