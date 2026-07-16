import { useState, useEffect } from "react";
import axios from "axios";
import useConversation from "../StateManage/useConversation";


const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const {
    messages,
    setMessages,
    selectedConversation,
  } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) {
        setMessages([]);
        return;
      }

      try {
        setLoading(true);

        const { data } = await axios.get(
          `/api/message/get/${selectedConversation._id}`
        );

        console.log("API Response =", data);

        setMessages(data.message);

      } catch (error) {
        console.log(
          "Error In useGetMessages = ",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    getMessages();

  }, [selectedConversation, setMessages]);

  return {
    messages,
    loading,
  };
};

export default useGetMessages;