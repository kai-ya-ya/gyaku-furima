// TopPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Page, Frame, TagList, ItemCard, Swipe, ItemList, FormulaList } from "@components";
import { t, s, r, img } from "@res";
import { timeAgo } from "@utils";
import { Editor, EditorState, ContentState, CompositeDecorator } from "draft-js";

export default function () {
  const { userData, loading, error } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState(null);
  const [searchEditorState, setSearchEditorState] = useState(() => EditorState.createWithText("#"));
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchitems = async () => {
      setItemsLoading(true);
      setItemsError(null);
      try {
        // const q = query(collection(db, "items"), orderBy("dt_upload", "desc"), limit(100));
        // const querySnapshot = await getDocs(q);
        // const itemsList = querySnapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        //   likeCount: Number(doc.data().likeCount) || 0,
        // }));
        // setItems(itemsList);
      } catch (err) {
        console.error("商品データの取得中にエラーが発生しました:", err);
        setItemsError(err);
      } finally {
        setItemsLoading(false);
      }
    };
    fetchitems();
  }, []);

  const handleSearchEditorChange = (state) => {
    if (!state.getCurrentContent().getPlainText().startsWith("#")) state = EditorState.createWithText("#");
    setSearchEditorState(state);
    const plainText = state.getCurrentContent().getPlainText();
    setSearchQuery(plainText);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`${r.search}?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleReturn = (e) => {
    handleSearch();
    return "handled";
  };
  const operations = [
    {
      category: "operation",
      id: "0",
      data: {
        itemInfo: {
          name: "＋",
          desc: "足します",
        },
      },
    },
    {
      category: "operation",
      id: "1",
      data: {
        itemInfo: {
          name: "ー",
          desc: "引きます",
        },
      },
    },
    {
      category: "operation",
      id: "2",
      data: {
        itemInfo: {
          name: "×",
          desc: "掛けます",
        },
      },
    },
    {
      category: "operation",
      id: "3",
      data: {
        itemInfo: {
          name: "÷",
          desc: "割ります",
        },
      },
    },
    {
      category: "operation",
      id: "4",
      data: {
        itemInfo: {
          name: "＝",
          desc: "等しくなります",
        },
      },
    },
    {
      category: "operation",
      id: "5",
      data: {
        itemInfo: {
          name: "（",
          desc: "左側です",
        },
      },
    },
    {
      category: "operation",
      id: "6",
      data: {
        itemInfo: {
          name: "）",
          desc: "右側です",
        },
      },
    },
  ];
  const terms_test = [
    {
      category: "term",
      id: "0",
      data: {
        itemInfo: {
          type: "pains",
          name: "掃除中吸引力がすぐに落ちる",
          desc: "掃除機を使ってて、ゴミがたまるにつれて吸引力が落ちるのが嫌",
        },
        uploadInfo: {
          userId: "a",
          createdAt: Timestamp.fromDate(new Date("2025-07-16T10:00:00Z")),
        },
      },
    },
    {
      category: "term",
      id: "1",
      data: {
        itemInfo: {
          type: "pains",
          name: "掃除機のコードに引っかかる",
          desc: "ちょっと方向変えるだけで掃除機のコードに引っかかるのどうにかしてほしい",
        },
        uploadInfo: {
          userId: "b",
          createdAt: Timestamp.fromDate(new Date("2025-07-14T10:00:00Z")),
        },
      },
    },
    {
      category: "term",
      id: "2",
      data: {
        itemInfo: {
          type: "needs",
          name: "掃除をストレスなくやりたい",
          desc: "部屋はきれいになっても心はストレスであふれそうです",
        },
        uploadInfo: {
          userId: "c",
          createdAt: Timestamp.fromDate(new Date("2025-07-12T10:00:00Z")),
        },
      },
    },
    {
      category: "term",
      id: "3",
      data: {
        itemInfo: {
          type: "wants",
          name: "吸引力が持続するコードレス掃除機が欲しい",
          desc: "あるといいですよね",
        },
        uploadInfo: {
          userId: "d",
          createdAt: Timestamp.fromDate(new Date("2025-07-17T04:00:00Z")),
        },
      },
    },
    {
      category: "term",
      id: "4",
      data: {
        itemInfo: {
          type: "seeds",
          name: "サイクロン技術",
          desc: "遠心力を利用してゴミと空気を分離する仕組みです",
        },
        uploadInfo: {
          userId: "e",
          createdAt: Timestamp.fromDate(new Date("2025-07-12T02:00:00Z")),
        },
      },
    },
    {
      category: "term",
      id: "5",
      data: {
        itemInfo: {
          type: "seeds",
          name: "小型高出力モーター",
          desc: "ちっちゃいけどパワフルなモーターです",
        },
        uploadInfo: {
          userId: "f",
          createdAt: Timestamp.fromDate(new Date("2025-07-13T10:00:00Z")),
        },
      },
    },
    {
      category: "term",
      id: "6",
      data: {
        itemInfo: {
          type: "ideas",
          name: "コードレスクリーナー",
          desc: "サイクロン技術と小型モーター技術を用いた次世代の掃除機です。コードレスを実現しつつパワフルで持続する吸引力を提供します。",
        },
        uploadInfo: {
          userId: "g",
          createdAt: Timestamp.fromDate(new Date("2025-07-17T11:00:00Z")),
        },
      },
    },
  ];
  const formulas_test = [
    {
      category: "fomula",
      id: "7",
      data: {
        itemInfo: {
          name: "次世代掃除機",
          desc: "コードレスを実現しつつ吸引力持続ほしい",
        },
        formulaInfo: [
          terms_test[0],
          operations[0],
          terms_test[1],
          operations[4],
          terms_test[3],
        ],
        uploadInfo: {
          userId: "h",
          createdAt: Timestamp.fromDate(new Date("2025-07-17T13:00:00Z")),
        },
      },
    },
    {
      category: "fomula",
      id: "7",
      data: {
        itemInfo: {
          name: "次世代掃除機",
          desc: "サイクロン技術と小型高出力モーターで実現します",
        },
        formulaInfo: [
          terms_test[3],
          operations[0],
          operations[5],
          terms_test[4],
          operations[0],
          terms_test[5],
          operations[6],
          operations[4],
          terms_test[6],
        ],
        uploadInfo: {
          userId: "h",
          createdAt: Timestamp.fromDate(new Date("2025-07-17T14:00:00Z")),
        },
      },
    },
  ];

  return (
    <Page loading={loading}>
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 items-start">
        <Frame tabs={[{ title: "探す" }]}>
          <div className="w-full">
            <div className={`${s.item.field.input} draftjs-topbar-search-input`}>
              <Editor editorState={searchEditorState} onChange={handleSearchEditorChange} handleReturn={handleReturn} />
            </div>
          </div>
        </Frame>
        <Swipe />
      </div>
      <Frame tabs={[{ title: "新着の項" }]}>
        <ItemList items={terms_test} userData={userData} />
      </Frame>
      <Frame tabs={[{ title: "新着の式" }]}><FormulaList items={formulas_test} userData={userData}/></Frame>
    </Page>
  );
}
