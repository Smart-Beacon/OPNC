import React, {useState, useEffect} from "react";
import Header from "./component/Header";
import UserModal from "./component/UserModal";
import css from "styled-jsx/css";
import TabMenu from "./component/TabMenu";
import SideBar from "./component/SideBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportExcel from "./component/Excelexport";
import axios from "axios";
import {Cookies} from "react-cookie";
import {
    Accordion,
    Button,
    Box,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from '@chakra-ui/react'
const style = css `
    .container{
        width: 95%;
        height: 80vh;
        margin: auto;
        margin-top: 40px;
        border-top: solid 5px gray;
    }
    
    .containerBody{
        display: flex;
        height: 100%;
    }

    .Main{
        width: 85%;
        border-left: solid 5px gray;
        height: 100%;
    }

    .MainHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: solid 4px gray;
        border-bottom: solid 4px gray;
    }

    .MainHeaderTitle{
        font-size: 40px;
        font-weight: bold;
    }

    .MainHeaderTitle{
        margin-left: 30px;
    }

    .Table{
        font-weight: bold;
        font-size: 20px;
    }

    .TableHeader{
        font-size: 20px;
    }
    .Select{
        color: blue;
    }

    .daySelect{
        border-bottom: solid 4px gray;
        display: flex;
        flex-direction: row;
        height: 13%;
        font-weight: bold;
    }

    .daySelect .timeSelect{
        margin-left: 40px;
        align-items: center;
        width: 100%;
        display: flex;
    }

    .daySelect .timeSelect p:first-child{
        width: 12%;
    }

    .daySelect .timeSelect p:not(:first-child){
        margin-left: 1%;
        margin-right: 1%;
    }

    .daySelect .DatePicker{
        width: 10%;
    }

    table{
        width: 100%;
        font-weight: bold;
        font-size: 20px;
        width: 100%;
        margin: 0;
        text-align: center;
    }

    table tr th{
        font-size: 25px;
        width: 11.1%;
    }

    table tr td{
        width: 11.53%;
    }

    .TableThead{
        border-bottom: solid 2px gray;
        margin-bottom: 1%;
    }

    .TableTbody{
        height: 65%;
        overflow: auto;
        text-align: center;
    }

    .TableTbody table tr{
        height: 50px;
    }
`;
const cookies = new Cookies();
function useReservationCheck() {
    useEffect(() => {
        getDoorInfo();
        getCookieFunc();
    }, [])
    //????????? ???????????????, ?????????????????? ???????????? ??????
    const [isSuper, setIsSuper] = useState(false);
    const getCookieFunc = () => {
        if (cookies.get("isSuper") === "1") {
            setIsSuper(true);
        } else {
            setIsSuper(false);
        }
    //
    }
    const header = [
        "No.",
        "??????",
        "????????????",
        "??????",
        "??????",
        "??????",
        "????????????",
        "????????????",
        "????????????"
    ];
    const [Data, setData] = useState([]);
    const [DataClone, setDataClone] = useState(Data);
    const [number, setNumber] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const DataLen = [];
    for (let i = 0; i < Data.length; i++) {
        DataLen.push(false);
    }
    const [disabled, setDisabled] = useState(DataLen);
    // ????????? ????????? ???????????? ????????? ??????
    const StartDaySearch = (date) => {
        const Month = date.getMonth() + 1;
        const Day = date.getDate();
        const startDayresult = DataClone.filter(e => new Date(e.enterTime).getMonth() + 1 === Month && new Date(e.enterTime).getDate() === Day);
        setData(startDayresult);
    }
    // ????????? ~ ???????????? ????????? ????????? ??????
    const EndDaySearch = (date) => { 
        const endDayresult = DataClone.filter(e => {
            const newDate = new Date(e.enterDate);
            newDate.setHours(newDate.getHours() - 9);
            return newDate.getTime() <= date.getTime() && new Date(e.enterDate).getTime() >= startDate.getTime()});
        setData(endDayresult);
    }
    const haddleButtonTrue = (e) => { // Y????????? ????????? ??? ???????????? ??????;
        e.preventDefault();
        e.currentTarget.disabled = true;
        e.currentTarget.style.color = "white";
        e.currentTarget.style.backgroundColor = "green";
        const disabledClone = [...disabled];
        disabledClone[number] = true;
        setDisabled(disabledClone);
        setNumber(number + 1);
    }
    const haddleButtonFalse = (e) => { // N????????? ????????? ??? ???????????? ??????;
        e.preventDefault();
        e.currentTarget.disabled = true;
        e.currentTarget.style.color = "white";
        e.currentTarget.style.backgroundColor = "red";
        const disabledClone = [...disabled];
        disabledClone[number] = true;
        setDisabled(disabledClone);
        setNumber(number + 1);
    }
    const getDoorInfo = async () => {
        const URL = `${process.env.NEXT_PUBLIC_HOST_ADDR}/user/visitor`;

        axios.defaults.withCredentials = true;
        axios.get(URL).then(res => {
            if (res.status === 200) {
                setData(res.data);
                setDataClone(res.data);
            } else {
                alert(res.data);
            }
        });
    }
    const postInfoTrue = (e) => {   //Y??? ????????? ??? 
        const trueInfo = {
            "allowId": e,
            "isAllowed": true
        }
        postAllowInfo(trueInfo);
    }
    const postInfoFalse = (e) => {
        const trueInfo = {
            "allowId": e,
            "isAllowed": false
        }
        postAllowInfo(trueInfo);
    }
    const postAllowInfo = async (item) => {
        const URL = `${process.env.NEXT_PUBLIC_HOST_ADDR}/user/visitor`;

        axios.defaults.withCredentials = true;
        await axios.post(URL, item).then(res => {
            if (res.status === 200) {
                console.log("======================", "????????? ?????? ??????");
            } else {
                console.log("??????????????? ??????");
            }
        });
    }
    return (<div>
        <Header/>
        <div className="container">
            <div className="containerBody">
                <SideBar pageNumber = "3" isSuper = {isSuper}/>
                <div className="Main">
                    <TabMenu pageNumber = "2"/>
                    <div className="MainHeader">
                        <h1 className="MainHeaderTitle">???? ????????? ????????????</h1>
                        <ExportExcel excelData={Data}
                            fileName={"Excel Export"}/>
                    </div>
                    <div className="daySelect">
                        <div className="timeSelect">
                            <p style={
                                {width: "10%"}
                            }>??? ?????? ?????? ???????</p>
                            <div className="DatePicker"
                                style={
                                    {
                                        border: "solid 3px gray",
                                        marginRight: "3%",
                                        width: "13%"
                                    }
                            }>
                                <DatePicker selected={startDate}
                                    onChange={
                                        (date) => {
                                            setStartDate(date)
                                            StartDaySearch(date)
                                        }
                                    }
                                    dateFormat="yyyy??? MM??? dd???"
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    />
                            </div>
                        <div className="DatePicker"
                            style={
                                {
                                    border: "solid 3px gray",
                                    width: "13%"
                                }
                        }>
                            <DatePicker selected={endDate}
                                onChange={
                                    (date) => {
                                        setEndDate(date)
                                        EndDaySearch(date)
                                    }
                                }
                                dateFormat="yyyy??? MM??? dd???"
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}/>
                        </div>
                </div>
            </div>
            <div className="TableThead">
                <table>
                    <thead>
                        <tr> {
                            header.map((item, index) => {
                                return <th key = {index}> {item}</th>
                        })
                        }</tr>
                    </thead>
                </table>
            </div>
            <div className="tableTbody">
                <table>
                    <tbody> {
                        Data.map((item, index) => {
                            const enterDay = item.enterTime;
                            const exitDay = item.exitTime;
                            const DataDate = new Date(enterDay).getFullYear() + "-" + String(new Date(enterDay).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(enterDay).getDate()).padStart(2, "0");
                            const EnterTime = String((new Date(enterDay).getHours()) - 9).padStart(2, "0") + ":" + String(new Date(enterDay).getMinutes()).padStart(2, "0") + ":" + String(new Date(enterDay).getSeconds()).padStart(2, "0");
                            const ExitTime = String((new Date(exitDay).getHours()) - 9).padStart(2, "0") + ":" + String(new Date(exitDay).getMinutes()).padStart(2, "0") + ":" + String(new Date(exitDay).getSeconds()).padStart(2, "0");
                            return (<tr key = {index}>
                                <Accordion allowToggle>
                                    <AccordionItem>
                                        <td> {index + 1}</td>
                                        <td> {item.userName}</td>
                                        <td> {item.phoneNum}</td>
                                        <td> {DataDate}</td>
                                        <td> {EnterTime}</td>
                                        <td> {ExitTime}</td>
                                        <td> {item.reason}</td>
                                        <td>
                                            <fieldset disabled={disabled[index]}>
                                                <Button variant='solid'
                                                    onClick={(e) => {
                                                            haddleButtonTrue(e);
                                                            postInfoTrue(item.allowId);
                                                        }}
                                                    style={{
                                                            marginRight: "7%",
                                                            backgroundColor: "white",
                                                            color: "green",
                                                            border: "solid 2px green"
                                                        }}>
                                                    Y
                                                </Button>
                                                <Button variant='solid'
                                                    style={{
                                                            backgroundColor: "white",
                                                            color: "red",
                                                            border: "solid 2px red"
                                                        }}
                                                    onClick={(e) => {
                                                            haddleButtonFalse(e);
                                                            postInfoFalse(item.allowId);
                                                        }}>
                                                    N
                                                </Button>
                                            </fieldset>
                                        </td>
                                        <td>
                                            <AccordionButton style={
                                                {marginLeft: "30%"}
                                            }>
                                                <Box flex='1' textAlign='center'>
                                                    ?????? ??????
                                                </Box>
                                                <AccordionIcon/>
                                            </AccordionButton>
                                        </td>
                                        <AccordionPanel pb={4}>
                                            <td>?????? : {item.company}</td>
                                            <td>?????? : {item.position}</td>
                                            <td>????????? : {item.staName}</td>
                                            <td>????????? : {item.doorName}</td>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </tr>)
                        })
                    } </tbody>
                </table>
            </div>
        </div>
        <UserModal/>
    </div>
</div>
<style jsx> {style}</style></div>)
}
export default useReservationCheck;