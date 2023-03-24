import axios from "axios";
import CustomButton from "components/ui/CustomButton";
import URL from "data/URL";
import React, { useState } from "react";
import "./Home.css";

//my name is Ahmad Graham (no its not)

export default function Home() {
    const [tempText, setTempText] = useState("");
    const [data, setData] = useState([]);
    const [firstname, setFirstname] = useState("");


    async function fetchData() {
        try {
            const result = await axios.get(`${URL}/test`);
            console.log(result);
            setData(result.data);
        } catch (error) {
            console.log("There was an error fetching data");
        }
    }

    async function postData() {
        try {
            const result = await axios.post(`${URL}/accounts/test`, {
                firstname: firstname,
            });
            console.log(result);
        } catch (error) {
            console.log("There was an error fetching data");
        }
    }

    return (
        <div className="home">
            Home Page
            <label>
                Try inputting text here!
                <input
                    type="text"
                    onChange={(e) => setTempText(e.target.value)}
                />
            </label>
            <p>{tempText}</p>
            <div>
                <CustomButton text="This is a custom button!" fitContent />
                <CustomButton
                    text="This is a custom button!"
                    fitContent
                    type="SECONDARY"
                />
                <CustomButton
                    text="This is a custom button!"
                    fitContent
                    type="TERTIARY"
                />
                <CustomButton
                    text="This is a custom button!"
                    fitContent
                    disabled
                />
                <CustomButton
                    text="This is a custom button!"
                    fitContent
                    type="SECONDARY"
                    disabled
                />
                <CustomButton
                    text="This is a custom button!"
                    fitContent
                    type="TERTIARY"
                    disabled
                />
            </div>
            <p>
                If the server is on, press the button below to request data from
                it
            </p>
            <CustomButton
                text={"Request server data"}
                handleFunction={fetchData}
            />
            <div>
                {data.map((item, i) => (
                    <p key={i}>{item.name}</p>
                ))}
            </div>
            <label>
                Try inputting your name here!
                <input
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </label>
            <CustomButton
                text={"Post data to server"}
                handleFunction={postData}
            />
        </div>
    );
}
