import {Button} from "@mui/material";
import EditSidebar from "../../components/EditSidebar";
import Section from "../../components/Section";

export default function Edit() {
    return (
        <main className="p-4 space-y-4">
            <div className="flex justify-between">
                <div className="flex space-x-2">
                    <Button variant={"outlined"}>임시저장</Button>
                    <Button variant={"outlined"}>AI 문제 출제</Button>
                    <Button variant={"contained"}>출제하기</Button>
                </div>
            </div>

            <Section/>
            <EditSidebar/>
        </main>

)
    ;
}

