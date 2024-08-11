class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        this.actionProvider.handleMessage({ message });
        // this.actionProvider.handleButtonClick({ message });
    }
}

export default MessageParser;
