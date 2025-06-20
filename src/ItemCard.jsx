import React, { useState, useEffect } from 'react';
import { text as t, style as s, route as r } from './res';
import { timeAgo } from './utils/timeAgo';
import { useNavigate, Link } from "react-router-dom";
import { useUser } from './contexts/UserContext';

export default function ItemCard(props) {
    const item = props.item;
    const [liked, setLiked] = useState(props.liked);
    const navigate = useNavigate();

    const handleLikeClick = (event) => {
        event.stopPropagation();
        console.log("いいねがクリックされました！");
        setLiked(!liked);
        // ここにいいねの実装ロジックを追加
    };

    const goItem = () => navigate(r.item + "?id=" + item.id)


    return (
        <div onClick={goItem} role="button" className="grid grid-cols-2 justify-items-stretch gap-2 p-2 bg-white rounded-2xl border-4 border-white/100 hover:border-red-400/50 h-auto">
            <div className="">
                <img src={item.imageUrl || "https://dummyimage.com/320x320/eee/aaa.png&text=Not+Found"} alt={item.name} className="w-auto" />
            </div>
            <div className="flex flex-col w-full aspect-square overflow-hidden gap-2">
                    <div className={s.item.tag.xs.flexbox}>
                        {Array.isArray(item.tags) && item.tags.length > 0 ? (
                                item.tags.map(tag => (
                                    <div key={tag} className={s.item.tag.xs.view}>{tag}</div>
                                ))
                        ) : (
                            <span className={s.text.meta}>タグなし</span>
                        )}
                </div>
            </div>
            <div className="col-span-2 text-lg font-semibold truncate flex-none">{item.name || "No Title"}</div>
            <div className="flex flex-col justify-end">
                {/* <div className={s.text.normal}>¥{item.price || "???"}</div> */}
                <div className={s.text.meta}>{t.item_card.username_seller}: {item.username_seller || t.item_card.unk_seller}</div>
                <div className={s.text.meta}>{timeAgo(item.dt_upload)}</div>
            </div>
            <div className="flex flex-row flex-nowrap gap-1">
                <button className={s.item.btn.like.no} onClick={handleLikeClick} type="button">💬</button>
                <button className={liked ? s.item.btn.like.yes : s.item.btn.like.no} onClick={handleLikeClick} type="button">{liked ? "♡" : "♡"}</button>
            </div>
        </div>
    )
}