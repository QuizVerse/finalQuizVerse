import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';

const ItemType = 'ROW';

const arr = [
    { id: 0, title: '야호' },
    { id: 1, title: '야호1' },
    { id: 2, title: '야호2' },
];

function DraggableRow({ row, index, moveRow }) {
    // useDrag 훅을 사용하여 이 요소를 드래그 가능하게 만듭니다.
    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
    });

    // useDrop 훅을 사용하여 이 요소를 드롭 가능한 영역으로 설정합니다.
    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveRow(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => ref(drop(node))}
            key={row.id}
            className="flex items-center justify-between p-2 border rounded-md"
        >
            <div className="flex items-center space-x-2">
                <IconButton>
                    <DragIndicatorIcon /> {/* 드래그 핸들 아이콘 */}
                </IconButton>
                <div>
                    <div>{row.title || '제목없는 섹션'}</div>
                    <div className="text-sm text-muted-foreground">
                        {index + 1} 섹션 / {arr.length} 섹션
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
                    disabled={index === arr.length - 1} // 마지막 섹션이면 비활성화
                >
                    <ArrowDownwardIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default function SectionSort() {
    const [rows, setRows] = useState(arr); // 섹션 리스트의 상태를 관리합니다.

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
        <DndProvider backend={HTML5Backend}>
            <div className="space-y-4 min-w-[400px]">
                {rows.map((row, index) => (
                    <DraggableRow key={row.id} row={row} index={index} moveRow={moveRow} />
                ))}
            </div>
        </DndProvider>
    );
}
