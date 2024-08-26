import React, { useState } from "react";
import { Button } from "@mui/material";
import Section from "../../components/Section";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Sidebar } from "lucide-react";
import EditSidebar from "../../components/EditSidebar";
import CustomAlert from "../../components/modal/CustomAlert";
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

    return (
        <DndProvider backend={HTML5Backend}>
            <main className="p-24 space-y-4">
                {sections.map((section, index) => (
                    <Section
                        key={section.id}
                        index={index}
                        title={section.title}
                        description={section.description}
                        questions={section.questions}
                        onDuplicate={() => handleDuplicateSection(index)}  // 상위 컴포넌트의 handleDuplicateSection을 사용
                        onDelete={() => handleDeleteSection(index)}         // 상위 컴포넌트의 handleDeleteSection을 사용
                        onUpdateSection={(title, description) => handleUpdateSection(index, title, description)}
                    />
                ))}
                <EditSidebar onAddSection={handleAddSection} />

                <CustomAlert
                    title={alertTitle}
                    openAlert={alertVisible}
                    closeAlert={closeAlert}
                />
            </main>
        </DndProvider>
    );
}
