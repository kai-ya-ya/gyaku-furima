import React, { useState, useEffect, useRef } from "react";
import { auth, db } from './firebase'; // storageのインポートは不要になります
import { collection, addDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Storage関連の関数はコメントアウトまたは削除
import { useNavigate } from "react-router-dom";
import { text as t } from './text';
import { style as s } from './style';
import { route as r } from './route';
import { Loading } from "./Loading";
import TopBar from './TopBar';
import { useUser } from './contexts/UserContext';

import { Editor, EditorState, ContentState, CompositeDecorator, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function Sell() {
    const navigate = useNavigate();
    const { userData, loading, error } = useUser();
    const [name, setName] = useState("");
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty()
    );
    const [tags, setTags] = useState([]);
    const [price, setPrice] = useState("");
    // const [image, setImage] = useState(null); // 画像ファイルの状態は不要
    // const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // 画像プレビューも不要
    const [uploading, setUploading] = useState(false);
    const [testImageUrl, setTestImageUrl] = useState("https://dummyimage.com/320x320/eee/aaa.png&text=test");

    useEffect(() => {
        setTestImageUrl(`https://dummyimage.com/320x320/eee/aaa.png&text=${name}`);
        console.log(testImageUrl)
    }, [name]);

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

    // 画像選択ハンドラは、今回は何も処理しないか削除
    // const handleImageChange = (e) => {
    //     // 何もしない、またはconsole.logで選択されたことを確認するだけ
    //     console.log("画像が選択されましたが、今回はテストURLを使用します。");
    // };


    const upload = async () => {
        // 画像のバリデーションやアップロードロジックは削除またはスキップ
        // if (!image) { // 不要
        //     alert("画像をアップロードしてください。");
        //     return;
        // }

        setUploading(true);
        // let imageUrl = null; // 不要
        try {
            // ★★★ ここが一番の変更点 ★★★
            // 画像アップロードのロジックをスキップし、固定のURLを使用
            const imageUrl = testImageUrl;
            console.log("テストのため、固定の画像URLを使用:", imageUrl);

            // Firestoreに商品情報を保存
            const desc = editorState.getCurrentContent().getPlainText();
            await addDoc(collection(db, "items"), {
                name: name,
                desc: desc,
                tags: tags,
                price: price,
                imageUrl: imageUrl,
                username_seller: userData.username,
                uid_seller: userData.uid,
                dt_upload: new Date(),
            });
            navigate(r.toppage);
        } catch (e) {
            console.error("商品情報の保存に失敗しました:", e.message);
            alert("商品情報の保存に失敗しました。");
        } finally {
            setUploading(false);
        }
    };

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

                {/* 画像アップロード入力欄は残すか、別の用途（例えば「プレビュー機能なし」の表示）にする */}
                <div className="mb-4">
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => console.log("画像が選択されましたが、固定のURLが使われます:", e.target.files[0].name)}
                        className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-violet-50 file:text-violet-700
                                  hover:file:bg-violet-100"
                    />
                    {/* プレビュー表示はコメントアウトまたは削除 */}
                    {/* {imagePreviewUrl && (
                        <div className="mt-4 flex justify-center">
                            <img src={imagePreviewUrl} alt="Image Preview" className="max-w-xs h-auto rounded shadow-md" />
                        </div>
                    )} */}
                     <div className="mt-4 flex justify-center">
                        <img src={testImageUrl} alt="Test Image" className="max-w-xs h-auto" />
                    </div>
                </div>

                <div className={`${s.item.field.input_lg} draftjs-editor-container flex flex-col gap-y-4 justify-between`}>
                    <Editor
                        editorState={editorState}
                        onChange={handleEditorChange}
                        placeholder={t.pages.sell.desc}
                        decorator={decorator}
                    />
                    <div className={s.item.tag.flexbox}>
                        {tags && tags.map(tag => (
                            <span key={tag} className={s.item.tag.view}>{tag}</span>
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
                    className={`${s.item.btn.ok} ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={upload}
                    disabled={uploading}
                >
                    {uploading ? "t.common.uploading" : t.pages.sell.upload}
                </button>
            </div>
        </div>
    );
};