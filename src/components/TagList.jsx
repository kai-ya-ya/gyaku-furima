// TagList.jsx
import { useNavigate, Link } from "react-router-dom";
import { t, s, r, img } from "@res";

export default function (props) {
  const navigate = useNavigate();
  let c_box = null;
  let c_tag = null;

  switch (props.size) {
    case "xs":
      c_box = s.item.tag.xs.flexbox;
      c_tag = s.item.tag.xs.view;
      break;
    default:
      c_box = s.item.tag.flexbox;
      c_tag = s.item.tag.view;
      break;
  }

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    navigate(`${r.search}?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className={c_box}>
      {Array.isArray(props.tags) && props.tags.length > 0 ? (
        props.tags.map((tag) => (
          <button
            key={tag}
            className={c_tag}
            onClick={(e) => {
              handleTagClick(e, tag);
            }}
          >
            {tag}
          </button>
        ))
      ) : (
        <span className={s.text.meta}>タグなし</span>
      )}
    </div>
  );
}
