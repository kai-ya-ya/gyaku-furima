import React, { useState, useEffect, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

import { auth, db, storage } from "@firebaseApp";
import { UserContext } from "@contexts";
import { Display, Frame, Loading } from "@components";
import { t, s, r, c, img } from "@res";

export default function (props) {
  const navigate = useNavigate();
  const { userData, loading, error } = useContext(UserContext);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Math.random().toString(36).substring(2, 10)
  );
  const [sellInfo, setSellInfo] = useState({
    title: "",
    pages: {
      [currentPage]: {
        imgURL: "",
        desc: "",
        prev: "",
        next: "",
      },
    },
    tags: [],
    level: 0,
    price: 0,
    sellerInfo: {
      uid: null,
      username: null,
    },
  });
  const [imgData, setImgData] = useState({
    [currentPage]: {
      name: "",
      data: img.thumb_default,
    },
  });
  const [msg_err, setMsgErr] = useState("");

  const updateSellInfo = (props) => {
    setSellInfo((sellInfo) => ({
      ...sellInfo,
      ...props,
    }));
  };

  const decorator = new ((function () {
    const HashtagSpan = (props) => {
      return <span className={c.HASHTAG_CLASS}>{props.children}</span>;
    };

    const findHashtags = (contentBlock, callback, contentState) => {
      contentBlock.getText().replace(c.HASHTAG_REGEX, (match, offset) => {
        callback(offset, offset + match.length);
      });
    };

    return function CompositeDecoratorWrapper() {
      return new (require("draft-js").CompositeDecorator)([
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
    updateSellInfo({
      sellerInfo: {
        uid: userData?.uid,
        username: userData?.username,
      },
    });
  }, [loading, userData, navigate, r.toppage]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const plainText = state.getCurrentContent().getPlainText();

    const extractedTags = [];
    let match;
    while ((match = c.HASHTAG_REGEX.exec(plainText)) !== null) {
      extractedTags.push(match[0]);
    }
    updateSellInfo({
      pages: {
        ...sellInfo.pages,
        [currentPage]: {
          ...sellInfo.pages[currentPage],
          desc: plainText,
        },
      },
      tags: [...new Set(extractedTags)],
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > c.THUMB_MAX_SIZE) {
              height *= c.THUMB_MAX_SIZE / width;
              width = c.THUMB_MAX_SIZE;
            }
          } else {
            if (height > c.THUMB_MAX_SIZE) {
              width *= c.THUMB_MAX_SIZE / height;
              height = c.THUMB_MAX_SIZE;
            }
          }

          const targetWidth = c.THUMB_MAX_SIZE;
          const targetHeight = c.THUMB_MAX_SIZE;

          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext("2d");

          let sx = 0,
            sy = 0,
            sWidth = img.width,
            sHeight = img.height;
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

          ctx.drawImage(
            img,
            sx,
            sy,
            sWidth,
            sHeight,
            0,
            0,
            targetWidth,
            targetHeight
          );

          setImgData({
            ...imgData,
            [currentPage]: {
              name: selectedFile.name,
              data: canvas.toDataURL("image/png", 0.8),
            },
          });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImgData({
        ...imgData,
        [currentPage]: {
          name: "",
          data: img.thumb_default,
        },
      });
    }
  };

  const upload = async () => {
    console.log(sellInfo);
    // return;
    if (!userData) {
      setMsgErr("もう一度ログインしてください");
      return;
    }
    if (sellInfo.title == "") {
      setMsgErr("商品の名前を決めてください");
      return;
    }
    if (sellInfo.desc == "") {
      setMsgErr("商品の説明をしてください");
      return;
    }

    setUploading(true);
    // upload images
    let imageUrl = null;
    try {
      const uploadPromises = Object.entries(sellInfo.pages).map(
        async ([key, value]) => {
          // const fileExtension = imgData[key].name.split(".").pop();
          const imageFileName = `${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 8)}.png`;

          const imageRef = ref(
            storage,
            `item_images/${userData.uid}/${imageFileName}`
          );

          const snapshot = await uploadBytes(
            imageRef,
            imgData[key].data
          );
          imageUrl = await getDownloadURL(snapshot.ref);
          console.log("画像アップロード成功:", imgData[key].data);

          sellInfo.pages[key].imgURL = imageUrl; // without update component
          return null;
        }
      );
      await Promise.all(uploadPromises);

      // console.log(sellInfo);
      return;

      await addDoc(collection(db, "items_v2"), {
        ...sellInfo,
        dt_upload: new Date(),
      });
      console.log("Firestoreに商品情報と画像URLを保存成功");
      navigate(r.toppage);
    } catch (e) {
      console.error("アップロード中にエラーが発生しました:", e.message);
      alert(
        "画像のアップロードまたは商品情報の保存に失敗しました。詳細: " +
          e.message
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Display loading={loading}>
      <Frame>
        <div className="flex flex-row justify-center gap-2 w-full">
          <button className={s.item.title}>{t.pages.sell.title}</button>
          <div className={s.item.title}>|</div>
          <button
            className={s.item.title_gray}
            onClick={() => navigate(r.sell_ai)}
          >
            {t.pages.sell_ai.title}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center w-full bg-white p-2 gap-2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-full">
              <img
                src={imgData[currentPage].data}
                className="w-full"
              />
            </div>
            <div className="flex flex-row items-start w-full">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-500 file:mr-2 file:py-2 file:px-3 file:border-none file:bg-red-400 file:text-white hover:file:bg-red-500 file:cursor-pointer"
              />
            </div>
          </div>

          <div
            className={`${s.item.field.input_lg} draftjs-editor-container flex flex-col gap-y-4 justify-between w-full`}
          >
            <Editor
              editorState={editorState}
              onChange={handleEditorChange}
              placeholder={t.pages.sell.desc}
              decorator={decorator}
            />
            <div className={s.item.tag.flexbox}>
              {sellInfo.tags &&
                sellInfo.tags.map((tag) => (
                  <span key={tag} className={s.item.tag.view}>
                    {tag}
                  </span>
                ))}
            </div>
          </div>
          <input
            className={s.item.field.input + "col-span-2"}
            placeholder={t.pages.sell.name}
            value={sellInfo.title}
            onChange={(e) => updateSellInfo({ title: e.target.value })}
          />
        </div>
        {msg_err && <div className={s.item.field.err}>{msg_err}</div>}
        <button
          className={`${s.item.btn.ok} ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={upload}
          disabled={uploading}
        >
          {uploading ? "アップロードしています" : t.pages.sell.upload}
        </button>
      </Frame>
    </Display>
  );
}
