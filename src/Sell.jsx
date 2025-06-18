import React, { useState, useEffect, useRef } from "react";
import { auth, db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { text as t } from './text';
import { style as s } from './style';
import { route as r } from './route';
import { Loading } from "./Loading";
import TopBar from './TopBar';
import { useUser } from './contexts/UserContext';

// Draft.jsのインポート
import { Editor, EditorState, ContentState, CompositeDecorator, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css'; // デフォルトのスタイルシートをインポート

export default function Sell() {
    const navigate = useNavigate();
    const { userData, loading, error } = useUser();
    const [name, setName] = useState("");
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty() // 初期エディタ状態
    );
    const [tags, setTags] = useState([]);
    const [price, setPrice] = useState("");

    // ハッシュタグのスタイルをTailwind CSSクラスで指定
    const HASHTAG_CLASS = "text-blue-600 font-semibold";

    const HASHTAG_REGEX = /(#\S+?)(?=#|\s|$)/g;

    const decorator = new CompositeDecorator([
        {
            strategy: (contentBlock, callback, contentState) => {
                contentBlock.getText().replace(HASHTAG_REGEX, (match, offset) => {
                    callback(offset, offset + match.length);
                });
            },
            component: (props) => {
                return (
                    <span className={HASHTAG_CLASS}>
                        {props.children}
                    </span>
                )
            },
        }
    ]);

    useEffect(() => {
        if (!loading && !userData) {
            navigate(r.signin);
        }
    }, [loading, userData, navigate, r.toppage]);

    if (loading) {
        return <Loading />;
    }
    if (!userData) {
        navigate(r.toppage);
    }

    const handleEditorChange = (state) => {
        setEditorState(state);
        const plainText = state.getCurrentContent().getPlainText();

        const extractedTags = [];
        let match;
        while ((match = HASHTAG_REGEX.exec(plainText)) !== null) {
            extractedTags.push(match[0]);
        }
        setTags([...new Set(extractedTags)]);
    };

    const upload = async () => {
        try {
            const desc = editorState.getCurrentContent().getPlainText();

            await addDoc(collection(db, "items"), {
                name: name,
                desc: desc,
                tags: tags,
                price: price,
                username_seller: userData.username,
                uid_seller: userData.uid,
                dt_upload: new Date(),
            });
            navigate(r.toppage);
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div>
            <TopBar />
            <div className={s.win.flexbox}>
                <div className={s.item.title}>{t.pages.sell.title}</div>
                <input
                    className={s.item.field.input}
                    placeholder={t.pages.sell.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className={`${s.item.field.input_lg} draftjs-editor-container flex flex-col gap-y-4 justify-between`}>
                    <Editor
                        editorState={editorState}
                        onChange={handleEditorChange}
                        placeholder={t.pages.sell.desc}
                        decorator={decorator}
                    />
                    <div className={s.item.tag.flexbox}>
                        {tags && tags.map(tag => (
                            <span className={s.btn_tag}>{tag}</span>
                        ))}
                    </div>
                </div>
                <input
                    type="number"
                    className={s.item.field.input}
                    placeholder={t.pages.sell.price}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button
                    className={s.item.btn.ok}
                    onClick={upload}>{t.pages.sell.upload}</button>
            </div>
        </div>
    );
};