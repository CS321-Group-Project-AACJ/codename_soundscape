import CustomButton from "components/ui/CustomButton";
import React, { useState } from "react";
import "./Home.css";

export default function Home() {
    const [tempText, setTempText] = useState("");

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
            <CustomButton text="This is a custom button!" fitContent disabled />
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
    );
}
