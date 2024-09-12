import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    TextField,
    IconButton, Tooltip, Switch
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom'; // useParams import
import CreateIcon from '@mui/icons-material/Create';

export default function UpdateBook() {
    const { bookId } = useParams(); // bookId 가져오기
    const navigate = useNavigate();

    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book/";

    // State 초기화
    const [category, setCategory] = useState('');
    const [visibility, setVisibility] = useState('전체 공개');
    const [coverImage, setCoverImage] = useState('');
    const [bookName, setBookName] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [totalPoints, setTotalPoints] = useState('');
    const [isChecked, setIsChecked] = useState(true);
    const [timeLimit, setTimeLimit] = useState('');
    const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookPhotoFile, setBookPhotoFile] = useState(null);

    // 사진 업로드 처리
    const photoUploadEvent = (e) => {
        const uploadFilename = e.target.files[0];
        setBookPhotoFile(uploadFilename);
        const localImageUrl = URL.createObjectURL(uploadFilename);
        setCoverImage(localImageUrl);
    };

    // 카테고리 목록 가져오기
    useEffect(() => {
        axios.get('/category/list')
            .then(res => setCategoryList(res.data))
            .catch(err => console.error(err));
    }, []);

    // 책 정보 가져오기
    useEffect(() => {
        if (bookId) {
            axios.get(`/book/${bookId}`)
                .then(res => {
                    const book = res.data;
                    console.log("book", book);
                    setBookName(book.bookTitle);
                    setBookDescription(book.bookDescription);
                    setCategory(book.category.categoryId);
                    setTotalPoints(book.bookTotalScore);
                    setTimeLimit(book.bookTimer);
                    setIsChecked(book.bookDivide === 1 ? true : false);
                    setIsTimeLimitEnabled(book.bookTimer === 0 ? false : true);
                    setCoverImage(photopath + book.bookImage);
                    setVisibility(book.bookStatus === 0 ? '전체 공개' : book.bookStatus === 1 ? '클래스 공개' : '비공개');
                    setSelectedClass(book.class1 !== null? book.class1.className : "");
                })
                .catch(err => console.error("Error fetching book data:", err));
        }
    }, [bookId]);

