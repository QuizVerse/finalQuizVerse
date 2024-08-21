// v0 by Vercel.
// https://v0.dev/t/rQwPfCM4VGo

import { useState } from 'react';
import axios from 'axios';
import {Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';


export default function NewBook() {
    //Dropdown Button
    const [dropdownState, setDropdownState] = useState({
        isVisibilityDropdownOpen: false,
        selectedVisibilityOption: '공개 범위를 선택해 주세요',
        isCategoryDropdownOpen: false,
        selectedCategory: '카테고리를 선택해 주세요',
    });

    const toggleDropdown = (dropdownType) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [dropdownType]: !prevState[dropdownType],
        }));
    };

// Generalized select function for dropdown options
    const handleOptionSelect = (dropdownType, option) => {
        setDropdownState((prevState) => ({
            ...prevState,
            [dropdownType]: option,
            [`is${dropdownType}Open`]: false, // Close the dropdown after selecting an option
        }));
    };

// Example usage for visibility dropdown
    const toggleVisibilityDropdown = () => toggleDropdown('isVisibilityDropdownOpen');
    const handleVisibilityOptionSelect = (option) => handleOptionSelect('selectedVisibilityOption', option);

// Example usage for category dropdown
    const toggleCategoryDropdown = () => toggleDropdown('isCategoryDropdownOpen');
    const handleCategorySelect = (category) => handleOptionSelect('selectedCategory', category);


    // Image Upload
    // State to store the selected image file
    const [coverImage, setCoverImage] = useState('/placeholder.svg'); // Default image URL

    // Handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Create a URL for the selected image file
            const imageUrl = URL.createObjectURL(file);
            setCoverImage(imageUrl);
        }
    };


    ///// Chat GPT
    const [bookName, setBookName] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [totalPoints, setTotalPoints] = useState('');
    // const [isChecked, setIsChecked] = useState(false);
    // const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(false);
    const [timeLimit, setTimeLimit] = useState('');

    // Handle book name and description change
    const handleBookNameChange = (e) => setBookName(e.target.value);
    const handleBookDescriptionChange = (e) => setBookDescription(e.target.value);
    const handleTotalPointsChange = (e) => setTotalPoints(e.target.value);
    const handleTimeLimitChange = (e) => setTimeLimit(e.target.value);
    /////

    const visibilityOptions = ['전체 공개', '클래스 공개', '비공개', ''];
    const categories = ['초등','중등', '고등', '자격증/시험', '외국어'];

    //Toggle Switch
    const [isChecked, setIsChecked] = useState(false);

    const toggleSwitch = () => {
        setIsChecked(prevState => !prevState);
    };

    //Time Limit Toggle
    // State to manage the toggle button and the visibility of the time input
    const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(false);

    // Toggle function to switch between enabled and disabled states
    const toggleTimeSwitch = () => {
        setIsTimeLimitEnabled(prevState => !prevState);
    };


    ///// Chat GPT
    // Submit new book
    const handleSubmit = () => {
        const newBookData = {
            "book_title": bookName,
            "book_description": bookDescription,
            "book_status": 0,
            "book_category": null,
            "book_timer": 0,
            "book_image": coverImage, // Assuming you upload this later
            "book_divide":0, //on이면 1
            "book_totalgrade":10
        };

        axios
            .post('/new/newbook', newBookData)
            .then((res) => {
                console.log(res.data);
                // Handle success, e.g., show a success message or navigate
            })
            .catch((err) => {
                console.error(err);
                // Handle error, e.g., show an error message
            });
    };

    //Cancle Button Logic
    const navigate = useNavigate();
    const handleCancel = () => {
        setBookName('');
        setBookDescription('');
        setDropdownState({
            isVisibilityDropdownOpen: false,
            selectedVisibilityOption: '공개 범위를 선택해 주세요',
            isCategoryDropdownOpen: false,
            selectedCategory: '카테고리를 선택해 주세요',
        });
        setCoverImage('/placeholder.svg');
        setTotalPoints('');
        setIsChecked(false);
        setIsTimeLimitEnabled(false);
        setTimeLimit('');
        navigate(-1); // Navigate to the previous page
    };
    /////

    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            <header className="flex items-center justify-between w-full h-16 px-4 border-b shrink-0 md:px-6">
                <div className="flex items-center gap-2 text-lg font-semibold">
                    <span>QuizVerse</span>
                </div>
                <nav className="flex items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
                    <a className="font-bold" href="#">
                        문제집 목록
                    </a>
                    <a className="text-muted-foreground" href="#">
                        화상스터디
                    </a>
                </nav>
                <div className="flex items-center gap-4">
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                        로그아웃
                    </button>
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">유</span>
        </span>
                </div>
            </header>
            <main className="flex flex-col items-center w-full p-4 md:p-10">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl"
                     data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-center">
                            문제집 생성
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="name"
                            >
                                문제집 이름
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="name"
                                placeholder="문제집 이름"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="description"
                            >
                                문제집 설명
                            </label>
                            <textarea
                                className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="description"
                                placeholder="문제집 설명"
                            />
                        </div>
                        <div className="space-y-4">
                            {/* Visibility Dropdown */}
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="visibility"
                                >
                                    공개범위
                                </label>
                                <button
                                    type="button"
                                    role="combobox"
                                    aria-controls="visibility-dropdown"
                                    aria-expanded={dropdownState.isVisibilityDropdownOpen}
                                    aria-autocomplete="none"
                                    dir="ltr"
                                    data-state={dropdownState.isVisibilityDropdownOpen ? "open" : "closed"}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="visibility"
                                    onClick={toggleVisibilityDropdown}
                                >
                                    <span>{dropdownState.selectedVisibilityOption}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`lucide lucide-chevron-down h-4 w-4 opacity-50 transition-transform ${dropdownState.isVisibilityDropdownOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    >
                                        <path d="m6 9 6 6 6-6"></path>
                                    </svg>
                                </button>

                                {dropdownState.isVisibilityDropdownOpen && (
                                    <ul
                                        id="visibility-dropdown"
                                        className="mt-2 w-full rounded-md border border-input bg-background shadow-md"
                                    >
                                        {visibilityOptions.map(option => (
                                            <li
                                                key={option}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleVisibilityOptionSelect(option)}
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {/* Category Dropdown */}
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="category"
                                >
                                    카테고리
                                </label>
                                <button
                                    type="button"
                                    role="combobox"
                                    aria-controls="category-dropdown"
                                    aria-expanded={dropdownState.isCategoryDropdownOpen}
                                    aria-autocomplete="none"
                                    dir="ltr"
                                    data-state={dropdownState.isCategoryDropdownOpen ? "open" : "closed"}
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="category"
                                    onClick={toggleCategoryDropdown}
                                >
                                    <span>{dropdownState.selectedCategory}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`lucide lucide-chevron-down h-4 w-4 opacity-50 transition-transform ${dropdownState.isCategoryDropdownOpen ? 'rotate-180' : ''}`}
                                        aria-hidden="true"
                                    >
                                        <path d="m6 9 6 6 6-6"></path>
                                    </svg>
                                </button>

                                {dropdownState.isCategoryDropdownOpen && (
                                    <ul
                                        id="category-dropdown"
                                        className="mt-2 w-full rounded-md border border-input bg-background shadow-md"
                                    >
                                        {categories.map(category => (
                                            <li
                                                key={category}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                {category}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                for="points"
                            >
                                문제집 총점(점)
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="points"
                                placeholder="100"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="equal-distribution"
                            >
                                점수 균등 분배
                            </label>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={isChecked}
                                data-state={isChecked ? "checked" : "unchecked"}
                                className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                                    isChecked ? "bg-blue-600" : "bg-gray-300" //background color for the button
                                }`}
                                id="equal-distribution"
                                onClick={toggleSwitch}
                            >
                <span
                    data-state={isChecked ? "checked" : "unchecked"}
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                        isChecked ? "translate-x-5 bg-white" : "translate-x-0 bg-gray-500"
                    }`}
                ></span>
                            </button>
                            <input
                                type="checkbox"
                                aria-hidden="true"
                                tabIndex="-1"
                                checked={isChecked}
                                onChange={toggleSwitch}
                                style={{display: 'none'}} // Hide the default checkbox
                            />
                        </div>
                        <div className="space-y-4">
                            {/* Toggle Button for Time Limit */}
                            <div className="flex items-center space-x-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="time-limit"
                                >
                                    제한시간 여부
                                </label>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={isTimeLimitEnabled}
                                    data-state={isTimeLimitEnabled ? "checked" : "unchecked"}
                                    className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                                        isTimeLimitEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    id="time-limit"
                                    onClick={toggleTimeSwitch}
                                >
                    <span
                        data-state={isTimeLimitEnabled ? "checked" : "unchecked"}
                        className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                            isTimeLimitEnabled ? 'translate-x-5 bg-white' : 'translate-x-0 bg-gray-500'}`}
                    ></span>
                                </button>
                            </div>

                            {/* Conditional Input Field for Time Limit */}
                            {isTimeLimitEnabled && (
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="time"
                                    >
                                        제한시간 (분)
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="time"
                                        placeholder="10"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="cover"
                            >
                                문제집 표지
                            </label>
                            <div className="relative">
                                {/* Image Preview */}
                                <img
                                    src={coverImage}
                                    alt="Cover"
                                    className="w-36 h-36 object-cover"
                                    width="150"
                                    height="150"
                                />
                                {/* Upload Button */}
                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 absolute bottom-2 right-2"
                                    onClick={() => document.getElementById('file-input').click()}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-4 h-4"
                                    >
                                        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                        <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                                    </svg>
                                </button>
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
                    <div className="items-center p-6 flex justify-between">
                        <Button
                            onClick={handleCancel}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                            취소
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                            확인
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
