// TopPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Page, Frame, TagList, ItemCard, Swipe, TermList, FormulaList } from "@components";
import { t, s, r, img, operations, terms_test, formulas_test } from "@res";
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

  return (
    <Page loading={loading}>
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 items-start">
        <Frame
          tabs={[
            { id: "0", title: "新着の式" },
            { id: "1", title: "新着の項" },
            { id: "2", title: "探す" },
          ]}
        >
          <div id="0">
            <FormulaList formulas={formulas_test} userData={userData} />
          </div>
          <div id="1">
            <TermList terms={terms_test} userData={userData} />
          </div>
          <div id="2">
            <div className={`${s.item.field.input} draftjs-topbar-search-input`}>
              <Editor editorState={searchEditorState} onChange={handleSearchEditorChange} handleReturn={handleReturn} />
            </div>
          </div>
        </Frame>
        <Swipe />
      </div>
    </Page>
  );
}
