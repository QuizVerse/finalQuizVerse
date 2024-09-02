import React, {useEffect, useState} from "react";
import { Button } from "@mui/material";
import Section from "../../components/Section";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditSidebar from "../../components/EditSidebar";
import CustomAlert from "../../components/modal/CustomAlert";
import CustomConfirm from "../../components/modal/CustomConfirm";
import SectionSort from "../../components/modal/SectionSort";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Edit() {

    const {bookId} = useParams(); //URL에서 book_Id를 가져옴
    const [bookData, setBookData] = useState(null); // 책 데이터를 저장할 상태 추가
    const [loading, setLoading] = useState(true); // 로딩 상태 추가

    // confirm state
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [deleteSectionIndex, setDeleteSectionIndex] = useState(0);

    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    // sectionSort Alert state
    const [sectionSortVisible, setSectionSortVisible] = useState(false);

    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // bookId에 해당하는 책 데이터를 가져옴
                axios.get(`/book/edit/${bookId}`)
                    .then((res)=>{
                    setBookData(res.data.book);
                    setSections(res.data.sections);
                });
                setLoading(false); // 모든 데이터를 성공적으로 가져온 후 로딩 상태를 false로 변경
            } catch (error) {
                console.error("Error fetching book, section data:", error);
                setLoading(false); // 에러 발생 시 로딩을 종료하고 콘솔에 에러 출력
            }
        };

        fetchData(); // 데이터를 가져오는 함수 호출
    }, [bookId]);


    // side bar에서 섹션 추가
    const handleAddSection = () => {
        const newSection = {
            sectionNumber: sections.length + 1,
            sectionTitle: "",
            sectionDescription: "",
            sectionImage: "",
            book: bookData
        };

        axios({
            method:'post',
            url:'/book/section/new',
            data: newSection
        }).then(res=>{
            console.log(res.data);
            setSections([...sections, res.data]);
        })

    };

    // 섹션 복제
    const handleDuplicateSection = (index) => {
        const duplicatedSection = {
            ...sections[index],
            sectionId : "",
            sectionNumber: sections.length + 1,
        };

        axios({
            method:'post',
            url:'/book/section/new',
            data: duplicatedSection
        }).then(res=>{
            console.log(res.data);
            setSections([...sections, res.data]);
            openAlert("섹션이 복제되었습니다.");
        })
    };

    // 섹션 삭제
    const handleDeleteSection = (index) => {
        if (sections.length > 1) {
            setDeleteSectionIndex(index);
            openConfirm();
        } else {
            openAlert("삭제할 수 없습니다. 섹션은 최소 하나는 있어야 합니다.");
        }
    };

    // sections 상태가 변경될 때마다 1초 뒤에 저장하도록 하는 useEffect 추가
    useEffect(() => {
        const timer = setTimeout(() => {
            axios.post('/book/section/saveall', sections)
                .then(res => {
                    console.log('섹션이 저장되었습니다:', res);
                })
                .catch(error => {
                    console.error('섹션 저장 중 오류가 발생했습니다:', error);
                });
        }, 1000); // 1초 뒤에 저장

        // 컴포넌트가 언마운트되거나 sections가 변경되기 전에 타이머를 클리어
        return () => clearTimeout(timer);
    }, [sections]);


    const handleUpdateSection = (index, title, description) => {
        const updatedSections = [...sections];
        updatedSections[index] = {
            ...updatedSections[index],
            sectionTitle: title,
            sectionDescription: description
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
        setSectionSortVisible(false);
    };

    /**
     * @description : Confirm창 열릴 때
     * */
    const openConfirm = () => {
        setDeleteConfirm(true);
    };

    /**
     * @description : 취소 버튼 클릭시 실행되는 로직
     * */
    const clickBtn1 = () => {
        setDeleteConfirm(false);
        setDeleteSectionIndex('');
    };

    /**
     * @description : 확인 버튼 클릭시 실행되는 로직
     * */
    const clickBtn2 = () => {
        setDeleteConfirm(false);
        const section = sections[deleteSectionIndex];
        axios({
            method: 'delete',
            url: '/book/section/delete/' + section.sectionId,
        }).then(res => {
            console.log(res);
            setSections(sections.filter((_, i) => i !== deleteSectionIndex));
        })
    };

    const handleSortChange = (newSortData) => {
        setSections(newSortData);
        newSortData.forEach((e, index) => e.sectionNumber = index);
    };

    // // 출제하기 버튼 클릭 시 실행되는 로직 추가
    // const handlePublish = () => {
    //     console.log(sections)
    //     axios({
    //         method:'post',
    //         url:'/book/section/saveall',
    //         data: sections,
    //     }).then(res=>{
    //         console.log(res)
    //     })
    // };

    // 섹션 재정렬 모달 켜기
    const openSortSection = () => {
        setSectionSortVisible(true);
    }


    // Image Upload
    const handleFileChange = (event, index) => {
        const file = event.target.files[0];

        const uploadForm=new FormData();
        uploadForm.append("upload",file);

        axios({
            method:'post',
            url:'/book/edit/upload',
            data:uploadForm,
            headers:{'Content-Type':'multipart/form-data'},
        }).then(res=>{
            console.log("saved picture", res.data);
            const updated = [...sections];
            updated[index] = {
                ...updated[index],
                sectionImage: res.data.photo,
            }
            setSections(updated);
        })
    };

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시
    }

    if (!bookData) {
        return <div>No data found</div>; // 데이터가 없을 때 표시
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <main className="p-24 space-y-4">
                <div className="flex justify-end">
                    <div className="flex space-x-2">
                        <Button variant={"outlined"} onClick={() => console.log("임시저장")}>임시저장</Button>
                        <Button variant={"outlined"} onClick={() => console.log("AI 문제 출제") }>AI 문제 출제</Button>
                        <Button variant={"contained"}
                                // onClick={handlePublish}
                        >출제하기</Button>
                    </div>
                </div>

                {sections && sections.map((section, index) => (
                    <Section
                        key={index}
                        index={index}
                        title={section.sectionTitle}
                        description={section.sectionDescription}
                        sectionCount={sections.length}
                        questions={section.questions}
                        section={section}
                        book={bookData}
                        loading={loading}
                        setLoading={setLoading}
                        onUploadImage={(e, inputType) => handleFileChange(e, index)}
                        onDuplicate={() => handleDuplicateSection(index)}  // 상위 컴포넌트의 handleDuplicateSection을 사용
                        onDelete={() => handleDeleteSection(index)}         // 상위 컴포넌트의 handleDeleteSection을 사용
                        onUpdateSection={(title, description) => handleUpdateSection(index, title, description)}
                    />
                ))}
                <EditSidebar onAddSection={handleAddSection} onSortSection={openSortSection}/>

                <CustomAlert
                    title={alertTitle}
                    openAlert={alertVisible}
                    closeAlert={closeAlert}
                />

                {/* 섹션 재정렬 Alert */}
                <CustomAlert
                    title={"섹션 재정렬"}
                    content={
                        <SectionSort
                            sortData={sections}
                            onSortChange={handleSortChange}/>
                    }
                    openAlert={sectionSortVisible}
                    closeAlert={closeAlert}
                ></CustomAlert>

                {/* 삭제 Confirm */}
                <CustomConfirm
                    id={14} // 섹션삭제 : 14, 문제삭제 : 15
                    openConfirm={deleteConfirm}
                    clickBtn1={clickBtn1}
                    clickBtn2={clickBtn2}
                ></CustomConfirm>
            </main>
        </DndProvider>
    );
}
