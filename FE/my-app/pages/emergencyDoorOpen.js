import React, {useState, useEffect, useCallback} from "react";
import Header from "./component/Header";
import UserModal from "./component/UserModal";
import SideBar from "./component/SideBar";
import TabMenu from "./component/TabMenu";
import css from "styled-jsx/css";
import axios from "axios";
import {Cookies} from "react-cookie";
import {Select} from '@chakra-ui/react'
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
        overflow: auto;
        
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
        height: 10%;
        font-weight: bold;
    }

    .daySelect .timeSelect{
        margin-left: 40px;
        align-items: center;
        width: 100%;
        display: flex;
    }

    .daySelect .timeSelect p:first-child{
        margin-right: 1%;
    }

    .daySelect .timeSelect p:not(:first-child){
        margin-left: 1%;
        margin-right: 1%;
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
        width: 11.1%;
    }

    .TableContainer{
        display: flex;
        height: 75%;
    }

    .TableThead{
        border-bottom: solid 2px gray;
        margin-bottom: 1%;
    }

    .TableTbody{
        height: 80%;
        overflow: auto;
        text-align: center;
    }

    .TableTbody table tr{
        height: 50px;
    }

`;
const cookies = new Cookies();
function useEmergencyDoorOpen() {
    useEffect(() => {
        getInfo();
        getStaInfo();
        getCookieFunc();
    }, [])
    //??????????????? ???????????????, ?????????????????? ???????????? ??????
    const [isSuper, setIsSuper] = useState(false);
    const getCookieFunc = () => {
        if (cookies.get("isSuper") === "1") {
            setIsSuper(true);
        } else {
            setIsSuper(false);
        }
    }
    //
    const header = ["No.", "?????????", "?????????", "????????????"];
    const [Data, setData] = useState([]);
    const [DataClone, setDataClone] = useState([]);
    const [staDoorData, setStaDoorData] = useState([]);
    const [DoorData, setDoorData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [checkedList, setCheckedLists] = useState([]);
    const [selectStaName, setSelectStaName] = useState("");
    // -----------------------------------------------------------------------
    // ?????? ???????????? ?????? ??????
    const onCheckedAll = useCallback((checked) => {
        if (checked) {
            const checkedListArray = DoorData.map(list => list.doorId);
            setCheckedLists(checkedListArray);
            allTrue();
        } else {
            setCheckedLists([]);
            allFalse();
        }
    }, [DoorData]);
    const allTrue = () => { // ?????? ?????? ????????? ?????? ????????? isOpen ?????? 1??? ??????
        const arrayTrue = [];
        const FilterData = DoorData.map(e => e.doorId);
        const FliterDataLength = FilterData.length;
        for (let i = 0; i <= FliterDataLength; i++) {
            const info = {
                "doorId": FilterData[i],
                "isOpen": true
            }
            arrayTrue.push(info);
        }
        getDoorInfo(arrayTrue);
    }
    const allFalse = () => { // ?????? ?????? ????????? ?????? ????????? isOpen ?????? 0??? ??????
        const arrayFalse = [];
        const FilterData = DoorData.map(e => e.doorId);
        const FliterDataLength = FilterData.length;
        for (let i = 0; i <= FliterDataLength; i++) {
            const info = {
                "doorId": FilterData[i],
                "isOpen": false
            }
            arrayFalse.push(info);
        }
        getDoorInfo(arrayFalse);
    }
    // -----------------------------------------------------------------------
    // ?????? ???????????? ?????? ??????
    const onCheckedElement = useCallback((checked, list) => {
        if (checked) {
            setCheckedLists([
                ...checkedList,
                list
            ]);
            CheckTrue(list);
        } else {
            setCheckedLists(checkedList.filter((el) => el !== list));
            CheckFalse(list);
        }
    }, [checkedList]);
    const CheckTrue = (list) => {
        const array = []
        const infoTrue = {
            "doorId": list,
            "isOpen": true
        }
        array.push(infoTrue);
        getDoorInfo(array);
    }
    const CheckFalse = (list) => {
        const array = []
        const infofalse = {
            "doorId": list,
            "isOpen": false
        }
        array.push(infofalse);
        getDoorInfo(array);
    }
    // -----------------------------------------------------------------------
    const handleFilter = (e) => { // Select Box ?????? ??????
        const select = e.target.value;
        if (select === "") {
            setData(DataClone);
        } else {
            const result = DataClone.filter(e => select === e.staName);
            setData(result);
            setFilterData(result);
        }
    };
    // ----------------------------------------------------------------------- ???????????? ????????? ???????????? axios ??????
    const getInfo = async () => { // ?????? ???????????????
        const URL = `${process.env.NEXT_PUBLIC_HOST_ADDR}/door/adminemergency`;

        axios.defaults.withCredentials = true;
        axios.get(URL).then(res => {
            // console.log(res);
            if (res.status === 200) {
                console.log("???????????? ??????");
                setData(res.data);
                setDataClone(res.data);
                setDoorData(res.data);
                NowCheck(res.data);
            } else {
                console.log("???????????? ??????");
                alert(res.data);
            }
        });
    }
    const getStaInfo = async () => { // ????????? ?????? ?????????
        const URL = `${process.env.NEXT_PUBLIC_HOST_ADDR}/statement`;
        axios.defaults.withCredentials = true;
        axios.post(URL).then(res => {
            // console.log(res);
            if (res.status === 200) {
                console.log("????????? ???????????? ??????");
                setStaDoorData(res.data.staData);
                // setDoorData(res.data.doorData);
            } else {
                console.log("????????? ???????????? ??????");
            }
        });
    }
    const getDoorInfo = async (item) => { // ???????????? ????????? ????????? ????????? ??????
        const URL = `${process.env.NEXT_PUBLIC_HOST_ADDR}/door/adminemergency`;
        axios.defaults.withCredentials = true;
        await axios.post(URL, item).then(res => {
            // console.log(res);
            if (res.status === 200) {
                console.log("????????? ?????? ??????");
            } else {
                console.log("????????? ?????? ??????");
            }
        });
    }
    // -----------------------------------------------------------------------
    const NowCheck = (Data) => {
        const checkedArray = [];
        Data.forEach(e => {
            if (e.isOpen === true) {
                checkedArray.push(e.doorId);
            }
        });
        setCheckedLists(checkedArray);
    }
    return(
        <div>
            <Header/>
            <div className="container">
                <div className="containerBody">
                    <SideBar pageNumber = "3" isSuper = {isSuper}/>
                    <div className = "Main">
                        <TabMenu pageNumber = "3"/>
                        <div className = "MainHeader">
                            <h1 className = "MainHeaderTitle">???? ???????????? ??????</h1>
                        </div>
                        <div className = "daySelect">
                            <div className = "timeSelect">
                                <p>??? ???????????? ??????</p>
                                <input type = "checkbox" onChange={(e) => onCheckedAll(e.target.checked)}
                                checked={
                                  checkedList.length === 0
                                    ? false
                                    : checkedList.length === DoorData.length
                                    ? true
                                    : false
                                }></input>
                                <p>??? ?????? ?????? ??????</p>
                                <Select placeholder='Select Gate'
                                onChange = {(e) => {
                                    handleFilter(e);
                                    setSelectStaName(e.target.value);
                                }}width="20%">
                                    {staDoorData.map((item) => (
                                        <option value={item.staName} key={item.staId}>
                                        {item.staName}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div className = "TableContainer">
                            <div className = "Table" style={{width: "50%"}}>
                                <div className = "TableThead">
                                    <table>
                                        <thead>
                                            <tr>{header.map((item, index)=>{
                                                return <th key = {index}>{item}</th>
                                            })}</tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className = "TableTbody">
                                    <table>
                                        <tbody>
                                        {Data.map((item, index)=>{
                                            if(index%2==0){
                                                return(
                                                    <tr key = {index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.staName}</td>
                                                        <td>{item.doorName}</td>
                                                        <td><input type = "checkbox"
                                                            onChange={(e) => onCheckedElement(e.target.checked, item.doorId)}
                                                            checked={checkedList.includes(item.doorId) === true ? true : false}></input></td>
                                                    </tr>
                                                        )}})
                                                }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className = "Table" style={{width: "50%"}}>
                                <div className = "TableThead">
                                    <table>
                                        <thead>
                                            <tr>{header.map((item, index)=>{
                                                return <th key = {index}>{item}</th>
                                            })}</tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className = "TableTbody">
                                    <table>
                                        <tbody>
                                        {Data.map((item, index)=>{
                                            if(index%2==1){
                                                return(
                                                    <tr key = {index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.staName}</td>
                                                        <td>{item.doorName}</td>
                                                        <td><input type = "checkbox"
                                                            onChange={(e) => onCheckedElement(e.target.checked, item.doorId)}
                                                            checked={checkedList.includes(item.doorId) === true ? true : false}></input></td>
                                                    </tr>
                                                        )}})
                                                }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UserModal/>
                </div>
            </div>
            <style jsx>{style}</style>
        </div>
    )
}

export default useEmergencyDoorOpen;