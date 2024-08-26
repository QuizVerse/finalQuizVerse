import React, { useState } from "react";
import { Button } from "@mui/material";
import Section from "../../components/Section";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sidebar } from "lucide-react";
import EditSidebar from "../../components/EditSidebar";
import CustomAlert from "../../components/modal/CustomAlert";
import CustomConfirm from "../../components/modal/CustomConfirm";
import SectionSort from "../../components/modal/SectionSort";
export default function Edit() {
    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const [sections, setSections] = useState([
        { id: 1, title: "", description: "", questions: [{ id: 1, type: 3 }] }
    ]);

    const handleAddSection = () => {
        const newSection = {
            id: sections.length + 1,
            title: "",
            description: "",
            questions: [{ id: 1, type: 3 }]
        };
        setSections([...sections, newSection]);
    };

    const handleDuplicateSection = (index) => {
        const duplicatedSection = {
            ...sections[index],
            id: sections.length + 1,
            questions: sections[index].questions.map((q, i) => ({ ...q, id: i + 1 }))
        };
        setSections([...sections, duplicatedSection]);
        openAlert("섹션이 복제되었습니다.");
    };

    const handleDeleteSection = (index) => {
        if (sections.length > 1) {
            setSections(sections.filter((_, i) => i !== index));
            openAlert("섹션이 삭제되었습니다.");
        } else {
            openAlert("삭제할 수 없습니다. 섹션은 최소 하나는 있어야 합니다.");
        }
    };

    const handleUpdateSection = (index, title, description) => {
        const updatedSections = [...sections];
        updatedSections[index] = {
            ...updatedSections[index],
            title: title,
            description: description
        };
        setSections(updatedSections);
    };


    /**
     * @description : Alert창 열릴 때
     * */
    const openAlert = (alertTitle) => {
        setAlertTitle(alertTitle);
        setAlertVisible(true);
    };

    /**
     * @description : Alert창 닫힐 때
     * */
    const closeAlert = () => {
        setAlertVisible(false);
    };


    // confirm state
    const [confirmVisible, setConfirmVisible] = useState(false);

    /**
     * @description : Confirm창 열릴 때
     * */
    const openConfirm = () => {
        setConfirmVisible(true);
    };

    /**
     * @description : 취소 버튼 클릭시 실행되는 로직
     * */
    const clickBtn1 = () => {
        setConfirmVisible(false);
    };

    /**
     * @description : 확인 버튼 클릭시 실행되는 로직
     * */
    const clickBtn2 = () => {

        setConfirmVisible(false);
    };


    const handleSortChange = (newSortData) => {
        setSections(newSortData);
        // 필요에 따라 상태 업데이트 또는 API 호출 등 추가 작업 수행
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <main className="p-24 space-y-4">
                <div className="flex justify-end">
                    <div className="flex space-x-2">
                        <Button variant={"outlined"} onClick={() => console.log("임시저장")}>임시저장</Button>
                        <Button variant={"outlined"} onClick={() => console.log("AI 문제 출제") }>AI 문제 출제</Button>
                        <Button variant={"contained"} onClick={() => console.log("출제하기")}>출제하기</Button>
                    </div>
                </div>

                {sections.map((section, index) => (
                    <Section
                        key={section.id}
                        index={index}
                        title={section.title}
                        description={section.description}
                        sectionCount={sections.length}
                        questions={section.questions}
                        openConfirm={openConfirm}
                        onDuplicate={() => handleDuplicateSection(index)}  // 상위 컴포넌트의 handleDuplicateSection을 사용
                        onDelete={() => handleDeleteSection(index)}         // 상위 컴포넌트의 handleDeleteSection을 사용
                        onUpdateSection={(title, description) => handleUpdateSection(index, title, description)}
                    />
                ))}
                <EditSidebar onAddSection={handleAddSection}/>

                <CustomAlert
                    title={alertTitle}
                    openAlert={alertVisible}
                    closeAlert={closeAlert}
                />


                {/* 섹션 재정렬 Confirm */}
                <CustomConfirm
                    id={7}
                    content={
                        <SectionSort
                            sortData={sections}
                            onSortChange={handleSortChange}
                        />
                    }
                    openConfirm={confirmVisible}
                    clickBtn1={clickBtn1}
                    clickBtn2={clickBtn2}
                ></CustomConfirm>
            </main>
        </DndProvider>
    );
}
