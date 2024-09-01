import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    TextField,
    Switch,
    IconButton,
    ImageList
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';

export default function NewBook() {
    // Dropdown state
    const [category, setCategory] = useState('');
    const [visibility, setVisibility] = useState('전체 공개');
    const [coverImage, setCoverImage] = useState('');
    // const [coverImage, setCoverImage] = useState('/placeholder.svg');
    const [bookName, setBookName] = useState('사진테스트');
    const [bookDescription, setBookDescription] = useState('제발');
    const [totalPoints, setTotalPoints] = useState('100');
    const [isChecked, setIsChecked] = useState(true);
    const [timeLimit, setTimeLimit] = useState('10');
    const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(true);
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //사진 업로드
    const [bookphoto, setBookphoto] = useState('');
    const photopath="https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";


    const photoUploadEvent = (e) => {
        const uploadFilename = e.target.files[0];
        const uploadForm = new FormData();
        uploadForm.append("upload", uploadFilename);

        // 로컬 파일 URL을 생성하여 미리보기 설정
        const localImageUrl = URL.createObjectURL(uploadFilename);
        setCoverImage(localImageUrl);

        axios.post('/book/upload', uploadForm, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(res => {
                if (res.data && res.data.bookphoto) {
                    setBookphoto(res.data.bookphoto); // 서버 응답에서 사진 파일명 설정
                    // 실제 서버에 업로드된 파일을 미리보기로 설정합니다.
                    setCoverImage(`${photopath}/${res.data.bookphoto}`);
                } else {
                    console.error("서버 응답에 bookphoto가 없습니다.");
                    setError('파일 업로드에 실패했습니다.');
                }
            })
            .catch(err => {
                console.error("File upload failed:", err); // 콘솔에 에러를 출력
                setError('파일 업로드에 실패했습니다.'); // 사용자에게 에러 메시지를 표시
            });
    };




    // 카테고리 목록 가져오기
    useEffect(() => {
        getDataList();
    }, []);

    const getDataList = () => {
        axios.get('/category/list')
            .then(res => {
                setCategoryList(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    };

    // Handle changes
    const handleCategoryChange = (event) => setCategory(event.target.value);
    const handleVisibilityChange = (event) => setVisibility(event.target.value);
    const handleBookNameChange = (e) => setBookName(e.target.value);
    const handleBookDescriptionChange = (e) => setBookDescription(e.target.value);
    const handleTotalPointsChange = (e) => setTotalPoints(e.target.value);
    const handleTimeLimitChange = (e) => setTimeLimit(e.target.value);
    const toggleSwitch = () => setIsChecked(prevState => !prevState);
    const toggleTimeSwitch = () => setIsTimeLimitEnabled(prevState => !prevState);

    // Submit new book
    const handleSubmit = () => {
        setLoading(true);
        setError(null);
        let selectedCategory = categoryList.find(row => row.categoryId === category) || {};
        const newBookData = {
            bookTitle: bookName,
            bookDescription: bookDescription,
            bookStatus: visibility === '전체 공개' ? 0 : visibility === '클래스 공개' ? 1 : 2,
            category: selectedCategory,
            bookTimer: timeLimit === '' ? 0 : parseInt(timeLimit, 10),
            bookImage: coverImage,
            bookDivide: isChecked ? 1 : 0,
            bookTotalscore: parseInt(totalPoints, 10) || 0,
            bookphoto: bookphoto
        };

        axios.post('/book/newbook', newBookData)
            .then((res) => {
                console.log("Data saved successfully, navigating to /book/edit");
                navigate("/book/edit");
            })
            .catch((err) => {
                console.log("머가 단단히 잘못되었다..");
                console.error(err);
                setError('Failed to create new book');
            })
            .finally(() => {
                setLoading(false);
            });
    };


    // Cancel button logic
    const handleCancel = () => {
        setBookName('');
        setBookDescription('');
        setCategory({});
        setVisibility('');
        setCoverImage('');
        // setCoverImage('/placeholder.svg');
        setTotalPoints('');
        setIsChecked(false);
        setIsTimeLimitEnabled(false);
        setTimeLimit('');
        navigate(-1);
    };

    return (
        <main className="flex flex-col items-center w-full p-4 md:p-10">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-center">
                        문제집 생성
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
                        ></TextField>
                    </div>
                    <div className="space-y-2">
                        <TextField
                            fullWidth
                            label="문제집 설명"
                            placeholder="문제집 설명"
                            value={bookDescription}
                            onChange={handleBookDescriptionChange}
                        ></TextField>
                    </div>
                    <div className="space-y-4">
                        {/* Visibility Dropdown */}
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

                        {/* Category Dropdown */}
                        <FormControl fullWidth>
                            <InputLabel id="category-label">카테고리</InputLabel>
                            <Select
                                labelId="category-label"
                                label="카테고리"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                {categoryList &&
                                    categoryList.map((row) => (
                                        <MenuItem key={row.categoryId} value={row.categoryId}>{row.categoryName}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="space-y-2">
                        <TextField
                            fullWidth
                            label="문제집 총점(점)"
                            placeholder="100"
                            value={totalPoints}
                            onChange={handleTotalPointsChange}
                        ></TextField>
                    </div>
                    <div className="flex justify-between items-center space-x-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            점수 균등 분배
                        </label>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={isChecked}
                            data-state={isChecked ? "checked" : "unchecked"}
                            className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${isChecked ? "bg-blue-600" : "bg-gray-300"}`}
                            onClick={toggleSwitch}
                        >
                            <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${isChecked ? "translate-x-5 bg-white" : "translate-x-0 bg-gray-500"}`}></span>
                        </button>
                    </div>
                    <div className="space-y-4">
                        {/* Toggle Button for Time Limit */}
                        <div className="flex justify-between items-center space-x-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                제한시간 여부
                            </label>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={isTimeLimitEnabled}
                                data-state={isTimeLimitEnabled ? "checked" : "unchecked"}
                                className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${isTimeLimitEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                                onClick={toggleTimeSwitch}
                            >
                                <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${isTimeLimitEnabled ? 'translate-x-5 bg-white' : 'translate-x-0 bg-gray-500'}`}></span>
                            </button>
                        </div>

                        {/* Conditional Input Field for Time Limit */}
                        {isTimeLimitEnabled && (
                            <TextField
                                fullWidth
                                label="제한시간 (분)"
                                placeholder="100"
                                value={timeLimit}
                                onChange={handleTimeLimitChange}
                            ></TextField>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            문제집 표지
                        </label>
                        <div className="relative">
                            {/* Upload Button */}
                            <div className={"flex justify-end"}>
                                <IconButton onClick={() => document.getElementById('file-input').click()}>
                                    <CreateIcon />
                                </IconButton>
                            </div>
                            <div className={"flex justify-center"}>
                                {/* Image Preview */}
                                <img
                                    src={coverImage}
                                    alt="CoverImage"
                                    className="w-36 h-36 object-cover"
                                    width="150"
                                    height="150"
                                />
                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    id="file-input"
                                    accept="image/*"
                                    onChange={photoUploadEvent}
                                    style={{ display: 'none' }} // Hide the file input
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="items-center p-6 flex justify-between gap-4">
                    <Button
                        variant={"outlined"}
                        fullWidth
                        onClick={handleCancel}>
                        취소
                    </Button>
                    <Button
                        fullWidth
                        variant={"contained"}
                        onClick={handleSubmit}>
                        확인
                    </Button>
                </div>
            </div>
        </main>
    );
}
