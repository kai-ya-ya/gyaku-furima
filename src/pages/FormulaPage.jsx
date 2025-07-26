import React, { useState, useEffect, useContext } from "react";
import { collection, query, orderBy, limit, getDoc, doc, where, getDocs } from "firebase/firestore";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts/UserContext";
import Page from "@components/Page";
import Frame from "@components/Frame";
import Loading from "@components/Loading";
import Formula from "@components/Formula";
import Flex from "@components/Flex";
import Swipe from "@components/Swipe";
import Text from "@components/Text";
import { Helmet } from "react-helmet";
import { t, s, r, img, operations, formulas_test, terms_test } from "@res";
import { timeAgo } from "@utils";

export default function () {
  const { userData, loading, error } = useContext(UserContext);
  const [formula, setFormula] = useState(null);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const formulaId = searchParams.get("id");
  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [showHighlight, setShowHighlight] = useState(true);

  useEffect(() => {
    setItemsLoading(false);
    setFormula(formulas_test[formulaId]);
    return;
    if (!formulaId) {
      setItemsLoading(false);
      setItemsError(new Error("商品IDがURLに指定されていません。"));
      return;
    }

    const fetchItem = async () => {
      setItemsLoading(true);
      setItemsError(null);
      try {
        const itemDocRef = doc(db, "items", formulaId);
        const itemDocSnap = await getDoc(itemDocRef);

        if (itemDocSnap.exists()) {
          setFormula({ id: itemDocSnap.id, ...itemDocSnap.data() });
        } else {
          setFormula(null);
        }
      } catch (err) {
        setItemsError(err);
      } finally {
        setItemsLoading(false);
      }
    };

    fetchItem();
  }, [formulaId]);

  useEffect(() => {
    const fetchitems = async () => {
      setItemsLoading(true);
      setItemsError(null);
      try {
        const q = query(
          collection(db, "items"),
          where("tags", "array-contains", formula.tags[0]),
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
    if (formula && formula.tags && formula.tags.length !== 0) fetchitems();
  }, [formula]);

  // useEffect(() => {
  //   console.log(itemsLoading);
  // }, [itemsLoading]);

  const handleLikeClick = async (event) => {};
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
      {/* <Helmet>
        <title>定義ページ | MyApp</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="定義のタイトル" />
        <meta name="twitter:description" content="この定義は…" />
        <meta name="twitter:image" content={`https://dummyimage.com/600x400/000/fff&text=test`} />
      </Helmet> */}
      {itemsError ? (
        <Frame tabs={[]}>
          <Text cname={"text-center"} text={`${itemsError}`} />
        </Frame>
      ) : !itemsLoading ? (
        !formula ? (
          <Frame tabs={[]}>
            <Text cname={"text-center"} text={"指定された商品は見つかりませんでした。"} />
          </Frame>
        ) : (
          <>
            <Frame
              tabs={[
                { id: "0", title: "証明" },
                { id: "1", title: "コメント" },
                { id: "2", title: "他の証明" },
              ]}
            >
              <div id="0">
                <Flex className="items-center gap-2">
                  <Flex className={`px-4 min-h-32 justify-center`}>
                    <Flex dim="row" className={"items-center gap-1 flex-wrap"}>
                      <Text text={`"${formula.data.itemInfo.desc}"`} />
                      <Text text={`より、`} />
                      <Formula formula={formula} showHighlight={showHighlight} />
                      <Text text={`である。`} />
                      <Text className="w-full text-right" text={`Q.E.D.`} />
                    </Flex>
                  </Flex>
                  <Flex dim="row" className={"justify-between items-center gap-2"}>
                    <Text className={s.text.meta} text={`${timeAgo(formula.data.uploadInfo.createdAt)}`} />
                    <Text className={s.text.meta} text={`by ${formula.data.uploadInfo.userId}`} />
                  </Flex>
                  <button onClick={() => setShowHighlight(!showHighlight)}>
                    <Text
                      className={s.text.meta}
                      text={showHighlight ? ">>ハイライトを非表示<<" : ">>ハイライトを表示<<"}
                    />
                  </button>
                </Flex>
              </div>
              <div id="1">aiueo</div>
              <div id="2">cdcnj</div>
            </Frame>
            <Swipe />
            {/* <Frame title="関連商品">
            <ItemList items={items} userData={userData} />
          </Frame> */}
          </>
        )
      ) : (
        <Frame>
          <Loading />
        </Frame>
      )}
    </Page>
  );
}
