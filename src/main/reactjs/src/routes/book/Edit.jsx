import React, { useState } from "react";
import { Button } from "@mui/material";
import Section from "../../components/Section";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Sidebar} from "lucide-react";
import EditSidebar from "../../components/EditSidebar";

export default function Edit() {
    // 섹션 목록을 상태로 관리
    const [sections, setSections] = useState([{ id: 1, title: "", description: "", questions: [{ id: 1, type: 3 }] }]);

    /**
     * @description : 섹션 추가 기능
     */
    const handleAddSection = () => {
        const newSection = {
            id: sections.length + 1,
            title: "",
            description: "",
            questions: [{ id: 1, type: 3 }]
        };
        setSections([...sections, newSection]);
    };

    /**
     * @description : 섹션 복제 기능
     */
    const handleDuplicateSection = (index) => {
        const newSection = { ...sections[index], id: sections.length + 1 };
        setSections([...sections, newSection]);
    };

    /**
     * @description : 섹션 삭제 기능
     */
    const handleDeleteSection = (index) => {
        if (sections.length > 1) {
            const newSections = sections.filter((_, i) => i !== index);
            setSections(newSections);
        }
    };

    /**
     * @description : 섹션 제목 및 설명 업데이트
     */
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
     * @description : 질문 추가 기능 (마지막 섹션에 추가)
     */
    const handleAddQuestion = () => {
        setSections((prevSections) => {
            const lastSectionIndex = prevSections.length - 1;
            const lastSection = prevSections[lastSectionIndex];
            const newQuestion = {
                id: lastSection.questions.length + 1,
                type: 3,
            };

            const updatedSections = [...prevSections];
            updatedSections[lastSectionIndex] = {
                ...lastSection,
                questions: [...lastSection.questions, newQuestion],
            };

            return updatedSections;
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <main className="p-24 space-y-4">
                <div className="flex justify-between">
                    <div className="flex space-x-2">
                        <Button variant={"outlined"} onClick={() => console.log("임시저장")}>임시저장</Button>
                        <Button variant={"outlined"}>AI 문제 출제</Button>
                        <Button variant={"contained"} onClick={() => console.log("출제하기")}>출제하기</Button>
                    </div>
                </div>

                {/* 섹션 리스트 렌더링 */}
                {sections.map((section, index) => (
                    <Section
                        key={section.id}
                        index={index}
                        title={section.title}
                        description={section.description}
                        questions={section.questions}
                        onDuplicate={() => handleDuplicateSection(index)}
                        onDelete={() => handleDeleteSection(index)}
                        onUpdateSection={(title, description) => handleUpdateSection(index, title, description)}
                    />
                ))}

                {/* EditSidebar를 추가하여 섹션 및 질문 추가 기능 연결 */}
                <EditSidebar onAddSection={handleAddSection} onAddQuestion={handleAddQuestion} />
            </main>
        </DndProvider>
    );
}
