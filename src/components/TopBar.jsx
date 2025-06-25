// TopBar.jsx
import React, { useState, useEffect, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { t, s, r, img } from "@res";

import {
  Editor,
  EditorState,
  ContentState,
  CompositeDecorator,
} from "draft-js";

export default function TopBar() {
  const { userData, loading, error } = useContext(UserContext);
  const [searchEditorState, setSearchEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  let btn_lnk = r.signin;
  let btn_txt = t.pages.signin.title;

  if (userData) {
    btn_lnk = r.mypage;
    btn_txt = t.pages.mypage.title;
  }

  const HASHTAG_CLASS = "text-blue-200 font-semibold";
  const HASHTAG_REGEX = /(#\S+?)(?=#|\s|$)/g;

  const decorator = new (function () {
    const HashtagSpan = (props) => {
      return <span className={HASHTAG_CLASS}>{props.children}</span>;
    };

    const findHashtags = (contentBlock, callback, contentState) => {
      contentBlock.getText().replace(HASHTAG_REGEX, (match, offset) => {
        callback(offset, offset + match.length);
      });
    };

    return new CompositeDecorator([
      {
        strategy: findHashtags,
        component: HashtagSpan,
      },
    ]);
  })();

  const handleSearchEditorChange = (state) => {
    setSearchEditorState(state);
    const plainText = state.getCurrentContent().getPlainText();
    setSearchQuery(plainText); // プレーンテキストの検索クエリを更新
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // 検索クエリをクエリパラメータとして /search ページに遷移
      navigate(`${r.search}?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

//   // Enterキーでの検索を許可
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // デフォルトの改行動作を防ぐ
//       handleSearch();
//     }
//   };
  const handleReturn = (e) => {
    // Enterキーが押されたら検索を実行し、改行しない
    handleSearch();
    return 'handled'; // 'handled' を返すことでDraft.jsのデフォルトの改行処理を防ぐ
  };

  return (
    <div>
      <div className={s.topbar.dummy}></div>
      <div className="bg-red-400 text-white flex justify-between items-center px-4 py-2 fixed top-0 left-0 w-full z-50 gap-4">
        <Link to={r.toppage} className="flex flex-row gap-2 items-center flex-0">
          <img src={img.logo_w} className="h-9"></img>
          <div className={s.topbar.title}>{t.pages.topbar.title}</div>
        </Link>

        {/* <div className={`${s.topbar.field.input} draftjs-topbar-search-input flex-1 max-w-80`}>
          <Editor
            editorState={searchEditorState}
            onChange={handleSearchEditorChange}
            decorator={decorator}
            handleReturn={handleReturn}
          />
        </div> */}

        <div className="flex items-center">
          <button
            onClick={() => navigate(userData ? r.sell : r.signin)}
            className={s.topbar.btn}
          >
            {t.pages.sell.title}
          </button>
          <button onClick={() => navigate(btn_lnk)} className={s.topbar.btn}>
            {btn_txt}
          </button>
        </div>
      </div>
    </div>
  );
}
