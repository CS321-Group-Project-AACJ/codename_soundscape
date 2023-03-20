import React from "react";
import "./CustomButton.css";

export default function CustomButton({
    text,
    handleFunction = () => {},
    style,
    type = "PRIMARY",
    disabled = false,
    fitContent = false,
}) {
    function handleClick() {
        if (!disabled) {
            handleFunction();
            alert("I was clicked!");
        }
    }

    const styles = {
        container_PRIMARY: {
            backgroundColor: "#3B71F3",
        },
        container_SECONDARY: {
            border: "solid #3B71F3",
        },
        container_TERTIARY: {
            borderBottom: "solid #3B71F3",
            borderRadius: 0,
            padding: 0,
            width: "fit-content",
            margin: "0 auto",
        },
        text_PRIMARY: {},
        text_SECONDARY: {
            color: "#3B71F3",
        },
        text_TERTIARY: {
            color: "#3B71F3",
        },
    };
    style = {
        ...styles[`container_${type}`],
        ...styles[`text_${type}`],
        ...style,
    };

    let disabledStyle = { cursor: "default" };

    if (type === "PRIMARY") {
        disabledStyle = {
            ...disabledStyle,
            backgroundColor: "#3a72f266",
        };
    }
    if (type === "SECONDARY") {
        disabledStyle = {
            ...disabledStyle,
            border: "solid #3a72f266",
            color: "#3a72f266",
        };
    }
    if (type === "TERTIARY") {
        disabledStyle = {
            ...disabledStyle,
            color: "#3a72f266",
            borderBottom: "solid #3a72f266",
        };
    }
    if (disabled) {
        style = { ...style, ...disabledStyle };
    }

    const fitContentStyle = {
        width: "fit-content",
        margin: "10px auto",
    };
    if (fitContent) {
        style = { ...style, ...fitContentStyle };
    }

    return (
        <div className="custom-btn" style={style} onClick={handleClick}>
            {text}
        </div>
    );
}
