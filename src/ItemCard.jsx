import { text as t } from './text';
import { style as s } from './style';
import { route as r } from './route';
import { timeAgo } from './utils/timeAgo';
import { useNavigate, Link } from "react-router-dom";

export default function ItemCard(props) {
    const item = props.item;

    const handleLikeClick = (event) => {
        event.stopPropagation(); // ★★★ ここでイベントの伝播を停止 ★★★
        console.log("いいねがクリックされました！");
        // ここにいいねの実装ロジックを追加
    };


    return (
        <Link to={r.item + "?id=" + item.id} className="grid grid-cols-2 gap-2 p-2 bg-white rounded-2xl border-4 border-white/100 hover:border-red-400/50 h-auto">
            <div className="">
                <img src={item.imageUrl || "https://dummyimage.com/320x320/eee/aaa.png&text=Not+Found"} alt={item.name} className="w-auto" />
            </div>
            <div className="flex flex-col overflow-hidden">
                <div className="col-span-2 text-lg font-semibold mb-2 truncate">{item.name || "No Title"}</div>
                <div className={s.item.tag.flexbox}>
                    {Array.isArray(item.tags) && item.tags.length > 0 ? (
                        item.tags.map(tag => (
                            <span key={tag} className={s.item.tag.view_2xs}>{tag}</span>
                        ))
                    ) : (
                        <span className={s.text.meta}>タグなし</span>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-between">
                <div className={s.text.normal}>¥{item.price || "???"}</div>
                <div className={s.text.meta}>{t.item_card.username_seller}: {item.username_seller || t.item_card.unk_seller}</div>
                <div className={s.text.meta}>{timeAgo(item.dt_upload)}</div>
            </div>
            <div className="flex flex-col items-start">
                <button className={s.item.btn.other} onClickCapture={handleLikeClick} type="button">いいね</button>
            </div>
        </Link>
    )
}