//클래스 목록 가져오는 거다냥
    useEffect(() => {
        if (visibility === '클래스 공개') {
            axios.get('/myclass/index')
                .then(res => {
                    console.log('클래스 목록 불러오기 성공:', res.data); // 성공적으로 가져온 클래스 목록을 콘솔에 출력
                    setClassList(res.data || []); // 만약 res.data가 undefined/null일 경우 기본값을 빈 배열로 설정
                })
                .catch(err => {
                    console.error('클래스 목록 불러오기 실패:', err); // 에러가 발생한 경우 콘솔에 출력
                    setClassList([]); // API 호출 실패 시 빈 배열로 초기화
                });
        }
    }, [visibility]);


    // Handle changes
    const handleCategoryChange = (event) => setCategory(event.target.value);
    const handleVisibilityChange = (event) => setVisibility(event.target.value);
    const handleBookNameChange = (e) => setBookName(e.target.value);
    const handleBookDescriptionChange = (e) => setBookDescription(e.target.value);
    const handleTotalPointsChange = (e) => setTotalPoints(e.target.value);
    const handleTimeLimitChange = (e) => setTimeLimit(e.target.value);
    const toggleSwitch = () => setIsChecked(prevState => !prevState);
    const toggleTimeSwitch = () => setIsTimeLimitEnabled(prevState => !prevState);
    const handleClassChange = (event) => setSelectedClass(event.target.value);

    // Form 제출 핸들러
    const handleSubmit = () => {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('bookTitle', bookName);
        formData.append('bookDescription', bookDescription);
        formData.append('bookStatus', visibility === '전체 공개' ? 0 : visibility === '클래스 공개' ? 1 : 2);
        formData.append('category', category);
        formData.append('bookTimer', timeLimit === '' ? 0 : parseInt(timeLimit, 10));
        formData.append('bookDivide', isChecked ? 1 : 0);
        formData.append('bookTotalscore', parseInt(totalPoints, 10) || 0);

        // 사진이 없는 경우 빈 문자열로 처리한다냥~
        if (bookPhotoFile) {
            formData.append('upload', bookPhotoFile); // 이미지 파일 추가
        } else {
            formData.append('upload', ''); // 빈 문자열을 전송한다냥~
        }

        axios.post('/book/newbook', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                navigate("/book/detail/" + bookId);
                console.log("Data saved successfully, navigating to /book/edit");
                console.log("d오오오오오오옹",res);
                // navigate("/book/edit/" + bookId);
            })
            .catch(err => {
                console.error("Update failed:", err);
                setError('Failed to update book');
            })
            .finally(() => setLoading(false));
    };

    // 취소 버튼 핸들러
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <main className="flex flex-col items-center w-full p-4 md:p-10">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-center">
                        문제집 수정
                    </h3>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <TextField
                            fullWidth
                            label="문제집 이름"
                            placeholder="문제집 이름"
                            value={bookName}
                            onChange={handleBookNameChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <TextField
                            fullWidth
                            multiline
                            label="문제집 설명"
                            placeholder="문제집 설명"
                            value={bookDescription}
                            onChange={handleBookDescriptionChange}
                        />
                    </div>
                    <div className="space-y-4">
                        <FormControl fullWidth>
                            <InputLabel id="visibility-label">공개범위</InputLabel>
                            <Select
                                labelId="visibility-label"
                                value={visibility}
                                label="공개범위"
                                onChange={handleVisibilityChange}
                            >
                                <MenuItem value={'전체 공개'}>전체 공개</MenuItem>
                                <MenuItem value={'클래스 공개'}>클래스 공개</MenuItem>
                                <MenuItem value={'비공개'}>비공개</MenuItem>
                            </Select>

                        </FormControl>
                        {visibility === '클래스 공개' && (
                            <FormControl fullWidth>
                                <InputLabel id="class-label">클래스 선택</InputLabel>
                                <Select
                                    labelId="class-label"
                                    value={selectedClass}
                                    label="클래스 선택"
                                    onChange={handleClassChange}
                                >
                                    {classList.length > 0 ? (
                                        classList.map((cls) => (
                                            <MenuItem key={cls.classId} value={cls.classId}>
                                                {cls.className}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>클래스가 없습니다</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        )}


                        <FormControl fullWidth>
                            <InputLabel id="category-label">카테고리</InputLabel>
                            <Select
                                labelId="category-label"
                                label="카테고리"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                {categoryList.map((row) => (
                                    <MenuItem key={row.categoryId} value={row.categoryId}>{row.categoryName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="space-y-2">
                        <TextField
                            fullWidth
                            label="문제집 총점(점)"
                            value={totalPoints}
                            onChange={handleTotalPointsChange}
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center space-x-2">
                            <label className="text-sm font-medium">제한시간 여부</label>
                            <Switch
                                checked={isTimeLimitEnabled}
                                onChange={toggleTimeSwitch}
                                color="primary"
                            />
                        </div>

                        {isTimeLimitEnabled && (
                            <TextField
                                fullWidth
                                label="제한시간 (분)"
                                value={timeLimit}
                                onChange={handleTimeLimitChange}
                            />
                        )}
                    </div>
                    <div className="space-y-2">
                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">문제집 표지</label>
                                <Tooltip title={'사진추가'}>
                                    <IconButton onClick={() => document.getElementById('file-input').click()}>
                                        <CreateIcon/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className="flex justify-center">
                                {coverImage !== '' ? (
                                    <img
                                        src={coverImage}
                                        alt="CoverImage"
                                        className="w-36 h-36 object-cover"
                                        height="150"
                                    />) : ("")}
                                <input
                                    type="file"
                                    id="file-input"
                                    accept="image/*"
                                    onChange={photoUploadEvent}
                                    style={{display: 'none'}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="items-center p-6 flex justify-between gap-4">
                    <Button
                        variant={"outlined"}
                        fullWidth
                        onClick={handleCancel}
                    >
                        취소
                    </Button>
                    <Button
                        fullWidth
                        variant={"contained"}
                        onClick={handleSubmit}
                    >
                        확인
                    </Button>
                </div>
            </div>
        </main>
    );
}