import React, { useState, useEffect } from "react";
import { auth, db, storage } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from "react-router-dom";
import { text as t, style as s, route as r } from './res';
import { Loading } from "./Loading";
import TopBar from './TopBar';
import { useUser } from './contexts/UserContext';

import { Editor, EditorState } from 'draft-js';
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
    const [image, setImage] = useState(null); // リサイズ後の画像ファイル (Blob)
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null); // 画像プレビュー用URL
    const [originalImageFileName, setOriginalImageFileName] = useState(""); // ★★★ 追加: 元のファイル名 ★★★
    const [uploading, setUploading] = useState(false);

    const HASHTAG_CLASS = "text-blue-600 font-semibold";
    const HASHTAG_REGEX = /(#\S+?)(?=#|\s|$)/g;

    const decorator = new ((function() {
      const HashtagSpan = (props) => {
        return (
          <span className={HASHTAG_CLASS}>
            {props.children}
          </span>
        );
      };

      const findHashtags = (contentBlock, callback, contentState) => {
        contentBlock.getText().replace(HASHTAG_REGEX, (match, offset) => {
          callback(offset, offset + match.length);
        });
      };
      
      return function CompositeDecoratorWrapper() {
          return new (require('draft-js').CompositeDecorator)([
              {
                  strategy: findHashtags,
                  component: HashtagSpan,
              },
          ]);
      };
    })())();


    useEffect(() => {
        if (!loading && !userData) {
            navigate(r.signin);
        }
    }, [loading, userData, navigate, r.toppage]);

    if (loading) {
        return <Loading />;
    }
    if (!userData && !loading) {
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

    // ★★★ 画像ファイルが選択されたときのハンドラ (元のファイル名保存を追加) ★★★
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setOriginalImageFileName(selectedFile.name); // ★★★ 元のファイル名を保存 ★★★

            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_SIZE = 640; 

                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }

                    const targetWidth = MAX_SIZE;
                    const targetHeight = MAX_SIZE;

                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    const ctx = canvas.getContext('2d');

                    let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;
                    const imgAspectRatio = img.width / img.height;
                    const canvasAspectRatio = targetWidth / targetHeight;

                    if (imgAspectRatio > canvasAspectRatio) {
                        sHeight = img.height;
                        sWidth = img.height * canvasAspectRatio;
                        sx = (img.width - sWidth) / 2;
                    } else {
                        sWidth = img.width;
                        sHeight = img.width / canvasAspectRatio;
                        sy = (img.height - sHeight) / 2;
                    }

                    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);

                    canvas.toBlob((blob) => {
                        setImage(blob); 
                        setImagePreviewUrl(canvas.toDataURL('image/jpeg', 0.8)); 
                    }, 'image/jpeg', 0.8);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImage(null);
            setImagePreviewUrl(null);
            setOriginalImageFileName(""); // ★★★ ファイル名もリセット ★★★
        }
    };

    const upload = async () => {
        if (!image) {
            alert("画像をアップロードしてください。");
            return;
        }

        setUploading(true);
        let imageUrl = null;
        try {
            // 1. リサイズ後の画像をFirebase Storageにアップロード
            // ファイル名: ユーザーID/ランダムな文字列_元のファイル名（拡張子付き）
            // originalImageFileName を使用して元のファイル名を利用する
            const fileExtension = originalImageFileName.split('.').pop(); // 拡張子を取得
            const imageFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExtension || 'jpeg'}`; // タイムスタンプとランダム文字列、元の拡張子を使用
            const imageRef = ref(storage, `item_images/${userData.uid}/${imageFileName}`);
            
            const snapshot = await uploadBytes(imageRef, image); 
            imageUrl = await getDownloadURL(snapshot.ref);
            console.log("画像アップロード成功:", imageUrl);

            // 2. Firestoreに商品情報を保存
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
            console.log("Firestoreに商品情報と画像URLを保存成功");
            navigate(r.toppage);
        } catch (e) {
            console.error("アップロード中にエラーが発生しました:", e.message);
            alert("画像のアップロードまたは商品情報の保存に失敗しました。詳細: " + e.message);
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

                <div className="mb-4">
                    <label htmlFor="image-upload" className="block text-gray-700 text-sm font-bold mb-2">
                        {t.pages.sell.image} (640x640に自動リサイズされます)
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-full file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-violet-50 file:text-violet-700
                                  hover:file:bg-violet-100"
                    />
                    {imagePreviewUrl && (
                        <div className="mt-4 flex justify-center">
                            <img src={imagePreviewUrl} alt="Image Preview" className="max-w-xs h-auto rounded shadow-md" />
                        </div>
                    )}
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