import React, { useEffect, useState } from "react";
import { commentService } from "../../../services/comment.service";
import { Avatar } from "antd";
import { convertTimeAgo } from "../../../common/helper/convertTimeAgo";
import { AiFillLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { ButtonPrimary } from "../../../components/ui/button/ButtonCustom";
import { useHeaderContext } from "../../../store/Header.Context";
import TextareaCusTom from "../../../components/ui/textarea/TextareaCusTom";
import { BASE_DOMAIN_API } from "../../../common/constant";
const CommentDetailPicture = ({ pictureId }) => {
  const { user } = useSelector((state) => state.userSlice);
  const { setIsLoginModalOpen } = useHeaderContext();
  const [page, setPage] = useState(1);
  const [listComment, setListComment] = useState({
    item: [],
    totalItem: 0,
  });
  const [loading, setLoading] = useState(false);
  const [valueComment, setValueComment] = useState("");

  const getListCommentOfPicture = (append = false) => {
    setLoading(true);
    commentService
      .getListCommentForPictureId(pictureId, page, 3)
      .then((res) => {
        const data = res.data.metaData;
        setListComment((prev) => ({
          item: append ? [...prev.item, ...data.item] : data.item,
          totalItem: data.totalItem,
        }));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSubmitCreateComment = (e) => {
    e.preventDefault();
    console.log(valueComment);
    const data = {
      userId: user.nguoi_dung_id,
      pictureId: +pictureId,
      content: valueComment,
    };
    commentService
      .create(data)
      .then((res) => {
        console.log(res);
        getListCommentOfPicture();
        setValueComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (page > 1) {
      getListCommentOfPicture(true);
    } else {
      getListCommentOfPicture(false);
    }
  }, [page]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl mb-4">{listComment.totalItem} nhận xét</h2>
      <div className="space-y-4">
        {listComment.item?.map((comment, index) => {
          return (
            <div className="flex flex-col gap-4 px-4" key={index}>
              <div className="flex gap-4">
                <Avatar
                  src={
                    comment.nguoi_dung?.anh_dai_dien
                      ? BASE_DOMAIN_API + comment.nguoi_dung?.anh_dai_dien
                      : null
                  }
                  style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                >
                  {!comment.nguoi_dung?.anh_dai_dien &&
                    comment.nguoi_dung?.ho_ten.slice(0, 1)}
                </Avatar>
                <div className="flex-1">
                  <p>
                    <span className="font-semibold">
                      {comment.nguoi_dung?.ho_ten}:{" "}
                    </span>
                    {comment.noi_dung}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">
                  {convertTimeAgo(comment.created_at)}
                </p>
                <div className="flex gap-2 justify-center items-center cursor-pointer">
                  <AiFillLike size={12} />
                  <span className="text-sm">Hữu ích</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {listComment.item.length < listComment.totalItem && (
        <div
          className={`flex justify-center hover:bg-gray-200 py-2 rounded-full cursor-pointer transition-all duration-200 ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={handleLoadMore}
        >
          <BsThreeDots />
        </div>
      )}
      {user ? (
        <form onSubmit={handleSubmitCreateComment} className="space-y-6">
          <TextareaCusTom
            maxLength={1000}
            placeholder={"Bình luận"}
            value={valueComment}
            onChange={(e) => {
              setValueComment(e.target.value);
            }}
          />
          <ButtonPrimary type="submit" className={"w-full"}>
            Đăng
          </ButtonPrimary>
        </form>
      ) : (
        <div className="flex justify-center">
          <ButtonPrimary
            onClick={() => {
              setIsLoginModalOpen(true);
            }}
            className={"w-full"}
          >
            Đăng nhập để bình luận
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default CommentDetailPicture;
