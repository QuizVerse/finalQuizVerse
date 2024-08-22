import {Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function NewStudy() {
    // Dropdown state
    const [category, setCategory] = useState('');
    const [visibility, setVisibility] = useState('');
    const [coverImage, setCoverImage] = useState('/placeholder.svg');

    const [bookName, setBookName] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [totalMember, setTotalMember] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [timeLimit, setTimeLimit] = useState('');
    const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(false); // 추가된 부분

    // Handle changes
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleVisibilityChange = (event) => {
        setVisibility(event.target.value);
    };

    const handleBookNameChange = (e) => setBookName(e.target.value);
    const handleBookDescriptionChange = (e) => setBookDescription(e.target.value);
    const handleTotalMemberChange = (e) => setTotalMember(e.target.value);
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
            "book_category": category === '' ? null : category,
            "book_timer": timeLimit === '' ? 0 : parseInt(timeLimit, 10),
            "book_image": coverImage,
            "book_divide": isChecked ? 1 : 0,
            "book_totalgrade": parseInt(totalMember, 10) || 0
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
        setCategory('');
        setVisibility('');
        setCoverImage('/placeholder.svg');
        setTotalMember('');
        setIsChecked(false);
        setIsTimeLimitEnabled(false);
        setTimeLimit('');
        navigate(-1);
    };

    const [categoryList,setCategoryList] = useState([]);

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
        <>
            <main className="flex flex-col items-center w-full p-4 md:p-10">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-center">
                            화상스터디 개설
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <TextField
                                fullWidth
                                label="화상스터디 이름"
                                placeholder="화상스터디 이름"
                                value={bookName}
                                onChange={handleBookNameChange}
                            ></TextField>
                        </div>
                        <div className="space-y-2">
                            <TextField
                                fullWidth
                                label="화상스터디 설명"
                                placeholder="화상스터디 설명"
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
                                    value={category}
                                    label="카테고리"
                                    onChange={handleCategoryChange}
                                >
                                    {categoryList &&
                                        categoryList.map((row) => (
                                            <MenuItem key={row.category_id}
                                                      value={row.category_id}>{row.category_name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="space-y-2">
                            <TextField
                                fullWidth
                                label="화상스터디 인원"
                                placeholder="최대 20명"
                                value={totalMember}
                                onChange={handleTotalMemberChange}
                            ></TextField>
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                화상스터디 표지
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
                                        style={{display: 'none'}} // Hide the file input
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
        </>
    );
}