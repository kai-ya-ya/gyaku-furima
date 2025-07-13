// TopPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Page, Frame, TagList, ItemCard, Swipe, ItemList } from "@components";
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
        const q = query(collection(db, "items"), orderBy("dt_upload", "desc"), limit(100));

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

  const tags_recommend = ["#おすすめ1", "#おすすめ2", "#おすすめ3"];
  const tags_popular = ["#人気1", "#人気2", "#人気3"];
  const tags_history = ["#履歴1", "#履歴2", "#履歴3"];

  return (
    <Page loading={loading}>
      <Frame title="探す">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2 items-start">
          <div className="">
            <div className={`${s.item.field.input} draftjs-topbar-search-input`}>
              <Editor editorState={searchEditorState} onChange={handleSearchEditorChange} handleReturn={handleReturn} />
            </div>
            <div className="flex flex-col h-full p-2 gap-1">
              <div className="text-gray-600 text-sm">あなたにおすすめ</div>
              <TagList tags={tags_recommend} size="xs" />
              <div className="text-gray-600 text-sm">人気のタグ</div>
              <TagList tags={tags_popular} size="xs" />
              <div className="text-gray-600 text-sm">検索履歴</div>
              <TagList tags={tags_history} size="xs" />
            </div>
          </div>
          <Swipe />
        </div>
      </Frame>
      <Frame title={t.pages.toppage.latest}>
        <ItemList items={items} userData={userData}/>
      </Frame>
    </Page>
  );
}
