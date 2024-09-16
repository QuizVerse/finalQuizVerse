import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

export default function StudyRoomCard(props) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center p-4"
             data-v0-t="card"
             onClick={props.onClick} // 클릭 핸들러 추가
             style={{ cursor: "pointer" }} // 클릭 가능한 느낌을 주기 위해 커서 스타일 추가
             >
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-16 h-16">
                <img src={props.image}/>
            </span>
            <div className="flex flex-col flex-1 ml-4">
                <h2 className="text-lg font-semibold">{props.title}</h2>
                <p className="text-sm text-muted-foreground">
                    {props.description}
                </p>
            </div>
            <div className="flex items-center gap-2 flex-col justify-between">
                <span className="text-sm">{props.nowMember}/{props.totalMember}</span>
                    {props.status === "0" ? <LockOpenIcon/> : <LockIcon/>}
            </div>
        </div>
    );
}


