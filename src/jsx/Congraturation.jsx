import {useContext, useState} from "react";
import { QuestionInfoContext } from "../context/QuestionInfoContext";

function Congraturation() {
    const { questionInfo } = useContext(QuestionInfoContext);
    const [ isCorrect, setIsCorrect ] = useState(false);
    setIsCorrect(!questionInfo.answer.includes("*"));



}