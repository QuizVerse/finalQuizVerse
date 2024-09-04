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
import {Link, useNavigate, useParams} from "react-router-dom";

export default function Edit() {

    const navigate = useNavigate(); // useNavigate를 사용하여 페이지 이동 처리

    // 데이터 관련 변수
    const {bookId} = useParams(); //URL에서 book_Id를 가져옴
    const [bookData, setBookData] = useState(null); // 책 데이터를 저장할 상태 추가
    const [sections, setSections] = useState([]);

    // 로딩 상태
    const [loading, setLoading] = useState(true);

    // confirm state
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [deleteSectionIndex, setDeleteSectionIndex] = useState(0);
    const [confirmId, setConfirmId] = useState(0);


    // alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    // sectionSort Alert state
    const [sectionSortVisible, setSectionSortVisible] = useState(false);

    // bookId에 해당하는 책 데이터를 가져옴
    useEffect(() => {
        const fetchData = async () => {
            try {
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
            openConfirm(14); // 섹션 삭제 confirm 열기
        } else {
            openAlert("삭제할 수 없습니다. 섹션은 최소 하나는 있어야 합니다.");
        }
    };

    // 섹션 업데이트
    const handleUpdateSection = (index, updated) => {
        const updatedSections = [...sections];
        updatedSections[index] = {
            ...updatedSections[index],
            ...updated
        };
        setSections(updatedSections);
    };

    // 섹션 재정렬
    const handleSortChange = (newSortData) => {
        setSections(newSortData);
        newSortData.forEach((e, index) => e.sectionNumber = index);
    };

    // Image Upload 사진 업로드
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

    /** 모달 관련 함수 */
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
    const openConfirm = (confirmId) => {
        setConfirmId(confirmId);
        setConfirmVisible(true);
    };

    /**
     * @description : 취소 버튼 클릭시 실행되는 로직
     * */
    const clickBtn1 = () => {
        if(confirmId === 14) setDeleteSectionIndex('');
        setConfirmId(0);
        setConfirmVisible(false);
    };

    /**
     * @description : 확인 버튼 클릭시 실행되는 로직
     * */
    const clickBtn2 = () => {
        setConfirmVisible(false);
        if(confirmId === 14){
            const section = sections[deleteSectionIndex];
            axios({
                method: 'delete',
                url: '/book/section/delete/' + section.sectionId,
            }).then(res => {
                console.log(res);
                setSections(sections.filter((_, i) => i !== deleteSectionIndex));
                setConfirmId(0)
            })
        } else if (confirmId === 16) {
            saveOrUpdateBook(false).then(r => navigate("/mypage/publishedbook"));
        } else {
            console.log("confirm Id 잘못됨");
        }

    };

    // 출제 혹은 임시저장
    const saveOrUpdateBook = async (isPublished) => {
        try {
            const response = await axios.post('/edit/publish', bookData, {
                params: {
                    isPublished: isPublished
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('저장된 책 정보:', response.data);
            return response.data; // 저장된 책 정보를 반환
        } catch (error) {
            console.error('책 저장 중 오류가 발생했습니다:', error);
            throw error; // 오류를 호출한 쪽에서 처리할 수 있도록 던짐
        }
    };

    // 섹션 재정렬 모달 켜기
    const openSortSection = () => {
        setSectionSortVisible(true);
    }

    /**
     * @description : 임시저장 버튼 클릭시 실행
     * */
    const handlePublishTemporary = () => {
        openConfirm(16);
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
                        <Button variant={"outlined"} onClick={handlePublishTemporary}>임시저장</Button>
                        <Button variant={"outlined"}>
                            <Link to={"/book/questionpreview"}>AI 문제 출제</Link>
                        </Button>
                        <Button variant={"contained"}>
                            <Link to={"/book/questionpreview/"+bookId}>출제하기</Link>
                        </Button>
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
                        onUpdateSection={(updated) => handleUpdateSection(index, updated)}
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

                {/* Confirm */}
                <CustomConfirm
                    id={confirmId} // 섹션삭제 : 14, 임시저장 : 16
                    openConfirm={confirmVisible}
                    clickBtn1={clickBtn1}
                    clickBtn2={clickBtn2}
                ></CustomConfirm>
            </main>
        </DndProvider>
    );
}
