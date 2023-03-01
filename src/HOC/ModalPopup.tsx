import React, { memo } from "react";
import { Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../Hooks/HooksRedux";
import { modalPopUp } from "../redux/Reducers/openModalReducer";

type Props = {};

function ModalPopup({}: Props) {
  const { ComponentContent, ComponentTitle, openModalPopup } = useAppSelector(
    (state) => state.openModalReducer
  );
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>
        <Modal
          className="hoc_modal transition"
          title={<ComponentTitle />}
          visible={openModalPopup}
          width={1000}
          style={{ borderRadius: "100%" }}
          onOk={() => {
            const action = modalPopUp(false);
            dispatch(action);
          }}
          onCancel={() => {
            const action = modalPopUp(false);
            dispatch(action);
          }}
        >
          <ComponentContent />
        </Modal>
      </div>
    </div>
  );
}

export default memo(ModalPopup);
