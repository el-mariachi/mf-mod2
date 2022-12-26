import LeaderboardProps from "../Lb-Props";
import Lb_User from "../Element/Lb-ListElement";
import { Stack } from "react-bootstrap";

const inputData : LeaderboardProps[] = [
    {
        nickname: "User1",
        score: 9999,
        date: "26.12.2022",
        time: "00:01:27",
        kills: 0
    },
    {
        nickname: "User2",
        score: 8000,
        date: "25.12.2022",
        time: "00:10:35",
        kills: 10
    },
    {
        nickname: "User3",
        score: 5000,
        date: "14.12.2022",
        time: "01:00:00",
        kills: 1000
    },
    {
        nickname: "User4",
        score: 2000,
        date: "01.12.2022",
        time: "01:11:27",
        kills: 2
    },

]

function LeaderboardList(){
    return(
    <Stack gap={2}>
        {inputData.map(user => (
            <Lb_User
                nickname={user.nickname}
                score={user.score}
                date={user.date}
                time={user.time}
                kills={user.kills}
            />
        ))}
    </Stack>
    )
}

export default LeaderboardList;
