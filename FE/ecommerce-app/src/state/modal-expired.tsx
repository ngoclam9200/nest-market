 

interface ModalExpiredProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
export const ModalExpired = ({  }: ModalExpiredProps) => {
  // const { expired, setExpired } = useExpired();
  // const bodyModal = () => {
  //   return (
  //     <div className="flex flex-col items-center justify-center">
  //       <IconWarning className="w-16 h-16 mb-3" />
  //       <label htmlFor="name" className="text-center">
  //         Phiên đăng nhập hết hạn!
  //       </label>
  //     </div>
  //   );
  // };

  // const footerModal = () => {
  //   return (
  //     <ButtonCustom
  //       type="button"
  //       text="Đăng xuất"
  //       onClick={() => {
  //         setIsOpen(expired);
  //         CookieUtils.eraseCookie("user");
  //         setExpired(false);
  //         localStorage.removeItem("chatHistory");
  //         window.location.href = MODULE_ROUTE.LOGIN;
  //       }}
  //       className="text-gray-500 bg-gray-100 hover:bg-gray-400 hover:text-white"
  //     />
  //   );
  // };

  return (
     <></>
  );
};
