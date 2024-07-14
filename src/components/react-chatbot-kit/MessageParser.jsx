// in MessageParser.jsx

import React from 'react';

class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        this.actionProvider.handleMessage({ message });
    }
}

export default MessageParser;




// const MessageParser = ({ children, actions }) => {
//     const parse = (message) => {
//         if (message.includes('hello')) {
//             actions.handleHello();
//         }

//         if (message.includes('widgetCustome')) {
//             actions.handleWidgetCustome();
//         }
//     };

//     return (
//         <div>
//             {React.Children.map(children, (child) => {
//                 return React.cloneElement(child, {
//                     parse: parse,
//                     actions: {},
//                 });
//             })}
//         </div>
//     );
// };

// export default MessageParser;
