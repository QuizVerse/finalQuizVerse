// // v0 by Vercel.
// // https://v0.dev/t/rQwPfCM4VGo

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, MenuItem, Select, InputLabel, FormControl, TextField, Switch, IconButton} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
export default function NewBook() {
    // Dropdown state
    const [category, setCategory] = useState({
        category_id:1,
        category_name:"초등",
    });
    const [visibility, setVisibility] = useState('');
    const [coverImage, setCoverImage] = useState('/placeholder.svg');

    const [bookName, setBookName] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [totalPoints, setTotalPoints] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [timeLimit, setTimeLimit] = useState('');
    const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(false); // 추가된 부분

    // Handle changes
    const handleCategoryChange = (event) => {
        categoryList.map((row)=>{
            if(row.category_id === event.target.value) setCategory(row);
        })
        console.log(category);
    };

    const handleVisibilityChange = (event) => {
        setVisibility(event.target.value);
    };

    const handleBookNameChange = (e) => setBookName(e.target.value);
    const handleBookDescriptionChange = (e) => setBookDescription(e.target.value);
    const handleTotalPointsChange = (e) => setTotalPoints(e.target.value);
    const handleTimeLimitChange = (e) => setTimeLimit(e.target.value);

    const toggleSwitch = () => {
        setIsChecked(prevState => !prevState);
    };

    // Time Limit Toggle 함수 추가
    const toggleTimeSwitch = () => {
        setIsTimeLimitEnabled(prevState => !prevState);
    };

    // Image Upload
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCoverImage(imageUrl);
        }
    };

    // Submit new book
    const handleSubmit = () => {
        const newBookData = {
            "book_title": bookName,
            "book_description": bookDescription,
            "book_status": 0,
            "category": category === '' ? null : category,
            "book_timer": timeLimit === '' ? 0 : parseInt(timeLimit, 10),
            "book_image": coverImage,
            "book_divide": isChecked ? 1 : 0,
            "book_totalgrade": parseInt(totalPoints, 10) || 0
        };

        axios.post('/new/newbook', newBookData)
            .then((res) => {
                console.log(res.data);
                navigate("/book/edit")
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // Cancel button logic
    const navigate = useNavigate();
    const handleCancel = () => {
        setBookName('');
        setBookDescription('');
        setCategory({});
        setVisibility('');
        setCoverImage('/placeholder.svg');
        setTotalPoints('');
        setIsChecked(false);
        setIsTimeLimitEnabled(false);
        setTimeLimit('');
        navigate(-1);
    };

    const [categoryList,setCategoryList]=useState([]);

    //처음 딱 한번 목록 가져오기
    useEffect(()=>{
        getDataList();
    },[]);

    const getDataList=()=>{
        axios({
            method:'get',
            url:'/category/list',
        }).then(res=>{
            console.log(res);
            setCategoryList(res.data);
        })
    }

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
                                value={category.category_name}
                                label="카테고리"
                                onChange={handleCategoryChange}
                            >
                                {categoryList &&
                                    categoryList.map((row) => (
                                        <MenuItem key={row.category_id} value={row.category_id}>{row.category_name}</MenuItem>
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
                                    <CreateIcon/>
                                </IconButton>
                            </div>

                            <div className={"flex justify-center"}>
                                {/* Image Preview */}
                                <img
                                    src={coverImage}
                                    alt="Cover"
                                    className="w-36 h-36 object-cover"
                                    width="150"
                                    height="150"
                                />
                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    id="file-input"
                                    accept="image/*"
                                    onChange={handleFileChange}
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
