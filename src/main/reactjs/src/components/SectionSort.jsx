
// v0 by Vercel.
// https://v0.dev/t/pBkkdtsWv1X

import CustomConfirm from "./CustomConfirm";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {IconButton} from "@mui/material";


export default function SectionSort(props) {
    return (
        <>
            <div className="space-y-4 min-w-[400px]">

                <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center space-x-2">
                        <IconButton>
                            <DragIndicatorIcon/>
                        </IconButton>
                        <div>
                            <div>{props.title || "제목없는 섹션"+props.count}</div>
                            <div className="text-sm text-muted-foreground"> {props.count} 섹션 / {props.totalCount} 섹션</div>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <IconButton>
                            <ArrowUpwardIcon/>
                        </IconButton>
                        <IconButton>
                            <ArrowDownwardIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    );
}