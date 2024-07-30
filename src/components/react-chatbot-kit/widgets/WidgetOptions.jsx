import React from "react";
import "@/styles/widget-options.css";
import ActionProvider from './../ActionProvider';

const WidgetOptions = (props) => {
    console.log('WidgetOptions props:', props);

    const options = props.payload?.options || [];

    console.log('Options to render:', options);

    const buttonsMarkup = options.map((option, index) => (
        <button
            key={index}
            onClick={() => {
                    props.actionProvider.handleOptionClick(option)
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
