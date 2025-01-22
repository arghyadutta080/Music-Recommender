import { useUserStore } from "../../lib/stores";

const Chatbox = () => {
  const { userState } = useUserStore();
  console.log(userState);
  return <div className="text-white">Hello {userState.userData?.username}</div>;
};

export default Chatbox;
