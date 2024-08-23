import { useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';

function DraggableRow({ row, index, moveRow, arrLength }) {

    return (
        <div
            key={row.id}
            className="flex items-center justify-between p-4 border rounded-md"
        >
            <div className="flex items-center space-x-2">
                <div>
                    <div>{row.title || '제목없는 섹션'}</div>
                    <div className="text-sm text-muted-foreground">
                        {index + 1} 섹션 / {arrLength} 섹션
                    </div>
                </div>
            </div>
            <div className="flex space-x-2">
                {/* 위로 이동 버튼 */}
                <IconButton
                    onClick={() => moveRow(index, index - 1)}
                    disabled={index === 0} // 첫 번째 섹션이면 비활성화
                >
                    <ArrowUpwardIcon />
                </IconButton>

                {/* 아래로 이동 버튼 */}
                <IconButton
                    onClick={() => moveRow(index, index + 1)}
                    disabled={index === arrLength - 1} // 마지막 섹션이면 비활성화
                >
                    <ArrowDownwardIcon />
                </IconButton>
            </div>
        </div>
    );
}

// 섹션 리스트를 관리하고, 드래그 앤 드롭 기능을 제공하는 메인 컴포넌트입니다.
export default function SectionSort({ sortData }) {
    const [rows, setRows] = useState(sortData); // 부모 컴포넌트에서 전달된 섹션 리스트의 상태를 관리합니다.

    // 섹션의 순서를 변경하는 함수입니다.
    const moveRow = (fromIndex, toIndex) => {
        // toIndex가 배열의 범위를 벗어나지 않도록 체크합니다.
        if (toIndex < 0 || toIndex >= rows.length) return;

        const updatedRows = [...rows];
        const [movedItem] = updatedRows.splice(fromIndex, 1);
        updatedRows.splice(toIndex, 0, movedItem);
        setRows(updatedRows); // 변경된 섹션 리스트를 상태에 반영합니다.
    };

    return (
            <div className="space-y-4 min-w-[400px]">
                {rows.map((row, index) => (
                    <DraggableRow
                        key={row.id}
                        row={row}
                        index={index}
                        moveRow={moveRow}
                        arrLength={rows.length}
                    />
                ))}
            </div>
    );
}
