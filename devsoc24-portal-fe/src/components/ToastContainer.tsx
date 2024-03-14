import React from "react";
import { Toaster } from "react-hot-toast";

const ToastContainer = () => {
  return (
    <div className="fixed">
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            position: "fixed",
            background: "#FFFFFF",
            color: "#000000",
          },
        }}
      />
    </div>
  );
};

export default ToastContainer;
