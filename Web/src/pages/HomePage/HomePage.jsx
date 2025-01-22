import React, { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import { BASE_DOMAIN_API } from "../../common/constant";
import SkeletonCustom from "../../components/ui/skeleton/SkeletonCustom";
import ItemHomePage from "./components/ItemHomePage";

// const mockData = [
//   {
//     id: 1,
//     image:
//       "https://i.pinimg.com/236x/f2/d4/33/f2d433dbb1671110ec7a139a1b1b2536.jpg",
//   },
//   {
//     id: 2,
//     image:
//       "https://i.pinimg.com/236x/62/0d/b4/620db4bfa14f181c7a7130b362b5a58b.jpg",
//   },
//   {
//     id: 3,
//     image:
//       "https://i.pinimg.com/474x/67/59/bf/6759bf6a5c15a53229c8476c492d5269.jpg",
//   },
//   {
//     id: 4,
//     image:
//       "https://i.pinimg.com/236x/d4/39/00/d439007d9bd256f352ea5e5d35f14318.jpg",
//   },
//   {
//     id: 5,
//     image:
//       "https://i.pinimg.com/236x/78/cc/17/78cc17bd5e31a22c9b4372b7f8809f5a.jpg",
//   },
//   {
//     id: 6,
//     image:
//       "https://i.pinimg.com/474x/11/bc/f1/11bcf1eaee7c5772a0103bdc4a3e293d.jpg",
//   },
//   {
//     id: 7,
//     image:
//       "https://i.pinimg.com/236x/66/47/30/6647305f1f817c0e0f68cccfad96ca50.jpg",
//   },
//   {
//     id: 8,
//     image:
//       "https://i.pinimg.com/236x/c1/48/bb/c148bbf9ff9162bfcf870357f18589f4.jpg",
//   },
//   {
//     id: 9,
//     image:
//       "https://i.pinimg.com/236x/1b/62/49/1b62496c440e7b416877e26ce741aa76.jpg",
//   },
//   {
//     id: 10,
//     image:
//       "https://i.pinimg.com/236x/bc/5a/07/bc5a07053d462b04f9ae879311810e0a.jpg",
//   },
// ];

const HomePage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);

  const pageSize = 12;

  // Hàm gọi API thật
  const fetchPictures = async (pageNumber) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8397/hinh-anh/phan-trang/",
        {
          params: { page: pageNumber, pageSize },
        }
      );

      console.log("API Response:", response.data.metaData);
      const { items, totalPage: totalPageFromApi } = response.data.metaData;

      setIsLoading(false);
      return { items, totalPage: totalPageFromApi };
    } catch (error) {
      console.error("Error fetching pictures:", error);
      setIsLoading(false);
      return { items: [], totalPage: 1 };
    }
  };

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      const response = await fetchPictures(1);
      setData(response.items);
      setTotalPage(response.totalPage);
    };

    loadInitialData();
  }, []);

  // Load more data when scrolling reaches the end
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPage && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loader, page, totalPage, isLoading]);

  // Fetch more data when page changes
  useEffect(() => {
    const loadMoreData = async () => {
      if (page > 1) {
        const response = await fetchPictures(page);
        setData((prev) => [...prev, ...response.items]);
      }
    };

    loadMoreData();
  }, [page]);

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    768: 2,
    640: 1,
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="container min-h-screen py-10">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-6"
        columnClassName="space-y-6"
      >
        {data?.map((item, index) => (
          <ItemHomePage key={index} item={item} />
        ))}

        {/* Show skeleton loader when loading */}
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCustom key={`skeleton-${index}`} />
          ))}
      </Masonry>

      {/* Loading trigger element */}
      <div ref={loader} className="h-10"></div>
    </div>
  );
};

export default HomePage;
