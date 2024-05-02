import auth from "../../auth";
import { useNavigate } from "react-router-dom";
import AuthSearchCont from "../elements/AuthSearchCont";
import { useEffect } from "react";

const SearchPage = () => {
  const navigate = useNavigate();
  let openStackName = "",
    openStackCode = "",
    createStackName = "",
    createStackCode = "";
  useEffect(() => {
    auth.exitStack();
  }, []);

  return (
    <div className="full-page-cont flex justify-center items-center flex-row">
      <div className="left-page-cont flex justify-center items-center">
        <div className="logo-cont">
          <div className="notestack-logo">notestack</div>
          <hr className="logo-desc-bar" />
          <div className="notestack-desc">Save, share, and organize notes with ease</div>
        </div>
      </div>
      <div className="right-page-cont flex flex-col justify-center items-center">
        <AuthSearchCont
          headerText="Open an existing stack"
          publicValuePlaceholder="Enter stack name"
          privateValuePlaceholder="Enter stack code"
          submitText="Open stack"
          privateValue={openStackCode}
          publicValue={openStackName}
          onSubmit={async (openStackName, openStackCode) => {
            const response = await auth.openStack(openStackName, openStackCode);
            if (!response.success) {
              alert(response.message);
              return;
            }
            navigate("/stack");
          }}
        />
        <AuthSearchCont
          headerText="Create a new stack"
          publicValuePlaceholder="Enter stack name"
          privateValuePlaceholder="Enter stack code"
          submitText="Create stack"
          privateValue={createStackCode}
          publicValue={createStackName}
          onSubmit={async (createStackName, createStackCode) => {
            const response = await auth.createStack(createStackName, createStackCode);
            if (!response.success) {
              alert(response.message);
              return;
            }
            navigate("/stack");
          }}
        />
      </div>
    </div>
  );
};

export default SearchPage;
