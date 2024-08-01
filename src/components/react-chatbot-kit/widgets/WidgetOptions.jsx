import React from "react";
import "@/styles/widget-options.css";

const WidgetOptions = (props) => {
    const options = props.payload?.options || [];

    const buttonsMarkup = options.map((option, index) => (
        <button
            key={index}
            onClick={() => {
                    props.actionProvider.handleOption(option)
                }
            }
            className="option-button"
        >
            {option.option}
        </button>
    ));

    return <div className="options-container">{buttonsMarkup}</div>;
};

export default WidgetOptions;
