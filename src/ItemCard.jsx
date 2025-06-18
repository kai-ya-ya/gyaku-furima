import { text as t } from './text';
import { style as s } from './style';
import { route as r } from './route';
import { timeAgo } from './utils/timeAgo';
import { useNavigate, Link } from "react-router-dom";

export default function ItemCard(props) {
    const item = props.item;

    return(
        <Link to={r.item + "?id=" + item.id} className="grid grid-cols-2 gap-2 p-2 bg-white rounded-2xl">
            <div className="col-span-2 text-lg font-semibold mb-2">{item.name}</div>
            <div className="">a</div>
            <div className="">b</div>
            <div className="flex flex-col justify-between">
                <div className={s.text.normal}>¥{item.price}</div>
                <div className={s.text.meta}>{t.item_card.username_seller}: {item.username_seller || t.item_card.unk_seller}</div>
                <div className={s.text.meta}>{timeAgo(item.dt_upload)}</div>
            </div>
            <div className="flex flex-col">
                <div className={s.item.btn.other}>🤍</div>
            </div>
        </Link>
    )
}