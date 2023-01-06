import ResScene from "../../components/ResultsScreen/Scene/ResScene";
import ResultsProps from "../../components/ResultsScreen/Props/ResultsProps";

function ResultsPage() {

    let props : ResultsProps = {
        levelNum: 5,
        killCount: 10,
        coins: 10,
        time: "10:10:10"
    };
  
    return (
        <>
            <ResScene {...props}></ResScene>
        </>
    )
}

export default ResultsPage;
