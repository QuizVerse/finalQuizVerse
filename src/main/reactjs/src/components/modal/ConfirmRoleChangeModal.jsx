import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";

function ConfirmRoleChangeModal({ members, onClose, onConfirm, action }) {
    const [selectedMember, setSelectedMember] = useState(null);
    const navigate = useNavigate();

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    /**
     * @description : Alert창 열릴 때
     * */
    const openAlert = (title) => {
        setAlertTitle(title);
        setAlertVisible(true);
    };

    /**
     * @description : Alert창 닫힐 때
     * */
    const closeAlert = () => {
        setAlertVisible(false);
    };


    const handleChange = (e) => {
        setSelectedMember(e.target.value);
    };

    const handleConfirm = () => {
        if (selectedMember) {
            onConfirm(selectedMember);
            onClose();// 부모 컴포넌트에서 전달된 onConfirm 함수 호출
        } else {
            openAlert("새로운 방장을 선택해주세요.");
        }
    };
    const handleClose = () => {
        onClose(); // 모달을 닫기 위한 상태 변경 혹은 기타 로직 실행

    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg relative w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">방장 전환</h2>
                <p className="mb-4">멤버들 중 한명을 선택하여 방장을 부여하세요.</p>

                <select
                    value={selectedMember || ""}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                >
                    <option value="" disabled>멤버 선택</option>
                    {
                        members.filter((member) => member.classmemberRole !== 1)
                            .map((member) => (

                                <option key={member.classmemberId} value={member.classmemberId}>
                                    {member.user.userNickname} ({member.user.userEmail})
                                </option>
                            ))}
                </select>

                <div className="flex justify-end space-x-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded"
                        onClick={handleClose}
                    >
                        취소
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={handleConfirm}
                    >
                        확인
                    </button>
                </div>


                <CustomAlert
                    title={alertTitle}
                    openAlert={alertVisible}
                    closeAlert={closeAlert}
                />
            </div>


        </div>



    );

}

export default ConfirmRoleChangeModal;