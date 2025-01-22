import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import { NotificationProvider } from "./store/Notification.Context";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import HomePage from "./pages/HomePage/HomePage";
import UploadPage from "./pages/UploadPage/UploadPage";
import UserInfoPage from "./pages/UserInfoPage/UserInfoPage";
import DetailPicturePage from "./pages/DetailPicturePage/DetailPicturePage";
import { HeaderProvider } from "./store/Header.Context";
import { ToastContainer } from "react-toastify";

const arrRoutes = [
  {
    path: pathDefault.homePage,
    element: <HomeTemplate />,
    children: [
      {
        path: pathDefault.homePage,
        element: <HomePage />,
      },
      {
        path: pathDefault.uploadPage,
        element: <UploadPage />,
      },
      {
        path: pathDefault.userInfoPage,
        element: <UserInfoPage />,
      },
      {
        path: pathDefault.detailPicturePage,
        element: <DetailPicturePage />,
      },
    ],
  },
];

function App() {
  const routes = useRoutes(arrRoutes);
  return (
    <HeaderProvider>
      <NotificationProvider>
        {routes}
        <ToastContainer />
      </NotificationProvider>
    </HeaderProvider>
  );
}

export default App;
